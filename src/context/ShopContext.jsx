
import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

import { assets } from "../assets/assets";
import { fetchPublicProperties } from "../lib/propertyService";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ALL_PRICES = { min: 0, max: Infinity, listingType: "all" };

// Normalize values before comparing them.
const normalize = (value) =>
  value === null || value === undefined
    ? ""
    : String(value)
        .trim()
        .toLowerCase()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ");

// Normalize sale/rent variants.
const normalizeListingType = (value) => {
  const normalized = normalize(value);

  if (["rent", "rental", "for rent", "lease"].includes(normalized)) {
    return "rent";
  }

  if (
    ["sale", "sell", "for sale", "buy", "purchase"].includes(normalized)
  ) {
    return "sale";
  }

  return normalized;
};

// Normalize common property-type variants without merging
// flats and apartments into the same category.
const normalizePropertyType = (value) => {
  const normalized = normalize(value);

  const aliases = {
    apartments: "apartment",
    flats: "flat",
    plots: "plot",
    land: "plot",
    "plots land": "plot",
    "plot land": "plot",
    villas: "villa",
  };

  return aliases[normalized] || normalized;
};

const normalizeBuildingCategory = (value) => {
  const normalized = normalize(value);

  if (
    [
      "society",
      "gated community",
      "society gated community",
      "society / gated community",
    ].includes(normalized)
  ) {
    return "society";
  }

  if (
    ["standalone", "standalone building", "independent building"].includes(
      normalized
    )
  ) {
    return "standalone";
  }

  return normalized;
};

// Supports numeric BHK values and strings such as "2 BHK".
const normalizeBHK = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const text = normalize(value);
  const match = text.match(/\d+/);

  return match ? String(Number(match[0])) : text;
};

// Convert valid numeric values without treating blank values as zero.
const toNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

// Collect searchable text from nested JSON data.
const collectSearchableValues = (value, output = []) => {
  if (value === null || value === undefined) return output;

  if (typeof value === "string" || typeof value === "number") {
    output.push(String(value));
    return output;
  }

  if (typeof value === "boolean") {
    output.push(value ? "yes" : "no");
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectSearchableValues(item, output));
    return output;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((item) =>
      collectSearchableValues(item, output)
    );
  }

  return output;
};

