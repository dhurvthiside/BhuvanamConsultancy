import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, data }) => {
  const { formatPrice } = useContext(ShopContext);

  if (!data) return null;

  const {
    title,
    images,
    listingType,
    propertyType,
    buildingCategory,
    location,
    residentialDetails,
    areaDetails,
  } = data;

  // Safely determine thumbnail image
  const thumbnail = images && images.length > 0 ? images[0] : null;

  // Format Location string safely
  const locationString = location
    ? `${location.locality || location.address || ""}${
        location.city ? `, ${location.city}` : ""
      }`
    : "Location on Request";

  // Build secondary spec tag (e.g., "3 BHK • Semi-Furnished" or "3,845 Sq.Ft. Plot")
  const specString =
    propertyType === "plot"
      ? `${areaDetails?.plotAreaSqFt ? `${areaDetails.plotAreaSqFt.toLocaleString()} Sq.Ft. • ` : ""}Plot`
      : `${residentialDetails?.bhk ? `${residentialDetails.bhk} BHK` : "Apartment"}${
          residentialDetails?.furnishing
            ? ` • ${residentialDetails.furnishing.replace("_", " ")}`
            : ""
        }`;

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="text-gray-800 cursor-pointer group flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
    >
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden h-48 w-full bg-gray-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title || locationString}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
            No Image Available
          </div>
        )}

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-md shadow-xs">
            FOR {listingType}
          </span>
          <span className="text-[10px] font-semibold capitalize bg-white/90 text-gray-800 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
            {buildingCategory || propertyType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <p className="font-bold text-sm text-gray-900 line-clamp-1">
            {title || specString}
          </p>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            📍 {locationString}
          </p>

          <p className="text-xs text-gray-600 mt-1 font-medium capitalize">
            {specString}
          </p>
        </div>

        {/* Price Output */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-base font-extrabold text-gray-900">
            {formatPrice(data)}
          </span>

          <span className="text-xs font-semibold text-blue-600 group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;