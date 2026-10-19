
import React, { useContext, useMemo } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const {
    properties = [],
    propertiesLoading = false,
    propertiesError = "",
  } = useContext(ShopContext);

  // Select featured rentals first, followed by the newest rentals.
  const rentPropertiesList = useMemo(() => {
    if (!Array.isArray(properties)) {
      return [];
    }

    return properties
      .filter(
        (item) =>
          item &&
          String(item.listingType || "").toLowerCase() === "rent"
      )
      .sort((a, b) => {
        // Featured listings always appear before non-featured listings.
        const featuredA = a.featured === true;
        const featuredB = b.featured === true;

        if (featuredA !== featuredB) {
          return featuredA ? -1 : 1;
        }

        // Within each group, sort newest first.
        const dateA = Date.parse(a.postedAt || "") || 0;
        const dateB = Date.parse(b.postedAt || "") || 0;

        return dateB - dateA;
      })
      .slice(0, 8);
  }, [properties]);

  return (
    <section className="my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center py-6 text-2xl sm:text-3xl">
        <Title text1="FOR " text2="RENT" />

        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Flexible rental homes and apartments designed to fit your lifestyle
          and budget — move in with complete ease.
        </p>
      </div>

      {/* Rental Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {propertiesLoading ? (
          <p className="col-span-full text-center text-gray-500 text-sm py-8">
            Loading rental properties...
          </p>
        ) : propertiesError && rentPropertiesList.length === 0 ? (
          <p className="col-span-full text-center text-red-500 text-sm py-8">
            Unable to load rental properties right now. Please try again shortly.
          </p>
        ) : rentPropertiesList.length > 0 ? (
          rentPropertiesList.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              data={item}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm py-8">
            No rental properties available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