// Resolve the actual sale price or monthly rent.
const getEffectivePrice = (property) => {
  const pricing = property?.pricing || {};
  const listingType = normalizeListingType(property?.listingType);

  if (listingType === "rent") {
    return toNumber(pricing.monthlyRent);
  }

  const totalPrice = toNumber(pricing.totalPrice);

  if (totalPrice !== null && totalPrice > 0) {
    return totalPrice;
  }

  const pricePerSqFt = toNumber(pricing.pricePerSqFt);
  const areaDetails = property?.areaDetails || {};

  const plotArea =
    toNumber(areaDetails.plotAreaSqFt) ??
    toNumber(areaDetails.plotAreaSqft) ??
    toNumber(areaDetails.plotArea);

  if (
    pricePerSqFt !== null &&
    pricePerSqFt > 0 &&
    plotArea !== null &&
    plotArea > 0
  ) {
    return pricePerSqFt * plotArea;
  }

  return null;
};

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = "₹";

  // --------------------------------------------------
  // PROPERTIES
  // --------------------------------------------------

  const [properties, setProperties] = useState(assets);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState("");

  const refreshProperties = useCallback(async () => {
    setPropertiesLoading(true);
    setPropertiesError("");

    try {
      const databaseProperties = await fetchPublicProperties();
      setProperties(databaseProperties);
    } catch (error) {
      console.error("Failed to fetch properties from Supabase:", error);

      setPropertiesError(
        error?.message || "Unable to load properties from the database."
      );

      // Keep the last available properties if refreshing fails.
    } finally {
      setPropertiesLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProperties();
  }, [refreshProperties]);

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // --------------------------------------------------
  // FILTER STATE
  // --------------------------------------------------

  const [filterType, setFilterType] = useState("all");
  const [filterPropertyType, setFilterPropertyType] = useState("all");
  const [filterBuildingCategory, setFilterBuildingCategory] =
    useState("all");
  const [filterBHK, setFilterBHK] = useState("all");
  const [filterPrice, setFilterPrice] = useState(ALL_PRICES);

  // --------------------------------------------------
  // FILTER AND SEARCH
  // Every selected filter must match the same property.
  // --------------------------------------------------

  const filteredProperties = useMemo(() => {
    const searchTerm = normalize(search);

    const minPrice =
      toNumber(filterPrice?.min) ?? 0;

    const maxPrice =
      filterPrice?.max === "" ||
      filterPrice?.max === null ||
      filterPrice?.max === undefined
        ? Infinity
        : toNumber(filterPrice.max) ?? Infinity;

    const requestedListingType = normalizeListingType(filterType);
    const requestedPropertyType = normalizePropertyType(filterPropertyType);
    const requestedBuildingCategory =
      normalizeBuildingCategory(filterBuildingCategory);
    const requestedBHK = normalizeBHK(filterBHK);

    const requestedPriceListingType = normalizeListingType(
      filterPrice?.listingType || "all"
    );

    return properties.filter((property) => {
      // 1. Listing type: sale or rent.
      const propertyListingType = normalizeListingType(
        property.listingType
      );

      const matchesListingType =
        requestedListingType === "all" ||
        propertyListingType === requestedListingType;

      // 2. Property type.
      const matchesPropertyType =
        requestedPropertyType === "all" ||
        normalizePropertyType(property.propertyType) ===
          requestedPropertyType;

      // 3. Building category.
      const matchesBuildingCategory =
        requestedBuildingCategory === "all" ||
        normalizeBuildingCategory(property.buildingCategory) ===
          requestedBuildingCategory;

      // 4. BHK.
      const residentialDetails = property.residentialDetails || {};
      const actualBHK = normalizeBHK(residentialDetails.bhk);

      const matchesBHK =
        requestedBHK === "all" ||
        actualBHK === requestedBHK;

      // 5. Price.
      const effectivePrice = getEffectivePrice(property);

      const matchesPriceType =
        requestedPriceListingType === "all" ||
        propertyListingType === requestedPriceListingType;

      // Unknown prices appear under All Prices, but not in
      // a limited range where their actual price is unknown.
      const matchesPrice =
        matchesPriceType &&
        (
          requestedPriceListingType === "all" &&
          minPrice === 0 &&
          maxPrice === Infinity
            ? true
            : effectivePrice !== null &&
              effectivePrice >= minPrice &&
              effectivePrice <= maxPrice
        );

      // 6. Search across core fields and saved JSON details.
      const searchableData = [
        property.title,
        property.listingType,
        property.propertyType,
        property.buildingCategory,
        property.propertyStatus,
        property.location,
        property.pricing,
        property.areaDetails,
        property.plotDetails,
        property.residentialDetails,
        property.societyDetails,
        property.rentalTerms,
        property.amenities,
      ];

      const searchableText = normalize(
        collectSearchableValues(searchableData).join(" ")
      );

      const matchesSearch =
        !searchTerm || searchableText.includes(searchTerm);

      return (
        matchesListingType &&
        matchesPropertyType &&
        matchesBuildingCategory &&
        matchesBHK &&
        matchesPrice &&
        matchesSearch
      );
    });
  }, [
    properties,
    search,
    filterType,
    filterPropertyType,
    filterBuildingCategory,
    filterBHK,
    filterPrice,
  ]);

  // Preserve the existing function used by Collection.jsx.
  const getFilteredProperties = useCallback(
    () => filteredProperties,
    [filteredProperties]
  );

  // --------------------------------------------------
  // PRICE FORMATTING
  // --------------------------------------------------

  const formatPrice = useCallback(
    (property) => {
      const listingType = normalizeListingType(property?.listingType);
      const pricing = property?.pricing || {};

      if (listingType === "rent") {
        const rent = toNumber(pricing.monthlyRent);

        return rent !== null && rent > 0
          ? `${currency} ${rent.toLocaleString("en-IN")}/mo`
          : "Rent on Request";
      }

      const price = getEffectivePrice(property);

      if (price === null || price <= 0) {
        return "Price on Request";
      }

      if (price >= 10000000) {
        return `${currency} ${(price / 10000000).toFixed(2)} Cr`;
      }

      if (price >= 100000) {
        return `${currency} ${(price / 100000).toFixed(2)} Lakhs`;
      }

      return `${currency} ${price.toLocaleString("en-IN")}`;
    },
    [currency]
  );

  // --------------------------------------------------
  // CONTEXT API
  // Keep existing names to avoid breaking other pages.
  // --------------------------------------------------

  const value = {
    navigate,
    currency,
    formatPrice,

    properties,
    setProperties,
    getFilteredProperties,

    propertiesLoading,
    propertiesError,
    refreshProperties,

    search,
    setSearch,
    showSearch,
    setShowSearch,

    filterType,
    setFilterType,
    filterPropertyType,
    setFilterPropertyType,
    filterBuildingCategory,
    setFilterBuildingCategory,
    filterBHK,
    setFilterBHK,
    filterPrice,
    setFilterPrice,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
