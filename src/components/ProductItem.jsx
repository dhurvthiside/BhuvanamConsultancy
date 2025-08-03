import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, data }) => {
  const { currency } = useContext(ShopContext);

  const {
    image,
    bhk,
    location,
    listingType,
    furnishing,
    price,
    rent,
    deposit,
  } = data;

  const displayPrice = listingType === 'rent'
    ? `${currency}${rent?.toLocaleString('en-IN')} Rent`
    : `${currency}${price?.toLocaleString('en-IN')}${listingType === 'both' ? ' (Sale)' : ''}`;

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="text-gray-800 cursor-pointer group"
    >
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <img
          src={image?.[0]}
          alt={location}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-2 px-1">
        <p className="font-semibold text-sm truncate">{bhk} | {furnishing}</p>
        <p className="text-xs text-gray-500 truncate">{location}</p>
        <p className="text-xs text-blue-600 font-semibold capitalize">{listingType}</p>
        <p className="text-sm font-bold mt-1">{displayPrice}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
