import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../components/Title';
import PropertyItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';
import dropdownIcon from '../assets/dropdown_icon.png';

const Collection = () => {
  const {
    properties,
    getFilteredProperties,
    search, showSearch,
    filterType, setFilterType,
    filterBHK, setFilterBHK,
    filterPrice, setFilterPrice
  } = useContext(ShopContext);

  const location = useLocation();

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);

  // Handle setting filterType from Footer navigation
  useEffect(() => {
    if (location.state && location.state.listingType) {
      setFilterType(location.state.listingType);
    }
  }, [location.state, setFilterType]);

  // Filter and sort properties
  useEffect(() => {
    let filtered = getFilteredProperties();

    // Filter logic for rent/sale + both
    if (filterType === 'rent') {
      filtered = filtered.filter(p => p.listingType === 'rent' || p.listingType === 'both');
    } else if (filterType === 'sale') {
      filtered = filtered.filter(p => p.listingType === 'sale' || p.listingType === 'both');
    }

    let sorted = [...filtered];

    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(sorted);
  }, [search, showSearch, filterType, filterBHK, filterPrice, sortType]);

  return (
    <div className='flex px-6 flex-col sm:flex-row gap-4 pt-10 border-t'>

      {/* FILTER SIDEBAR */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={dropdownIcon} alt="Toggle" />
        </p>

        {/* Listing Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>LISTING TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['rent', 'sale', 'all'].map(type => (
              <label key={type} className='flex items-center gap-2'>
                <input
                  className='w-3'
                  type="radio"
                  name="listingType"
                  value={type}
                  checked={filterType === type}
                  onChange={(e) => setFilterType(e.target.value)}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* BHK Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>BHK</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['1', '2', '3', 'all'].map(bhk => (
              <label key={bhk} className='flex items-center gap-2'>
                <input
                  className='w-3'
                  type="radio"
                  name="bhk"
                  value={bhk}
                  checked={filterBHK === bhk}
                  onChange={(e) => setFilterBHK(e.target.value)}
                />
                {bhk === 'all' ? 'All' : `${bhk} BHK`}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {[ 
              { label: 'Below ₹50L', min: 0, max: 5000000 },
              { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
              { label: 'Above ₹1Cr', min: 10000000, max: Infinity },
            ].map((range, i) => (
              <label key={i} className='flex items-center gap-2'>
                <input
                  className='w-3'
                  type="radio"
                  name="price"
                  onChange={() => setFilterPrice({ min: range.min, max: range.max })}
                />
                {range.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PROPERTY LISTING SECTION */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1="ALL" text2="LISTINGS" />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((item, index) => (
              <PropertyItem key={item.id || index} id={item.id} data={item} />
            ))
          ) : (
            <p className='text-gray-500 text-sm'>No listings match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
