
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ContactFloatingButton from "../components/ContactFloatingButton";

// --------------------------------------------------
// GENERAL DETAIL HELPERS
// --------------------------------------------------

const safeNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const formatNumber = (value) => {
  const number = safeNumber(value);
  return number === null ? null : number.toLocaleString("en-IN");
};

const humanizeKey = (key) =>
  String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatDetailValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-IN");
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    return value
      .map((item) => {
        if (item === null || item === undefined) return "";

        if (typeof item === "object") {
          return JSON.stringify(item);
        }

        return String(item);
      })
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

// Flatten nested JSON into readable labels and values.
// Example: dimensions.widthFt -> Dimensions · Width Ft.
const flattenDetails = (
  object,
  excludedPaths = [],
  prefix = ""
) => {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return [];
  }

  const excluded = new Set(excludedPaths);
  const result = [];

  Object.entries(object).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (excluded.has(path)) return;

    if (value === null || value === undefined || value === "") {
      return;
    }

    if (
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      result.push(
        ...flattenDetails(value, excludedPaths, path)
      );
      return;
    }

    const formattedValue = formatDetailValue(value);

    if (!formattedValue) return;

    result.push({
      key: path,
      label: path
        .split(".")
        .map(humanizeKey)
        .join(" · "),
      value: formattedValue,
    });
  });

  return result;
};

