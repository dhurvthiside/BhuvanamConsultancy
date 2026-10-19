
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import Title from "../components/Title";
import PropertyItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import dropdownIcon from "../assets/dropdown_icon.png";

const ALL_PRICES = {
  min: 0,
  max: Infinity,
  listingType: "all",
};

const RENT_RANGES = [
  { label: "Under ₹30,000", min: 0, max: 30000, listingType: "rent" },
  {
    label: "₹30,000 – ₹60,000",
    min: 30000,
    max: 60000,
    listingType: "rent",
  },
  {
    label: "Above ₹60,000",
    min: 60000,
    max: Infinity,
    listingType: "rent",
  },
];

const SALE_RANGES = [
  { label: "Below ₹50 Lakhs", min: 0, max: 5000000, listingType: "sale" },
  {
    label: "₹50 Lakhs – ₹1 Crore",
    min: 5000000,
    max: 10000000,
    listingType: "sale",
  },
  {
    label: "Above ₹1 Crore",
    min: 10000000,
    max: Infinity,
    listingType: "sale",
  },
];

const getPropertyEffectivePrice = (property) => {
  const pricing = property?.pricing || {};

  if (
    String(property?.listingType || "").trim().toLowerCase() === "rent"
  ) {
    const rent = Number(pricing.monthlyRent);
    return Number.isFinite(rent) && rent > 0 ? rent : null;
  }

  const totalPrice = Number(pricing.totalPrice);

  if (Number.isFinite(totalPrice) && totalPrice > 0) {
    return totalPrice;
  }

  const pricePerSqFt = Number(pricing.pricePerSqFt);
  const areaDetails = property?.areaDetails || {};

  const plotArea =
    Number(areaDetails.plotAreaSqFt) ||
    Number(areaDetails.plotAreaSqft) ||
    Number(areaDetails.plotArea) ||
    0;

  if (
    Number.isFinite(pricePerSqFt) &&
    pricePerSqFt > 0 &&
    plotArea > 0
  ) {
    return pricePerSqFt * plotArea;
  }

  return null;
};

const samePriceRange = (selected, range) =>
  Number(selected?.min ?? 0) === range.min &&
  selected?.max === range.max &&
  (selected?.listingType || "all") === range.listingType;

