import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const [rentPropertiesList, setRentPropertiesList] = useState([]);
  const { properties } = useContext(ShopContext);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // 1. Filter properties listed strictly for Rent
      const rentProperties = properties.filter(
        (item) => item.listingType === "rent"
      );

      // 2. Sort by featured status first, then by postedAt date (Newest first)
      const sortedRentals = [...rentProperties].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.postedAt || 0) - new Date(a.postedAt || 0);
      });

      // 3. Display the top 4 to 8 rental listings
      setRentPropertiesList(sortedRentals.slice(0, 8));
    }
  }, [properties]);

  return (
    <div className="my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center py-6 text-2xl sm:text-3xl">
        <Title text1={"FOR "} text2={"RENT"} />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          "Flexible rental homes and apartments designed to fit your lifestyle
          and budget — move in with complete ease."
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {rentPropertiesList.length > 0 ? (
          rentPropertiesList.map((item) => (
            <ProductItem key={item.id} id={item.id} data={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm py-8">
            No rental properties available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;