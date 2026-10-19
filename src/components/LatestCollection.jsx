
import React, { useContext, useMemo } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const {
    properties = [],
    propertiesLoading = false,
    propertiesError = "",
  } = useContext(ShopContext);

  // Derive the latest sale listings directly from the properties.
  const latestProducts = useMemo(() => {
    if (!Array.isArray(properties)) {
      return [];
    }

    return properties
      .filter(
        (item) =>
          item &&
          String(item.listingType || "").toLowerCase() === "sale"
      )
      .sort((a, b) => {
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
        <Title text1="FOR " text2="SALE" />

        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Discover premium plots, independent houses, and society apartments
          crafted for comfort, convenience, and long-term value.
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {propertiesLoading ? (
          <p className="col-span-full text-center text-gray-500 text-sm py-8">
            Loading the latest properties...
          </p>
        ) : propertiesError && latestProducts.length === 0 ? (
          <p className="col-span-full text-center text-red-500 text-sm py-8">
            Unable to load properties right now. Please try again shortly.
          </p>
        ) : latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              data={item}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm py-8">
            No sale properties available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestCollection;
