import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { fetchProperties, saveProperty, appendPropertyImages, removePropertyImage, deleteProperty } from "../lib/propertyService";
import "./admin.css";

const emptyProperty = () => ({
  title: "",
  listingType: "sale",
  propertyType: "apartment",
  buildingCategory: "standalone",
  propertyStatus: "resale",
  location: { address: "", locality: "", city: "Chennai" },
  pricing: { totalPrice: 0, isNegotiable: true },
  areaDetails: {},
  amenities: [],
  images: [],
  featured: false,
  postedAt: new Date().toISOString().slice(0, 10),
});

const jsonFields = [
  ["location", "Location JSON"],
  ["pricing", "Pricing JSON"],
  ["areaDetails", "Area details JSON"],
  ["plotDetails", "Plot details JSON (optional)"],
  ["residentialDetails", "Residential details JSON (optional)"],
  ["societyDetails", "Society details JSON (optional)"],
  ["rentalTerms", "Rental terms JSON (optional)"],
];

function pretty(value) {
  return JSON.stringify(value ?? {}, null, 2);
}

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(null);
  const [jsonText, setJsonText] = useState({});
  const [amenitiesText, setAmenitiesText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError("");
    try { setProperties(await fetchProperties()); }
    catch (e) { setError(e.message || "Could not load properties."); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    let active = true;
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }
      const { data: admin, error: adminError } = await supabase
        .from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
      if (adminError || !admin) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      if (active) await load();
    }
    init();
    return () => { active = false; };
  }, [navigate]);

  function startEdit(property = emptyProperty()) {
    setEditing({ ...property, amenities: property.amenities || [], images: property.images || [] });
    const text = {};
    for (const [key] of jsonFields) text[key] = pretty(property[key]);
    setJsonText(text);
    setAmenitiesText((property.amenities || []).join("\n"));
    setSelectedFiles([]);
    setError("");
    setNotice("");
  }

  function updateField(key, value) {
    setEditing((old) => ({ ...old, [key]: value }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const parsed = {};
      for (const [key, label] of jsonFields) {
        try { parsed[key] = JSON.parse(jsonText[key] || (key.endsWith("Details") || key === "rentalTerms" ? "null" : "{}")); }
        catch { throw new Error(`${label} is not valid JSON. Check commas, quotes and brackets.`); }
      }
      const property = {
        ...editing,
        ...parsed,
        amenities: amenitiesText.split("\n").map((x) => x.trim()).filter(Boolean),
      };
      let saved = await saveProperty(property);
      if (selectedFiles.length) {
        const images = await appendPropertyImages(saved.id, saved.images, selectedFiles);
        saved = { ...saved, images };
      }
      setNotice("Property saved successfully.");
      setEditing(null);
      setSelectedFiles([]);
      await load();
    } catch (e) {
      setError(e.message || "Could not save property.");
    } finally { setBusy(false); }
  }

  async function handleRemoveImage(image) {
    if (!window.confirm("Delete this image from cloud storage?")) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const images = await removePropertyImage(editing.id, editing.images, image);
      setEditing((old) => ({ ...old, images }));
      setNotice("Image deleted.");
    } catch (e) { setError(e.message || "Could not delete image."); }
    finally { setBusy(false); }
  }

  async function handleDelete(property) {
    if (!window.confirm(`Delete "${property.title}" and its stored images? This cannot be undone.`)) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await deleteProperty(property);
      setNotice("Property and its images deleted.");
      await load();
    } catch (e) { setError(e.message || "Could not delete property."); }
    finally { setBusy(false); }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const filtered = properties.filter((p) =>
    `${p.title} ${p.location?.locality || ""} ${p.location?.city || ""} ${p.listingType}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="admin-shell admin-wide">
      <header className="admin-topbar">
        <div><p className="admin-eyebrow">PROPERTY MANAGEMENT</p><h1>Listings</h1></div>
        <div className="admin-actions"><button className="admin-secondary" onClick={logout}>Sign out</button><button onClick={() => startEdit()}>+ Add property</button></div>
      </header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {notice && <p className="admin-notice" role="status">{notice}</p>}

      {editing && <section className="admin-panel">
        <div className="admin-section-heading"><h2>{editing.id ? `Edit property #${editing.id}` : "Add a property"}</h2><button className="admin-secondary" type="button" onClick={() => setEditing(null)}>Close</button></div>
        <form onSubmit={handleSave} className="admin-form">
          <label>Title<input required value={editing.title} onChange={(e) => updateField("title", e.target.value)} /></label>
          <div className="admin-form-grid">
            <label>Listing type<select value={editing.listingType} onChange={(e) => updateField("listingType", e.target.value)}><option value="sale">Sale</option><option value="rent">Rent</option></select></label>
            <label>Property type<input required value={editing.propertyType} onChange={(e) => updateField("propertyType", e.target.value)} /></label>
            <label>Building category<input value={editing.buildingCategory || ""} onChange={(e) => updateField("buildingCategory", e.target.value)} /></label>
            <label>Property status<input value={editing.propertyStatus || ""} onChange={(e) => updateField("propertyStatus", e.target.value)} /></label>
            <label>Posted date<input type="date" value={editing.postedAt || ""} onChange={(e) => updateField("postedAt", e.target.value)} /></label>
            <label className="admin-check"><input type="checkbox" checked={Boolean(editing.featured)} onChange={(e) => updateField("featured", e.target.checked)} /> Featured listing</label>
          </div>

          {jsonFields.map(([key, label]) => <label key={key}>{label}<textarea rows={key === "location" || key === "pricing" ? 5 : 7} spellCheck="false" value={jsonText[key] ?? "{}"} onChange={(e) => setJsonText((old) => ({ ...old, [key]: e.target.value }))} /></label>)}

          <label>Amenities (one per line)<textarea rows={5} value={amenitiesText} onChange={(e) => setAmenitiesText(e.target.value)} placeholder={"Swimming Pool\nCovered Parking\n24/7 Security"} /></label>

          <div className="admin-image-section">
            <h3>Property images</h3>
            {editing.images?.length > 0 ? <div className="admin-image-grid">{editing.images.map((image, index) => <div className="admin-image" key={image.path || image.url || index}>
              {image.url ? <img src={image.url} alt={image.name || `Property ${index + 1}`} /> : <div className="admin-image-missing">Image has no URL</div>}
              <button className="admin-danger" type="button" disabled={busy || !editing.id || !image.path} onClick={() => handleRemoveImage(image)}>Delete image</button>
            </div>)}</div> : <p className="admin-muted">No uploaded images yet. Save a new property first, then edit it to upload images.</p>}
            <label>Upload images<input type="file" accept="image/*" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))} /></label>
            {selectedFiles.length > 0 && <p className="admin-muted">{selectedFiles.length} image(s) selected. They will upload when you save.</p>}
          </div>
          <div className="admin-actions"><button disabled={busy}>{busy ? "Saving…" : "Save property"}</button><button className="admin-secondary" type="button" onClick={() => setEditing(null)}>Cancel</button></div>
        </form>
      </section>}

      <section className="admin-panel">
        <div className="admin-section-heading"><div><h2>All properties</h2><p className="admin-muted">{properties.length} listing(s)</p></div><input className="admin-search" placeholder="Search title, locality, city…" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        {loading ? <p>Loading listings…</p> : filtered.length === 0 ? <p>No properties found.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>ID</th><th>Property</th><th>Type</th><th>Price / Rent</th><th>Featured</th><th>Actions</th></tr></thead><tbody>
          {filtered.map((p) => <tr key={p.id}><td>{p.id}</td><td><strong>{p.title}</strong><small>{p.location?.locality || p.location?.address || ""}</small></td><td>{p.listingType} · {p.propertyType}</td><td>{p.listingType === "rent" ? `₹${Number(p.pricing?.monthlyRent || 0).toLocaleString("en-IN")}/mo` : `₹${Number(p.pricing?.totalPrice || 0).toLocaleString("en-IN")}`}</td><td>{p.featured ? "Yes" : "No"}</td><td><div className="admin-row-actions"><button className="admin-secondary" onClick={() => startEdit(p)}>Edit</button><button className="admin-danger" disabled={busy} onClick={() => handleDelete(p)}>Delete</button></div></td></tr>)}
        </tbody></table></div>}
      </section>
    </main>
  );
}
