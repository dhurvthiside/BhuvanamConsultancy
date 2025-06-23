import React from 'react';
import ContactUs from '../components/ContactUs';
import OurPolicy from '../components/OurPolicy';

const Contact = () => {
  return (
    <div className="pt-10">

      {/* Page Heading */}
      <div className="text-center pb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#091d35] mb-2">Contact Us</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Whether you're buying, renting, or need property services — we’re here to help. Reach out today!
        </p>
      </div>

      {/* Map + Info Block */}
      <div className="relative mb-20 px-6 md:px-16">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Map Section */}
          <div className="flex-1 h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Bhuvanam Consultancy Location"
              src="https://www.google.com/maps?q=Sobha+Meritta,+Pudupakkam,+Chennai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Quirky Info Card */}
          <div className="lg:w-1/3 bg-[#fefefe] border border-gray-200 rounded-xl p-6 flex flex-col justify-center text-center shadow-md hover:shadow-xl transition">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-2xl font-semibold text-[#091d35] mb-2">Find Us Here!</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              We're located at <strong>Sobha Meritta</strong> in Pudupakkam, Chennai — right off the Kelambakkam-Vandalur Road.
            </p>
            <p className="text-sm text-gray-500">Drop by or give us a call before visiting! 😊</p>
          </div>

        </div>
      </div>

      {/* Our Policy Section */}
      <div className="bg-gray-100">
        <div className="px-6 md:px-16 py-20">
          <OurPolicy />
        </div>
      </div>

      {/* Contact Us Form */}
      <div className="px-6 md:px-16 mb-20">
        <ContactUs />
      </div>

    </div>
  );
};

export default Contact;
