import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const { properties } = useContext(ShopContext);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // 1. Filter properties listed for Sale
      const saleProperties = properties.filter(
        (item) => item.listingType === "sale"
      );

      // 2. Sort chronologically by postedAt date (Newest first)
      const sortedSaleProperties = [...saleProperties].sort(
        (a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0)
      );

      // 3. Take the top 8-10 latest properties
      setLatestProducts(sortedSaleProperties.slice(0, 8));
    }
  }, [properties]);

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center py-6 text-2xl sm:text-3xl">
        <Title text1={"FOR "} text2={"SALE"} />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          "Discover premium plots, independent houses, and society apartments
          crafted for comfort, convenience, and long-term value."
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <ProductItem key={item.id} id={item.id} data={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm py-8">
            No sale properties available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;