import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Title from "../components/Title";
import PropertyItem from "../components/ProductItem"; // Ensure your component receives full item data
import { ShopContext } from "../context/ShopContext";
import dropdownIcon from "../assets/dropdown_icon.png";

const Collection = () => {
  const {
    getFilteredProperties,
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

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);

  // Handle setting filterType from Footer / Header navigation state
  useEffect(() => {
    if (location.state && location.state.listingType) {
      setFilterType(location.state.listingType);
    }
  }, [location.state, setFilterType]);

  // Dynamic Price Extractor Helper for Sorting
  const getPropertyEffectivePrice = (property) => {
    if (!property?.pricing) return 0;
    if (property.listingType === "rent") {
      return property.pricing.monthlyRent || 0;
    }
    return (
      property.pricing.totalPrice ||
      (property.pricing.pricePerSqFt && property.areaDetails?.plotAreaSqFt
        ? property.pricing.pricePerSqFt * property.areaDetails.plotAreaSqFt
        : 0)
    );
  };

  // Filter and sort properties whenever dependencies update
  useEffect(() => {
    let filtered = getFilteredProperties();
    let sorted = [...filtered];

    if (sortType === "low-high") {
      sorted.sort(
        (a, b) => getPropertyEffectivePrice(a) - getPropertyEffectivePrice(b)
      );
    } else if (sortType === "high-low") {
      sorted.sort(
        (a, b) => getPropertyEffectivePrice(b) - getPropertyEffectivePrice(a)
      );
    }

    setFilteredProperties(sorted);
  }, [
    search,
    showSearch,
    filterType,
    filterPropertyType,
    filterBuildingCategory,
    filterBHK,
    filterPrice,
    sortType,
  ]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setFilterType("all");
    setFilterPropertyType("all");
    setFilterBuildingCategory("all");
    setFilterBHK("all");
    setFilterPrice({ min: 0, max: Infinity });
  };

  return (
    <div className="flex px-4 sm:px-8 flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* ========================================== */}
      {/* FILTER SIDEBAR                              */}
      {/* ========================================== */}
      <div className="min-w-64">
        <div className="flex items-center justify-between my-2">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="text-xl font-semibold flex items-center cursor-pointer gap-2 select-none"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden transform transition-transform ${
                showFilter ? "rotate-90" : ""
              }`}
              src={dropdownIcon}
              alt="Toggle"
            />
          </p>

          <button
            onClick={handleResetFilters}
            className="text-xs text-red-600 hover:underline font-medium cursor-pointer"
          >
            Reset All
          </button>
        </div>

        {/* 1. LISTING TYPE FILTER (Sale vs Rent) */}
        <div
          className={`border border-gray-300 p-4 mt-4 rounded-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-800">LISTING TYPE</p>
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
                  onChange={(e) => setFilterType(e.target.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        {/* 2. PROPERTY TYPE FILTER (Plot, Apartment, Flat, etc.) */}
        <div
          className={`border border-gray-300 p-4 my-4 rounded-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
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
                  onChange={(e) => setFilterPropertyType(e.target.value)}
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>

        {/* 3. BUILDING CATEGORY (Standalone vs Society) */}
        <div
          className={`border border-gray-300 p-4 my-4 rounded-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-800">
            BUILDING CATEGORY
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              { label: "All Buildings", value: "all" },
              { label: "Society / Gated Community", value: "society" },
              { label: "Standalone Building", value: "standalone" },
            ].map((cat) => (
              <label
                key={cat.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="buildingCategory"
                  value={cat.value}
                  checked={filterBuildingCategory === cat.value}
                  onChange={(e) => setFilterBuildingCategory(e.target.value)}
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        {/* 4. BHK CONFIGURATION FILTER */}
        <div
          className={`border border-gray-300 p-4 my-4 rounded-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
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
                  onChange={(e) => setFilterBHK(e.target.value)}
                />
                {bhk === "all" ? "All BHKs" : `${bhk} BHK`}
              </label>
            ))}
          </div>
        </div>

        {/* 5. PRICE RANGE FILTER */}
        <div
          className={`border border-gray-300 p-4 my-4 rounded-sm ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-800">
            PRICE RANGE
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {[
              { label: "All Prices", min: 0, max: Infinity },
              { label: "Under ₹30,000 (Rent)", min: 0, max: 30000 },
              { label: "₹30k - ₹60k (Rent)", min: 30000, max: 60000 },
              { label: "Below ₹50 Lakhs", min: 0, max: 5000000 },
              { label: "₹50L - ₹1 Crore", min: 5000000, max: 10000000 },
              { label: "Above ₹1 Crore", min: 10000000, max: Infinity },
            ].map((range, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-4 h-4 accent-black"
                  type="radio"
                  name="price"
                  checked={
                    filterPrice.min === range.min &&
                    filterPrice.max === range.max
                  }
                  onChange={() =>
                    setFilterPrice({ min: range.min, max: range.max })
                  }
                />
                {range.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* PROPERTY LISTING SECTION                    */}
      {/* ========================================== */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-6">
          <Title text1="ALL" text2="PROPERTIES" />

          {/* Sort Selector */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3 py-1.5 rounded-sm focus:outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price (Low to High)</option>
            <option value="high-low">Sort by: Price (High to Low)</option>
          </select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((item) => (
              <PropertyItem key={item.id} id={item.id} data={item} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500 font-medium">
                No properties match your selected filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-3 text-sm text-black underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;