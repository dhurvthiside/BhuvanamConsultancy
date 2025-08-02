import React from 'react';
import { assets1 } from '../assets/assets';

const Hero = () => {
    const scrollToCollections = () => {
        const section = document.getElementById('latest-collections');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <img
                src={assets1.hero_img}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Dark overlay (optional, can be lighter if needed) */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

            {/* Button in the center */}
            <div className="relative z-20 flex justify-center items-center h-full">
                <button
                    onClick={scrollToCollections}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition duration-300"
                >
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default Hero;