// Reusable UI for additional JSON details.
const AdditionalDetailsSection = ({ title, details }) => {
  if (!details.length) return null;

  return (
    <section className="pt-5 border-t border-gray-200">
      <h3 className="text-base font-bold text-gray-900 mb-4">
        {title}
      </h3>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
        {details.map((detail) => (
          <div
            key={detail.key}
            className="min-w-0 border-b border-gray-100 pb-3"
          >
            <dt className="text-xs text-gray-500 mb-1">
              {detail.label}
            </dt>

            <dd className="text-sm font-semibold text-gray-800 break-words">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    properties,
    currency,
    formatPrice,
    propertiesLoading,
    propertiesError,
  } = useContext(ShopContext);

  // Support UUIDs and numeric IDs.
  const product = useMemo(
    () => properties.find((item) => String(item.id) === String(id)),
    [properties, id]
  );

  const [selectedImage, setSelectedImage] = useState("");

  // --------------------------------------------------
  // IMAGE NORMALIZATION
  // --------------------------------------------------

  const images = useMemo(() => {
    if (!Array.isArray(product?.images)) return [];

    return product.images
      .map((image) => {
        if (typeof image === "string") return image;

        if (image && typeof image === "object") {
          return (
            image.url ||
            image.publicUrl ||
            image.public_url ||
            ""
          );
        }

        return "";
      })
      .filter(Boolean);
  }, [product]);

  useEffect(() => {
    setSelectedImage(images[0] || "");
  }, [images]);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (propertiesLoading) {
    return (
      <div
        className="min-h-[50vh] flex flex-col items-center justify-center px-4"
        role="status"
        aria-live="polite"
      >
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-300 border-t-black mb-4" />

        <p className="text-gray-600 font-medium">
          Loading property details...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // NOT FOUND
  // --------------------------------------------------

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Property listing not found
        </h1>

        <p className="mt-3 text-gray-500">
          This property may have been removed or the link may be incorrect.
        </p>

        {propertiesError && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            We also encountered a database error: {propertiesError}
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate("/collection")}
          className="mt-6 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Browse Properties
        </button>
      </div>
    );
  }

  // --------------------------------------------------
  // PROPERTY DATA
  // --------------------------------------------------

  const {
    title,
    listingType,
    propertyType,
    buildingCategory,
    propertyStatus,
    location = {},
    pricing = {},
    areaDetails = {},
    residentialDetails = {},
    societyDetails = {},
    plotDetails = {},
    rentalTerms = {},
    amenities = [],
  } = product;

  const isRent =
    String(listingType || "").trim().toLowerCase() === "rent";

  const areaUnit = areaDetails.areaUnit || "sq.ft";

  const builtUpArea =
    areaDetails.builtUpAreaSqFt ??
    areaDetails.builtUpArea;

  const carpetArea =
    areaDetails.carpetAreaSqFt ??
    areaDetails.carpetArea;

  const superBuiltUpArea =
    areaDetails.superBuiltUpAreaSqFt ??
    areaDetails.superBuiltUpArea;

  const plotArea =
    areaDetails.plotAreaSqFt ??
    areaDetails.plotAreaSqft ??
    areaDetails.plotArea;

  const udsArea =
    areaDetails.udsSqFt ??
    areaDetails.udsArea;

  const floorDetails = residentialDetails.floorDetails || {};

  const approvals = Array.isArray(plotDetails.approvals)
    ? plotDetails.approvals
    : [];

  const propertyAmenities = Array.isArray(amenities)
    ? amenities
    : [];

  // --------------------------------------------------
  // DYNAMIC JSON DETAILS
  //
  // Exclude fields already displayed in the core
  // specifications below to avoid duplicate rows.
  // Any other JSON key is displayed automatically.
  // --------------------------------------------------

  const extraPlotDetails = flattenDetails(plotDetails, [
    "plotFacing",
    "roadWidthFt",
    "approvals",
  ]);

  const extraResidentialDetails = flattenDetails(
    residentialDetails,
    [
      "bhk",
      "furnishing",
      "doorFacing",
      "floorDetails.floorNo",
      "floorDetails.totalFloors",
      "bathrooms",
      "balconies",
      "ageOfPropertyYears",
    ]
  );

  const extraRentalTerms = flattenDetails(rentalTerms, [
    "notes",
  ]);

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* BACK NAVIGATION */}

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-700 hover:text-black font-medium text-sm flex items-center gap-1 cursor-pointer transition-colors"
      >
        ← Back to Listings
      </button>

      {/* DATABASE WARNING */}

      {propertiesError && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
        >
          Property data could not be refreshed from the database. The
          details below may reflect previously available data.
        </div>
      )}

      {/* MAIN LAYOUT */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* IMAGE GALLERY */}

        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {images.length > 0 && (
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:max-h-[500px] scrollbar-none">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View property image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? "border-black scale-95"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={title || "Property image"}
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-sm border border-gray-200 mx-auto"
              />
            ) : (
              <div className="w-full h-[350px] sm:h-[450px] flex flex-col items-center justify-center bg-gray-200 rounded-2xl border border-dashed border-gray-300">
                <span className="text-4xl mb-3" aria-hidden="true">
                  🏠
                </span>

                <span className="text-gray-500 font-medium">
                  No images available for this property
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PROPERTY DETAILS */}

        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          {/* TITLE AND BADGES */}

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {listingType && (
                <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2.5 py-1 rounded-md">
                  For {listingType}
                </span>
              )}

              {propertyType && (
                <span className="text-xs font-semibold capitalize bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md border border-gray-200">
                  {propertyType}
                </span>
              )}

              {buildingCategory && (
                <span className="text-xs font-semibold capitalize bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">
                  {buildingCategory}
                </span>
              )}

              {propertyStatus && (
                <span className="text-xs font-semibold capitalize bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-200">
                  {String(propertyStatus).replace(/_/g, " ")}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {title || "Property Details"}
            </h1>

            {(location.address ||
              location.locality ||
              location.city ||
              location.landmark) && (
              <p className="text-sm text-gray-500 mt-3">
                <span aria-hidden="true">📍 </span>

                {[
                  location.address,
                  !location.address && location.locality,
                  location.city,
                  location.state,
                  location.pincode,
                ]
                  .filter(Boolean)
                  .filter(
                    (value, index, array) =>
                      array.indexOf(value) === index
                  )
                  .join(", ")}

                {location.landmark &&
                  ` (Landmark: ${location.landmark})`}
              </p>
            )}
          </div>

          {/* PRICE */}

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isRent ? "Monthly Rent" : "Total Price"}
            </p>

            <div className="flex flex-wrap items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-gray-900">
                {formatPrice(product)}
              </span>

              {pricing.isNegotiable && (
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  Negotiable
                </span>
              )}
            </div>

            {safeNumber(pricing.maintenanceCharge) !== null && (
              <p className="text-xs text-gray-500 mt-2">
                Maintenance: {currency}{" "}
                {formatNumber(pricing.maintenanceCharge)}/mo{" "}
                {pricing.isMaintenanceIncluded
                  ? "(Included in Rent)"
                  : "(Extra)"}
              </p>
            )}

            {safeNumber(pricing.securityDeposit) !== null &&
              Number(pricing.securityDeposit) > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Security Deposit: {currency}{" "}
                  {formatNumber(pricing.securityDeposit)}
                </p>
              )}

            {safeNumber(pricing.pricePerSqFt) !== null &&
              Number(pricing.pricePerSqFt) > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Price per sq. ft.: {currency}{" "}
                  {formatNumber(pricing.pricePerSqFt)}
                </p>
              )}
          </div>

          {/* CORE SPECIFICATIONS */}

          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            {residentialDetails.bhk !== undefined &&
              residentialDetails.bhk !== null &&
              residentialDetails.bhk !== "" && (
                <div className="border-b pb-2">
                  <span className="text-gray-500 block text-xs">
                    Configuration
                  </span>
                  <span className="font-semibold text-gray-800">
                    {residentialDetails.bhk} BHK
                  </span>
                </div>
              )}

            {safeNumber(builtUpArea) !== null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Built-up Area
                </span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(builtUpArea)} {areaUnit}
                </span>
              </div>
            )}

            {safeNumber(carpetArea) !== null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Carpet Area
                </span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(carpetArea)} {areaUnit}
                </span>
              </div>
            )}

            {safeNumber(superBuiltUpArea) !== null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Super Built-up Area
                </span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(superBuiltUpArea)} {areaUnit}
                </span>
              </div>
            )}

            {safeNumber(plotArea) !== null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Plot Area
                </span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(plotArea)} {areaUnit}
                </span>
              </div>
            )}

            {safeNumber(udsArea) !== null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  UDS Area
                </span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(udsArea)} {areaUnit}
                </span>
              </div>
            )}

            {residentialDetails.furnishing && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Furnishing
                </span>
                <span className="font-semibold text-gray-800 capitalize">
                  {String(residentialDetails.furnishing).replace(
                    /_/g,
                    " "
                  )}
                </span>
              </div>
            )}

            {(residentialDetails.doorFacing ||
              plotDetails.plotFacing) && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Facing
                </span>
                <span className="font-semibold text-gray-800 capitalize">
                  {residentialDetails.doorFacing ||
                    plotDetails.plotFacing}
                </span>
              </div>
            )}

            {floorDetails.floorNo !== undefined &&
              floorDetails.floorNo !== null && (
                <div className="border-b pb-2">
                  <span className="text-gray-500 block text-xs">
                    Floor Level
                  </span>
                  <span className="font-semibold text-gray-800">
                    Floor {floorDetails.floorNo}
                    {floorDetails.totalFloors !== undefined &&
                      floorDetails.totalFloors !== null &&
                      ` of ${floorDetails.totalFloors}`}
                  </span>
                </div>
              )}

            {(residentialDetails.bathrooms !== undefined ||
              residentialDetails.balconies !== undefined) && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Baths / Balcony
                </span>
                <span className="font-semibold text-gray-800">
                  {residentialDetails.bathrooms ?? 0} Baths,{" "}
                  {residentialDetails.balconies ?? 0} Balcony
                </span>
              </div>
            )}

            {safeNumber(residentialDetails.ageOfPropertyYears) !==
              null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Property Age
                </span>
                <span className="font-semibold text-gray-800">
                  {residentialDetails.ageOfPropertyYears} Years
                </span>
              </div>
            )}

            {safeNumber(plotDetails.roadWidthFt) !== null && (
              <div className="border-b pb-2">
                <span className="text-gray-500 block text-xs">
                  Access Road Width
                </span>
                <span className="font-semibold text-gray-800">
                  {plotDetails.roadWidthFt} Feet
                </span>
              </div>
            )}

            {approvals.length > 0 && (
              <div className="border-b pb-2 col-span-2">
                <span className="text-gray-500 block text-xs">
                  Statutory Approvals
                </span>
                <span className="font-semibold text-gray-800">
                  {approvals.join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* SOCIETY DETAILS */}

          {societyDetails.societyName && (
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-900 uppercase">
                Society Community
              </p>

              <p className="text-base font-bold text-blue-950 mt-1">
                {societyDetails.societyName}
              </p>

              {societyDetails.totalTowers && (
                <p className="text-xs text-blue-800 mt-1">
                  Community size: {societyDetails.totalTowers} Towers
                </p>
              )}
            </div>
          )}

          {/* RENTAL NOTES */}

          {rentalTerms.notes && (
            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Rental Conditions:</strong> {rentalTerms.notes}
            </div>
          )}

          {/* ADDITIONAL JSON DETAILS */}

          <AdditionalDetailsSection
            title="Additional Plot Details"
            details={extraPlotDetails}
          />

          <AdditionalDetailsSection
            title="Additional Residential Details"
            details={extraResidentialDetails}
          />

          <AdditionalDetailsSection
            title="Rental Terms & Conditions"
            details={extraRentalTerms}
          />

          {/* AMENITIES */}

          {propertyAmenities.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Amenities & Key Features
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                {propertyAmenities.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-1.5"
                  >
                    <span
                      className="text-green-600 font-bold"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONTACT BUTTON */}

      <ContactFloatingButton />
    </div>
  );
};

export default Product;