const Collection = () => {
  const {
    getFilteredProperties,
    propertiesLoading,
    propertiesError,

    search,
    showSearch,

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
  } = useContext(ShopContext);

  const location = useLocation();

  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);

  // Apply an explicit listing type passed by navigation.
  useEffect(() => {
    const requestedType = location.state?.listingType;

    if (requestedType === "sale" || requestedType === "rent") {
      setFilterType(requestedType);
      setFilterPrice(ALL_PRICES);
    }
  }, [location.state, setFilterType, setFilterPrice]);

  // Choose price ranges that make sense for the current listing type.
  const priceRanges = useMemo(() => {
    if (filterType === "rent") {
      return RENT_RANGES;
    }

    if (filterType === "sale") {
      return SALE_RANGES;
    }

    return [
      ...RENT_RANGES.map((range) => ({
        ...range,
        label: `Rent: ${range.label}`,
      })),
      ...SALE_RANGES.map((range) => ({
        ...range,
        label: `Sale: ${range.label}`,
      })),
    ];
  }, [filterType]);

  const filteredProperties = useMemo(() => {
    const filtered = getFilteredProperties();
    const sorted = [...filtered];

    if (sortType === "low-high") {
      sorted.sort((a, b) => {
        const priceA = getPropertyEffectivePrice(a);
        const priceB = getPropertyEffectivePrice(b);

        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;

        return priceA - priceB;
      });
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => {
        const priceA = getPropertyEffectivePrice(a);
        const priceB = getPropertyEffectivePrice(b);

        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;

        return priceB - priceA;
      });
    }

    return sorted;
  }, [getFilteredProperties, sortType]);

  const handleListingTypeChange = (value) => {
    setFilterType(value);
    setFilterPrice(ALL_PRICES);
  };

  const handleResetFilters = () => {
    setFilterType("all");
    setFilterPropertyType("all");
    setFilterBuildingCategory("all");
    setFilterBHK("all");
    setFilterPrice(ALL_PRICES);
  };

  const filterPanelClass = `border border-gray-300 p-4 my-4 rounded-sm ${
    showFilter ? "" : "hidden"
  } sm:block`;

  return (
    <div className="flex px-4 sm:px-8 flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* FILTER SIDEBAR */}
      <div className="min-w-64">
        <div className="flex items-center justify-between my-2">
          <button
            type="button"
            onClick={() => setShowFilter((previous) => !previous)}
            className="text-xl font-semibold flex items-center cursor-pointer gap-2 select-none"
            aria-expanded={showFilter}
          >
            FILTERS

            <img
              className={`h-3 sm:hidden transform transition-transform ${
                showFilter ? "rotate-90" : ""
              }`}
              src={dropdownIcon}
              alt=""
            />
          </button>

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs text-red-600 hover:underline font-medium cursor-pointer"
          >
            Reset All
          </button>
        </div>

        {/* LISTING TYPE */}
        <div className={filterPanelClass}>
          <p className="mb-3 text-sm font-semibold text-gray-800">
            LISTING TYPE
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              { label: "All Properties", value: "all" },
              { label: "For Sale", value: "sale" },
              { label: "For Rent", value: "rent" },
            ].map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="listingType"
                  value={item.value}
                  checked={filterType === item.value}
                  onChange={(event) =>
                    handleListingTypeChange(event.target.value)
                  }
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        {/* PROPERTY TYPE */}
        <div className={filterPanelClass}>
          <p className="mb-3 text-sm font-semibold text-gray-800">
            PROPERTY TYPE
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              { label: "All Types", value: "all" },
              { label: "Apartments", value: "apartment" },
              { label: "Flats", value: "flat" },
              { label: "Plots / Land", value: "plot" },
              { label: "Villas", value: "villa" },
            ].map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="propertyType"
                  value={type.value}
                  checked={filterPropertyType === type.value}
                  onChange={(event) =>
                    setFilterPropertyType(event.target.value)
                  }
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>

        {/* BUILDING CATEGORY */}
        <div className={filterPanelClass}>
          <p className="mb-3 text-sm font-semibold text-gray-800">
            BUILDING CATEGORY
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              { label: "All Buildings", value: "all" },
              {
                label: "Society / Gated Community",
                value: "society",
              },
              {
                label: "Standalone Building",
                value: "standalone",
              },
            ].map((category) => (
              <label
                key={category.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="buildingCategory"
                  value={category.value}
                  checked={filterBuildingCategory === category.value}
                  onChange={(event) =>
                    setFilterBuildingCategory(event.target.value)
                  }
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>

        {/* BHK */}
        <div className={filterPanelClass}>
          <p className="mb-3 text-sm font-semibold text-gray-800">BHK</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["all", "1", "2", "3", "4"].map((bhk) => (
              <label
                key={bhk}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="bhk"
                  value={bhk}
                  checked={filterBHK === bhk}
                  onChange={(event) => setFilterBHK(event.target.value)}
                />
                {bhk === "all" ? "All BHKs" : `${bhk} BHK`}
              </label>
            ))}
          </div>
        </div>

        {/* PRICE RANGE */}
        <div className={filterPanelClass}>
          <p className="mb-3 text-sm font-semibold text-gray-800">
            PRICE RANGE
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                className="w-4 h-4 accent-black"
                type="radio"
                name="price"
                checked={samePriceRange(filterPrice, ALL_PRICES)}
                onChange={() => setFilterPrice(ALL_PRICES)}
              />
              All Prices
            </label>

            {priceRanges.map((range) => (
              <label
                key={`${range.listingType}-${range.label}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="price"
                  checked={samePriceRange(filterPrice, range)}
                  onChange={() =>
                    setFilterPrice({
                      min: range.min,
                      max: range.max,
                      listingType: range.listingType,
                    })
                  }
                />
                {range.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PROPERTY LISTINGS */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-base sm:text-2xl mb-6">
          <Title text1="ALL" text2="PROPERTIES" />

          <select
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
            aria-label="Sort properties"
            className="border-2 border-gray-300 text-sm px-3 py-1.5 rounded-sm focus:outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price (Low to High)</option>
            <option value="high-low">Sort by: Price (High to Low)</option>
          </select>
        </div>

        {propertiesError && (
          <div
            role="alert"
            className="mb-5 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p className="font-semibold">
              Unable to refresh properties from the database.
            </p>
            <p className="mt-1">{propertiesError}</p>
          </div>
        )}

        {propertiesLoading ? (
          <div
            className="py-16 text-center text-gray-500"
            role="status"
            aria-live="polite"
          >
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
            <p className="font-medium">Loading properties...</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-500">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? "property"
                : "properties"}{" "}
              found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((item) => (
                  <PropertyItem
                    key={item.id}
                    id={item.id}
                    data={item}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500 font-medium">
                    {search.trim()
                      ? `No properties found for "${search}".`
                      : "No properties match your selected filters."}
                  </p>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-3 text-sm text-black underline font-semibold"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;
