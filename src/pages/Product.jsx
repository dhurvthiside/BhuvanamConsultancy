import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ContactFloatingButton from '../components/ContactFloatingButton';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, currency } = useContext(ShopContext);

  const propertyId = parseInt(id, 10);
  const product = properties.find((item) => item.id === propertyId);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center text-xl mt-10 text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline text-sm"
      >
        ← Back to Listings
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Thumbnails (scrollable on mobile) */}
        <div className="flex overflow-x-auto lg:flex-col gap-3 scrollbar-none">
          {product.image?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`flex-shrink-0 w-20 h-20 object-cover rounded cursor-pointer border-2 transition-colors duration-200 ${
                selectedImage === img ? 'border-blue-500' : 'border-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-md mx-auto"
            />
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 rounded-xl">
              <span className="text-gray-600">No image to display</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full lg:max-w-md bg-white shadow p-6 sm:p-8 rounded-xl border border-gray-200 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {product.name || `${product.bhk} Apartment`}
          </h1>

          {/* Specification Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm sm:text-lg text-gray-700">
                <strong>Type:</strong> {product.listingType}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-lg text-gray-700">
                <strong>BHK:</strong> {product.bhk}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-lg text-gray-700">
                <strong>Furnishing:</strong> {product.furnishing}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-lg text-gray-700">
                <strong>Area:</strong> {product.builtUpArea} sqft
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm sm:text-lg text-gray-700">
                <strong>Location:</strong> {product.location}
              </p>
            </div>
          </div>

          {/* Price / Rent */}
          {product.listingType === 'sale' && (
            <p className="text-xl sm:text-2xl font-semibold text-green-600">
              ₹{product.price?.toLocaleString()}
            </p>
          )}

          {product.listingType === 'rent' && (
            <p className="text-xl sm:text-2xl font-semibold text-blue-600">
              ₹{product.rent?.toLocaleString()} /month
            </p>
          )}

          {product.listingType === 'both' && (
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-semibold text-green-600">
                ₹{product.price?.toLocaleString()} (Sale)
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-blue-600">
                ₹{product.rent?.toLocaleString()} /month (Rent)
              </p>
            </div>
          )}
        </div>
      </div>

      <ContactFloatingButton />
    </div>
  );
};

export default Product;
