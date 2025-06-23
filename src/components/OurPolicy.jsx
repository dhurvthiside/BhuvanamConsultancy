import React from 'react';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      {/* Call Us */}
      <div>
        <svg className="w-12 h-12 m-auto mb-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5l3.084-.514a2.25 2.25 0 012.576 1.652l.615 2.493a2.25 2.25 0 01-1.012 2.493l-.963.642a11.25 11.25 0 005.438 5.438l.642-.963a2.25 2.25 0 012.493-1.012l2.493.615a2.25 2.25 0 011.652 2.576L19.5 21.75a1.125 1.125 0 01-1.233.975c-9.406-1.226-16.716-8.536-17.942-17.942A1.125 1.125 0 012.25 4.5z" />
        </svg>
        <p className='font-semibold'>Call Us At</p>
        <p className='text-gray-400'>7023495265</p>
      </div>

      {/* Find Us */}
      <div>
        <svg className="w-12 h-12 m-auto mb-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 12-7.5 12S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <p className='font-semibold'>Find Us At</p>
        <p className='text-gray-400'>1043, Sobha Meritta, Pudupakkam, Kelambakkam Vandalur Rd, Chennai, 603103</p>
      </div>

      {/* Email Us */}
      <div>
        <svg className="w-12 h-12 m-auto mb-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M21.75 6.75A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25M21.75 6.75l-9.75 6.75L2.25 6.75" />
        </svg>
        <p className='font-semibold'>Email Us At</p>
        <p className='text-gray-400'>bhuvanamconsultancy@gmail.com</p>
      </div>

    </div>
  );
};

export default OurPolicy;
