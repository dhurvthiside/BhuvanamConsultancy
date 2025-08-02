import { createContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = "₹"; // Default currency
    // All listings (from assets.js)
    const [properties, setProperties] = useState(assets);

    // Filters
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [filterType, setFilterType] = useState("all"); // 'rent', 'sale', 'all'
    const [filterBHK, setFilterBHK] = useState("all");    // '1', '2', '3', 'all'
    const [filterPrice, setFilterPrice] = useState({ min: 0, max: Infinity });

    // Filtered results
    const getFilteredProperties = () => {
        return properties.filter(property => {
            const matchesType =
                filterType === 'all' ||
                property.listingType === filterType ||
                (filterType === 'rent' && property.listingType === 'both') ||
                (filterType === 'sale' && property.listingType === 'both');

            const bhkNumber = property.bhk.replace('BHK', ''); // "3BHK" → "3"
            const matchesBHK = filterBHK === 'all' || bhkNumber === filterBHK;

            const matchesPrice =
                property.price >= filterPrice.min && property.price <= filterPrice.max;

            const matchesSearch =
                search.trim() === '' ||
                property.location.toLowerCase().includes(search.toLowerCase());

            return matchesType && matchesBHK && matchesPrice && matchesSearch;
        });
    };


    const value = {
        navigate,

        // Listings
        properties,
        getFilteredProperties,
        currency,
        // Filters & UI
        search, setSearch,
        showSearch, setShowSearch,
        filterType, setFilterType,
        filterBHK, setFilterBHK,
        filterPrice, setFilterPrice
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
