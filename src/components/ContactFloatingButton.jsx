import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/contact')}
      className="fixed bottom-7 right-9 z-50 bg-red-600 hover:bg-red-700 transition p-4 rounded-full shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.684l1.518 4.552a1 1 0 01-.21.986l-2.12 2.122a16.02 16.02 0 006.586 6.586l2.122-2.12a1 1 0 01.986-.211l4.553 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V6a1 1 0 011-1z"
        />
      </svg>
    </button>
  );
};

export default ContactFloatingButton;
