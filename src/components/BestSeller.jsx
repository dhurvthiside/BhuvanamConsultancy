import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([])
    const { properties } = useContext(ShopContext)

    useEffect(() => {
        // Filter only Rent-type properties
        const rentProperties = properties.filter((item) => item.listingType === "rent" || item.listingType === "both");
        setBestSeller(rentProperties.slice(0, 5))
    }, [properties])

    return (
        <div className='my-10 px-4 sm:px-6 lg:px-8'>
            <div className='text-center text-3xl py-8'>
                <Title text1={"FOR"} text2={"RENT"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    "Flexible rental properties designed to fit your lifestyle and budget — move in with ease."
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item.id} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
