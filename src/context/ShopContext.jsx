import { createContext, useState, useMemo } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = "₹";

  // All listings (from assets.js)
  const [properties, setProperties] = useState(assets);

  // Search & Visibility
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Filters
  const [filterType, setFilterType] = useState("all");            // 'sale' | 'rent' | 'all'
  const [filterPropertyType, setFilterPropertyType] = useState("all"); // 'apartment' | 'flat' | 'plot' | 'villa' | 'all'
  const [filterBuildingCategory, setFilterBuildingCategory] = useState("all"); // 'standalone' | 'society' | 'all'
  const [filterBHK, setFilterBHK] = useState("all");             // '1' | '2' | '3' | '4' | 'all'
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: Infinity });

  // ---------------------------------------------------------------------------
  // FILTERING LOGIC
  // ---------------------------------------------------------------------------
  const getFilteredProperties = () => {
    return properties.filter((property) => {
      // 1. Filter by Listing Type (Sale vs Rent)
      const matchesType =
        filterType === "all" || property.listingType === filterType;

      // 2. Filter by Property Type (Plot, Apartment, Flat, etc.)
      const matchesPropertyType =
        filterPropertyType === "all" ||
        property.propertyType === filterPropertyType;

      // 3. Filter by Building Category (Standalone vs Society Complex)
      const matchesBuildingCategory =
        filterBuildingCategory === "all" ||
        property.buildingCategory === filterBuildingCategory;

      // 4. Filter by BHK (Safely check inside residentialDetails)
      const bhkVal = property.residentialDetails?.bhk;
      const matchesBHK =
        filterBHK === "all" ||
        (bhkVal !== undefined && bhkVal !== null && String(bhkVal) === String(filterBHK));

      // 5. Dynamic Price Resolver (Monthly Rent vs Total Sale Price)
      let effectivePrice = 0;
      if (property.listingType === "rent") {
        effectivePrice = property.pricing?.monthlyRent || 0;
      } else {
        // For sale: fallback to total price, or calculate price * area if total is missing
        effectivePrice =
          property.pricing?.totalPrice ||
          (property.pricing?.pricePerSqFt && property.areaDetails?.plotAreaSqFt
            ? property.pricing.pricePerSqFt * property.areaDetails.plotAreaSqFt
            : 0);
      }

      const matchesPrice =
        effectivePrice >= filterPrice.min && effectivePrice <= filterPrice.max;

      // 6. Deep Multi-Field Search Execution
      const searchTerm = search.trim().toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        property.title?.toLowerCase().includes(searchTerm) ||
        property.location?.locality?.toLowerCase().includes(searchTerm) ||
        property.location?.city?.toLowerCase().includes(searchTerm) ||
        property.location?.address?.toLowerCase().includes(searchTerm) ||
        property.societyDetails?.societyName?.toLowerCase().includes(searchTerm);

      return (
        matchesType &&
        matchesPropertyType &&
        matchesBuildingCategory &&
        matchesBHK &&
        matchesPrice &&
        matchesSearch
      );
    });
  };

  // ---------------------------------------------------------------------------
  // UTILITY HELPER: Format Price into Indian Currency Standards (Cr / L / K)
  // ---------------------------------------------------------------------------
  const formatPrice = (property) => {
    if (!property?.pricing) return "Price on Request";

    if (property.listingType === "rent") {
      const rent = property.pricing.monthlyRent;
      return rent ? `${currency} ${rent.toLocaleString("en-IN")}/mo` : "Rent on Request";
    }

    const price =
      property.pricing.totalPrice ||
      (property.pricing.pricePerSqFt && property.areaDetails?.plotAreaSqFt
        ? property.pricing.pricePerSqFt * property.areaDetails.plotAreaSqFt
        : null);

    if (!price) return "Price on Request";

    if (price >= 10000000) {
      return `${currency} ${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${currency} ${(price / 100000).toFixed(2)} Lakhs`;
    }
    return `${currency} ${price.toLocaleString("en-IN")}`;
  };

  const value = {
    navigate,
    currency,
    formatPrice,

    // Listings Data
    properties,
    setProperties,
    getFilteredProperties,

    // Search & UI
    search,
    setSearch,
    showSearch,
    setShowSearch,

    // Filters
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

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;