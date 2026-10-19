import { supabase } from "./supabase";
import { dbToProperty, propertyToDb } from "./propertyMapper";

const BUCKET = "property-images";

export async function fetchProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("posted_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(dbToProperty);
}

// Public-site compatibility: your original assets.js used image URL strings.
// Keep that shape for existing cards/galleries while the admin retains path+URL objects.
export async function fetchPublicProperties() {
  const properties = await fetchProperties();
  return properties.map((property) => ({
    ...property,
    images: (property.images || []).map((image) => typeof image === "string" ? image : image?.url).filter(Boolean),
  }));
}

export async function saveProperty(property) {
  const payload = propertyToDb(property);
  if (property.id) {
    const { data, error } = await supabase
      .from("properties")
      .update(payload)
      .eq("id", property.id)
      .select("*")
      .single();
    if (error) throw error;
    return dbToProperty(data);
  }
  const { data, error } = await supabase
    .from("properties")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return dbToProperty(data);
}

export async function uploadPropertyImages(propertyId, files) {
  const uploaded = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `properties/${propertyId}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (uploadError) {
      // Clean up files uploaded earlier in this same batch if a later upload fails.
      if (uploaded.length) await supabase.storage.from(BUCKET).remove(uploaded.map((x) => x.path));
      throw uploadError;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    uploaded.push({ path, url: data.publicUrl, name: file.name });
  }
  return uploaded;
}

export async function appendPropertyImages(propertyId, existingImages, files) {
  const newImages = await uploadPropertyImages(propertyId, files);
  const allImages = [...(existingImages || []), ...newImages];
  const { error } = await supabase
    .from("properties")
    .update({ images: allImages })
    .eq("id", propertyId);
  if (error) {
    await supabase.storage.from(BUCKET).remove(newImages.map((x) => x.path));
    throw error;
  }
  return allImages;
}

export async function removePropertyImage(propertyId, images, imageToRemove) {
  if (!imageToRemove?.path) throw new Error("This image has no storage path; remove it manually from Storage if it was uploaded before this portal.");
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([imageToRemove.path]);
  if (storageError) throw storageError;

  const nextImages = (images || []).filter((image) => image.path !== imageToRemove.path);
  const { error: dbError } = await supabase.from("properties").update({ images: nextImages }).eq("id", propertyId);
  if (dbError) throw dbError;
  return nextImages;
}

export async function deleteProperty(property) {
  const images = Array.isArray(property.images) ? property.images : [];
  const paths = images.map((image) => image?.path).filter(Boolean);

  // Do not delete the database record if image cleanup fails.
  if (paths.length) {
    const { error: storageError } = await supabase.storage.from(BUCKET).remove(paths);
    if (storageError) throw new Error(`Could not delete property images. Property was not deleted. ${storageError.message}`);
  }

  const { error: dbError } = await supabase.from("properties").delete().eq("id", property.id);
  if (dbError) throw new Error(`Images were removed, but property deletion failed. Re-upload images if needed, then retry. ${dbError.message}`);
}
