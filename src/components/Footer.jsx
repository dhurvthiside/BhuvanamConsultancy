import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  const navigate = useNavigate();

  const handleRentalClick = () => {
    navigate('/collection', { state: { category: 'Men' } });
  };

  const handleSaleClick = () => {
    navigate('/collection', { state: { category: 'Kids' } });
  };

  return (
    <div className="bg-[#091d35] text-white px-6 sm:px-20 pt-16 pb-8 mt-2">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm">

        {/* Logo and Description */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Logo" />
          <p className="w-full md:w-4/5 text-gray-300 leading-relaxed">
            Bhuvanam Consultancy is your trusted partner for real estate solutions — from rentals and sales to property management. We simplify your journey to the perfect space.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <p className="text-lg font-semibold mb-5 tracking-wide">Company</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li>
              <button onClick={handleRentalClick} className="hover:text-white transition text-left w-full">
                Rentals
              </button>
            </li>
            <li>
              <button onClick={handleSaleClick} className="hover:text-white transition text-left w-full">
                Properties for Sale
              </button>
            </li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold mb-5 tracking-wide">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><a href="tel:+917023495265" className="hover:text-white transition">+91 70234 95265</a></li>
            <li><a href="mailto:bhuvanamconsultancy@gmail.com" className="hover:text-white transition">bhuvanamconsultancy@gmail.com</a></li>
            <li>
              <a href="https://maps.app.goo.gl/youraddress" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                1043, Sobha Meritta, Pudupakkam,<br />Kelambakkam-Vandalur Rd, Chennai 603103
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bhuvanam Consultancy. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
