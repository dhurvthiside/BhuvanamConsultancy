import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory, listingType }) => {
    const [related, setRelated] = useState([]);
    const { products } = useContext(ShopContext);

    useEffect(() => {
        if (products.length > 0) {
            let filtered = products.slice();

            if (category) {
                filtered = filtered.filter(item => item.category === category);
            }

            if (subCategory) {
                filtered = filtered.filter(item => item.subCategory === subCategory);
            }

            if (listingType) {
                filtered = filtered.filter(item => item.listingType === listingType);
            }

            setRelated(filtered.slice(0, 5));
        }
    }, [products, category, subCategory, listingType]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1="RELATED" text2="LISTINGS" />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        bhk={item.bhk}
                        listingType={item.listingType}
                        location={item.location}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
