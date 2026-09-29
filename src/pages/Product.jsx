import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ContactFloatingButton from "../components/ContactFloatingButton";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, currency, formatPrice } = useContext(ShopContext);

  const propertyId = parseInt(id, 10);
  const product = properties.find((item) => item.id === propertyId);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Schema supports product.images array
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    } else {
      setSelectedImage(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center text-xl mt-16 font-semibold text-red-600">
        Property listing not found.
      </div>
    );
  }

  // Destructure modular schema blocks safely
  const {
    title,
    listingType,
    propertyType,
    buildingCategory,
    propertyStatus,
    location,
    pricing,
    areaDetails,
    residentialDetails,
    societyDetails,
    plotDetails,
    rentalTerms,
    amenities,
    images = [],
  } = product;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Back Navigation Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-700 hover:text-black font-medium text-sm flex items-center gap-1 cursor-pointer transition-colors"
      >
        ← Back to Listings
      </button>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: GALLERY & IMAGES (7 Cols)      */}
        {/* ========================================== */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnail Strip */}
          {images.length > 0 && (
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 max-h-[500px] scrollbar-none">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? "border-black scale-95"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Main Selected Image */}
          <div className="flex-1">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={title}
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-sm border border-gray-200 mx-auto"
              />
            ) : (
              <div className="w-full h-[350px] sm:h-[450px] flex flex-col items-center justify-center bg-gray-200 rounded-2xl border border-dashed border-gray-300">
                <span className="text-gray-500 font-medium">
                  No images available for this property
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: PROPERTY DETAILS (5 Cols)     */}
        {/* ========================================== */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          
          {/* Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2.5 py-1 rounded-md">
                FOR {listingType}
              </span>
              <span className="text-xs font-semibold capitalize bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md border border-gray-200">
                {propertyType}
              </span>
              <span className="text-xs font-semibold capitalize bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">
                {buildingCategory}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>

            {/* Location */}
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              📍 {location?.address || `${location?.locality}, ${location?.city}`}
              {location?.landmark && ` (Landmark: ${location.landmark})`}
            </p>
          </div>

          {/* Price Block */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {listingType === "rent" ? "Monthly Rent" : "Total Price"}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-gray-900">
                {formatPrice(product)}
              </span>
              {pricing?.isNegotiable && (
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  Negotiable
                </span>
              )}
            </div>

            {/* Additional Pricing Meta */}
            {pricing?.maintenanceCharge !== undefined && pricing?.maintenanceCharge !== null && (
              <p className="text-xs text-gray-500 mt-2">
                Maintenance: {currency} {pricing.maintenanceCharge.toLocaleString("en-IN")}/mo{" "}
                {pricing.isMaintenanceIncluded ? "(Included in Rent)" : "(Extra)"}
              </p>
            )}
            {pricing?.securityDeposit && (
              <p className="text-xs text-gray-500 mt-1">
                Security Deposit: {currency} {pricing.securityDeposit.toLocaleString("en-IN")}
              </p>
            )}
          </div>

          {/* Core Specifications Matrix */}
          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            
            {/* BHK (If Residential) */}
            {residentialDetails?.bhk && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Configuration</span>
                <span className="font-semibold text-gray-800">
                  {residentialDetails.bhk} BHK
                </span>
              </div>
            )}

            {/* Built-Up or Plot Area */}
            {areaDetails?.builtUpAreaSqFt ? (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Built-up Area</span>
                <span className="font-semibold text-gray-800">
                  {areaDetails.builtUpAreaSqFt} Sq.Ft.
                </span>
              </div>
            ) : areaDetails?.plotAreaSqFt ? (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Plot Area</span>
                <span className="font-semibold text-gray-800">
                  {areaDetails.plotAreaSqFt} Sq.Ft.
                </span>
              </div>
            ) : null}

            {/* UDS (Undivided Share of Land) */}
            {areaDetails?.udsSqFt && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">UDS Area</span>
                <span className="font-semibold text-gray-800">
                  {areaDetails.udsSqFt} Sq.Ft.
                </span>
              </div>
            )}

            {/* Furnishing */}
            {residentialDetails?.furnishing && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Furnishing</span>
                <span className="font-semibold text-gray-800 capitalize">
                  {residentialDetails.furnishing.replace("_", " ")}
                </span>
              </div>
            )}

            {/* Facing */}
            {(residentialDetails?.doorFacing || plotDetails?.plotFacing) && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Facing</span>
                <span className="font-semibold text-gray-800 capitalize">
                  {residentialDetails?.doorFacing || plotDetails?.plotFacing}
                </span>
              </div>
            )}

            {/* Floor Details */}
            {residentialDetails?.floorDetails?.floorNo !== undefined && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Floor Level</span>
                <span className="font-semibold text-gray-800">
                  Floor {residentialDetails.floorDetails.floorNo}{" "}
                  {residentialDetails.floorDetails.totalFloors &&
                    `of ${residentialDetails.floorDetails.totalFloors}`}
                </span>
              </div>
            )}

            {/* Bathrooms & Balconies */}
            {residentialDetails?.bathrooms && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Baths / Balcony</span>
                <span className="font-semibold text-gray-800">
                  {residentialDetails.bathrooms} Baths, {residentialDetails.balconies || 0} Balcony
                </span>
              </div>
            )}

            {/* Age of Property */}
            {residentialDetails?.ageOfPropertyYears && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Property Age</span>
                <span className="font-semibold text-gray-800">
                  {residentialDetails.ageOfPropertyYears} Years
                </span>
              </div>
            )}

            {/* Plot Specifics */}
            {plotDetails?.roadWidthFt && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Access Road Width</span>
                <span className="font-semibold text-gray-800">
                  {plotDetails.roadWidthFt} Feet
                </span>
              </div>
            )}
            {plotDetails?.approvals?.length > 0 && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">Statutory Approvals</span>
                <span className="font-semibold text-gray-800">
                  {plotDetails.approvals.join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Society Details (If Applicable) */}
          {societyDetails?.societyName && (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-900 uppercase">
                Society Community
              </p>
              <p className="text-base font-bold text-blue-950 mt-0.5">
                {societyDetails.societyName}
              </p>
              {societyDetails.totalTowers && (
                <p className="text-xs text-blue-800 mt-1">
                  Community size: {societyDetails.totalTowers} Towers
                </p>
              )}
            </div>
          )}

          {/* Rental Terms Notes (If Applicable) */}
          {rentalTerms?.notes && (
            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Rental Conditions:</strong> {rentalTerms.notes}
            </div>
          )}

          {/* Amenities & Features (String Array Bullets) */}
          {amenities && amenities.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Amenities & Key Features
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                {amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ContactFloatingButton />
    </div>
  );
};

export default Product;