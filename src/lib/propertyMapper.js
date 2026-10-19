
const parseJsonObject = (value) => {
  if (value === null || value === undefined || value === "") {
    return {};
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed;
      }
    } catch {
      // Invalid JSON is not displayed as a property-details object.
    }
  }

  return {};
};

const optionalJsonObject = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed;
      }
    } catch {
      // The admin form should already validate JSON before saving.
    }
  }

  return null;
};

export function dbToProperty(row) {
  return {
    id: row.id,
    title: row.title,

    listingType: row.listing_type ?? row.listingType ?? "sale",
    propertyType: row.property_type ?? row.propertyType ?? "apartment",

    buildingCategory:
      row.building_category ?? row.buildingCategory ?? "standalone",

    propertyStatus:
      row.property_status ?? row.propertyStatus ?? "resale",

    location: parseJsonObject(row.location),
    pricing: parseJsonObject(row.pricing),
    areaDetails: parseJsonObject(row.area_details ?? row.areaDetails),

    // Always expose these fields to the frontend consistently.
    // Empty objects simply result in no extra detail rows.
    plotDetails: parseJsonObject(row.plot_details ?? row.plotDetails),

    residentialDetails: parseJsonObject(
      row.residential_details ?? row.residentialDetails
    ),

    societyDetails: parseJsonObject(
      row.society_details ?? row.societyDetails
    ),

    rentalTerms: parseJsonObject(
      row.rental_terms ?? row.rentalTerms
    ),

    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    images: Array.isArray(row.images) ? row.images : [],

    featured: Boolean(row.featured),

    postedAt: row.posted_at ?? row.postedAt ?? "",
  };
}

export function propertyToDb(property) {
  return {
    title: property.title,

    listing_type: property.listingType || "sale",
    property_type: property.propertyType || "apartment",

    building_category: property.buildingCategory || "standalone",
    property_status: property.propertyStatus || "resale",

    location: parseJsonObject(property.location),
    pricing: parseJsonObject(property.pricing),
    area_details: parseJsonObject(
      property.areaDetails
    ),

    // These are JSON/JSONB values, not plain text.
    plot_details: optionalJsonObject(property.plotDetails),

    residential_details: optionalJsonObject(
      property.residentialDetails
    ),

    society_details: optionalJsonObject(
      property.societyDetails
    ),

    rental_terms: optionalJsonObject(
      property.rentalTerms
    ),

    amenities: Array.isArray(property.amenities)
      ? property.amenities
      : [],

    images: Array.isArray(property.images)
      ? property.images
      : [],

    featured: Boolean(property.featured),

    posted_at:
      property.postedAt || new Date().toISOString().slice(0, 10),
  };
}
