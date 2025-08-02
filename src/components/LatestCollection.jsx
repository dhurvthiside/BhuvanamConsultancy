import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const { properties } = useContext(ShopContext);

    useEffect(() => {
        if (properties.length > 0) {
            const saleProperties = properties.filter(item => item.listingType === 'sale' || item.listingType === 'both');
            setLatestProducts(saleProperties.slice(0, 10));
        }
    }, [properties]);

    return (
        <div className='my-20 px-4 sm:px-6 lg:px-8'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"FOR "} text2={"SALE"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    "Discover premium properties crafted for comfort, convenience, and a lifetime of value."
                </p>
            </div>

            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item.id} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection;
