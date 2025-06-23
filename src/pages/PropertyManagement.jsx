import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactFloatingButton from '../components/ContactFloatingButton';

const services = [
  {
    id: 'basic',
    title: 'Basic Services',
    intro: 'Essential care for hassle-free property ownership.',
    features: [
      'Rent collection and timely deposits',
      'Property tax & electricity management',
      '3 annual visits with full inspection reports',
      'Annual charge: 1 month’s rent'
    ],
    bg: 'bg-gradient-to-r from-blue-50 to-blue-100'
  },
  {
    id: 'premium',
    title: 'Premium Services',
    intro: 'Upgrade to premium for comfort and convenience.',
    features: [
      'Everything in Basic Services',
      'Quarterly deep cleaning included',
      'Transparent pricing:',
      '• 2 BHK = 1 month rent + ₹8K',
      '• 3 BHK = 1 month rent + ₹12K',
      '• 3 BHK Premium = 1 month rent + ₹14K'
    ],
    bg: 'bg-gradient-to-r from-purple-50 to-purple-100'
  },
  {
    id: 'cleaning',
    title: 'Cleaning Services',
    intro: 'Fresh, hygienic homes made easy.',
    features: [
      'Basic & deep cleaning options',
      'Specialized cleaning (pigeon/monkey droppings)',
      'Dead animal removal included'
    ],
    bg: 'bg-gradient-to-r from-green-50 to-green-100'
  },
  {
    id: 'documents',
    title: 'Document Preparation',
    intro: 'Legal safety for every transaction.',
    features: [
      'Sale & rental agreement drafting',
      'Registration document handling',
      'Encumbrance Certificate (EC) procurement'
    ],
    bg: 'bg-gradient-to-r from-yellow-50 to-yellow-100'
  },
  {
    id: 'painting',
    title: 'Painting Services',
    intro: 'Refresh your space with quality finishes.',
    features: [
      'Wall painting options – single/double coat',
      'Grill & gate painting',
      'Furniture and door varnish'
    ],
    bg: 'bg-gradient-to-r from-pink-50 to-pink-100'
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    intro: 'Craftsmanship that adds value.',
    features: [
      'Wardrobes & modular kitchen installation',
      'Furniture rework & customization',
      'Timely repair services'
    ],
    bg: 'bg-gradient-to-r from-indigo-50 to-indigo-100'
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    intro: 'Reliable solutions for all water woes.',
    features: [
      'Tap & fitting replacements',
      'Leak detection & repair',
      'Sanitary fittings maintenance'
    ],
    bg: 'bg-gradient-to-r from-teal-50 to-teal-100'
  },
  {
    id: 'pigeon-monkey-net',
    title: 'Pigeon / Monkey Net',
    intro: 'Protect your home with durable nets.',
    features: [
      'High-quality balcony/window nets',
      'Effective monkey intrusion prevention'
    ],
    bg: 'bg-gradient-to-r from-lime-50 to-lime-100'
  },
  {
    id: 'ac',
    title: 'AC Installation & Repair',
    intro: 'Keep cool with expert assistance.',
    features: [
      'New AC installation',
      'Annual servicing & tune-ups',
      'Gas top-up & basic repairs'
    ],
    bg: 'bg-gradient-to-r from-cyan-50 to-cyan-100'
  },
  {
    id: 'chimney',
    title: 'Chimney Cleaning & Repair',
    intro: 'Fresh air starts with clean chimneys.',
    features: [
      'Deep cleaning of chimney ducts',
      'Hub repairs & suction optimization'
    ],
    bg: 'bg-gradient-to-r from-gray-100 to-gray-200'
  },
  {
    id: 'fridge',
    title: 'Fridge Repair',
    intro: 'Reliable fridge care you can trust.',
    features: [
      'Compressor diagnostics & replacement',
      'Gas refill & cooling fix',
      'Door seal repair & maintenance'
    ],
    bg: 'bg-gradient-to-r from-red-50 to-red-100'
  },
  {
    id: 'tile',
    title: 'Tile Work',
    intro: 'Precision tile solutions for every space.',
    features: [
      'Floor & wall tile installation',
      'Broken tile replacement',
      'Professional grouting'
    ],
    bg: 'bg-gradient-to-r from-orange-50 to-orange-100'
  },
  {
    id: 'legal',
    title: 'Legal Advice',
    intro: 'Expert counsel to avoid legal pitfalls.',
    features: [
      'Property verification & compliance',
      'Rental & sale dispute resolution',
      'Expert consultations as needed'
    ],
    bg: 'bg-gradient-to-r from-rose-50 to-rose-100'
  },
];

const PropertyManagement = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const sectionId = hash.substring(1); // removes '#'
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className='bg-white text-[#091d35] px-6 md:px-16 py-24'>
      <div className='text-center mb-14'>
        <h1 className='text-4xl sm:text-5xl font-bold uppercase tracking-wide'>Property Management Services</h1>
        <p className='mt-4 text-lg text-gray-600 max-w-2xl mx-auto'>
          A complete suite of solutions tailored for modern landlords, tenants, and property investors.
          From essential repairs to legal expertise — we manage it all, so you don’t have to.
        </p>
      </div>

      <div className='grid gap-12'>
        {services.map((svc) => (
          <div
            key={svc.id}
            id={svc.id}
            className={`flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${svc.bg}`}
          >
            <div className='w-full md:w-1/3'>
              <div className='h-1 w-10 bg-[#091d35] mb-4' />
              <h2 className='text-2xl sm:text-3xl font-bold mb-1'>{svc.title}</h2>
              <p className='text-gray-700'>{svc.intro}</p>
            </div>
            <ul className='w-full md:w-2/3 text-gray-800 list-disc list-inside pl-2'>
              {svc.features.map((f, i) => (
                <li key={i} className='py-1 text-base'>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ContactFloatingButton />
    </div>
  );
};

export default PropertyManagement;
