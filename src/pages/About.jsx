import React from 'react';
import { assets1 } from '../assets/assets';
import ContactFloatingButton from '../components/ContactFloatingButton';

const About = () => {
  return (
    <div className="bg-white text-[#091d35]">
      {/* Hero Section */}
      <div className="py-16 px-6 md:px-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img src={assets1.about_img} alt="About Us" className="w-full md:max-w-[450px] rounded-lg shadow-md" />
          <div className="flex flex-col gap-5 md:w-2/3">
            <h1 className="text-4xl font-extrabold mb-2 tracking-wide">About Us</h1>
            <p className="text-gray-700 leading-relaxed">
              Bhuvanam was launched in 2023 by <strong>Ramakrishnan</strong> and <strong>Uma Ramakrishnan</strong>. With a strong background in customer service and prior experience running small businesses, they built Bhuvanam Real Estate Consultancy from the ground up. What started as a business soon became a heartfelt passion — a way to simplify the lives of those seeking homes and property support.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Their dedication goes beyond just closing deals — their true joy comes from delivering quality and achieving customer satisfaction at every step.
            </p>
          </div>
        </div>
      </div>

      {/* Services Overview - What We Offer */}
      <div className="bg-gradient-to-br from-white to-slate-100 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-14">What We Offer</h2>

        <div className="grid gap-10 md:grid-cols-3 text-gray-700">
          {/* Rentals */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="mb-4 flex justify-center">
              <img src={assets1.rent_icon || assets1.about_img} alt="Rentals" className="h-16 w-16 object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Rental Services</h3>
            <p className="text-sm leading-relaxed">
              Finding a place to rent can be overwhelming — especially in a new city. We listen to your needs, respect your budget, and help you find your ideal home without the stress.
            </p>
          </div>

          {/* Buying & Selling */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="mb-4 flex justify-center">
              <img src={assets1.sale_icon || assets1.about_img} alt="Sale" className="h-16 w-16 object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Buying & Selling</h3>
            <p className="text-sm leading-relaxed">
              Whether you're purchasing your dream home or letting go of a beloved property, we guide you with care and clarity — every step of the way.
            </p>
          </div>

          {/* Property Management */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="mb-4 flex justify-center">
              <img src={assets1.tools_icon || assets1.about_img} alt="Management" className="h-16 w-16 object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Property Management</h3>
            <p className="text-sm leading-relaxed">
              From fixing a leaking tap to finding reliable professionals, our handpicked maintenance team ensures your property is cared for like our own.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#f8fafc] py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
          At Bhuvanam, our mission is simple: to build trust and make real estate experiences easy, efficient, and enjoyable. We focus on long-term relationships by prioritizing quality, transparency, and customer delight.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-gray-800 text-center">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h4 className="font-semibold text-lg mb-2">End-to-End Service</h4>
            <p className="text-sm">From property search to maintenance, we handle it all.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h4 className="font-semibold text-lg mb-2">Quality First</h4>
            <p className="text-sm">Every partner we work with is vetted for skill and reliability.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h4 className="font-semibold text-lg mb-2">Customer Satisfaction</h4>
            <p className="text-sm">Our goal isn’t just service — it's long-term happiness.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h4 className="font-semibold text-lg mb-2">Loyalty & Trust</h4>
            <p className="text-sm">We value long-term connections over quick transactions.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h4 className="font-semibold text-lg mb-2">Professional Guidance</h4>
            <p className="text-sm">We guide you through every process with clarity and confidence.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
            <h4 className="font-semibold text-lg mb-2">Mutual Success</h4>
            <p className="text-sm">Your success is our success — and we treat it that way.</p>
          </div>
        </div>
      </div>

      {/* Enhanced Final CTA */}
      <div className="bg-[#091d35] text-white py-20 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold mb-4">Let Us Do the Heavy Lifting</h3>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-200">
          Whether you're buying, renting, or maintaining — we handle the complexity, the negotiations, and the stress — so you can focus on living. Bhuvanam is where your property journey feels effortless and personal.
        </p>
      </div>

      <ContactFloatingButton />
    </div>
  );
};

export default About;
