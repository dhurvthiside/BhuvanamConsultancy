import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handleRentalClick = () => {
        navigate('/collection', { state: { category: 'Men' } });
    };

    const handleSaleClick = () => {
        navigate('/collection', { state: { category: 'Kids' } });
    };

    const scrollToHash = (id) => {
        window.location.href = `/management#${id}`;
    };

    return (
        <div className='w-full bg-[#091d35] text-white tracking-wider text-lg sm:text-xl font-barlow px-4 sm:px-10 py-5 flex justify-between items-center relative z-50'>
            <Link to='/'><img className='w-44 py-1 sm:w-52' src={assets.logo} alt="Logo" /></Link>

            <ul className='hidden sm:flex gap-6 items-center ml-auto relative z-50'>
                <NavLink to="/" className='hover:underline'>Home</NavLink>
                <NavLink to="/about" className='hover:underline'>About Us</NavLink>

                {/* Real Estate Dropdown */}
                <div className="relative group">
                    <button className="inline-flex items-center hover:underline" type="button">
                        Real Estate
                        <svg className="w-2.5 h-2.5 ms-1.5" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div className="absolute hidden z-10 bg-white text-gray-800 divide-y divide-gray-100 rounded-lg shadow w-44 group-hover:block">
                        <ul className="py-2 text-sm">
                            <li><button onClick={handleRentalClick} className="w-full text-left px-4 py-2 hover:bg-gray-100">Rentals</button></li>
                            <li><button onClick={handleSaleClick} className="w-full text-left px-4 py-2 hover:bg-gray-100">Sale</button></li>
                        </ul>
                    </div>
                </div>

                {/* Property Management Dropdown */}
                <div className="relative group">
                    <button className="inline-flex items-center hover:underline" type="button">
                        Property Management
                        <svg className="w-2.5 h-2.5 ms-1.5" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div className="absolute hidden z-10 bg-white text-gray-800 divide-y divide-gray-100 rounded-lg shadow w-72 group-hover:block">
                        <ul className="py-2 text-sm max-h-96 overflow-y-auto">
                            {[
                                ['Basic Services', 'basic'],
                                ['Premium Services', 'premium'],
                                ['Cleaning Services', 'cleaning'],
                                ['Document Preparation', 'documents'],
                                ['Painting Services', 'painting'],
                                ['Carpentry', 'carpentry'],
                                ['Plumbing', 'plumbing'],
                                ['Pigeon/Monkey Net', 'pigeon-monkey-net'],
                                ['AC Installation and Repair', 'ac'],
                                ['Chimney Hub Cleaning/Repair', 'chimney'],
                                ['Fridge Repair', 'fridge'],
                                ['Tile Work', 'tile'],
                                ['Legal Advice', 'legal'],
                            ].map(([label, id]) => (
                                <li key={id}>
                                    <a
                                        href={`/management#${id}`}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <NavLink to="/contact" className='hover:underline'>Contact Us</NavLink>
            </ul>

            {/* Mobile Menu Icon */}
            <img onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="menu" />

            {/* Sidebar for Mobile */}
            <div className={`fixed top-0 right-0 bottom-0 bg-white z-50 text-gray-800 overflow-y-auto transition-all duration-300 ${visible ? 'w-[85%] sm:w-[60%] px-4 pt-6' : 'w-0 px-0 pt-0'}`}>
                <div className='flex flex-col'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 border-b'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to="/" className='py-2 pl-4 border-b'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/about" className='py-2 pl-4 border-b'>About Us</NavLink>

                    <div className='py-2 pl-4 border-b font-semibold'>Real Estate</div>
                    <button onClick={() => { setVisible(false); handleRentalClick(); }} className='text-left py-2 pl-8 border-b w-full'>Rentals</button>
                    <button onClick={() => { setVisible(false); handleSaleClick(); }} className='text-left py-2 pl-8 border-b w-full'>Sale</button>

                    <div className='py-2 pl-4 border-b font-semibold'>Property Management</div>
                    {[
                        ['Basic Services', 'basic'],
                        ['Premium Services', 'premium'],
                        ['Cleaning Services', 'cleaning'],
                        ['Document Preparation', 'documents'],
                        ['Painting Services', 'painting'],
                        ['Carpentry', 'carpentry'],
                        ['Plumbing', 'plumbing'],
                        ['Pigeon/Monkey Net', 'pigeon-monkey-net'],
                        ['AC Installation and Repair', 'ac'],
                        ['Chimney Hub Cleaning/Repair', 'chimney'],
                        ['Fridge Repair', 'fridge'],
                        ['Tile Work', 'tile'],
                        ['Legal Advice', 'legal'],
                    ].map(([label, id]) => (
                        <a
                            key={id}
                            href={`/management#${id}`}
                            onClick={() => setVisible(false)}
                            className='py-2 pl-8 border-b'
                        >
                            {label}
                        </a>
                    ))}

                    <NavLink onClick={() => setVisible(false)} to="/contact" className='py-2 pl-4 border-b'>Contact Us</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
