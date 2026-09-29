// assets.js

// =========================
// PROPERTY IMAGES
// =========================

// Property 9
import p9_1 from './p9_1.jpg';
import p9_2 from './p9_2.jpg';

// Property 10
import p10_1 from './p10_1.jpg';
import p10_2 from './p10_2.jpg';
import p10_3 from './p10_3.jpg';
import p10_4 from './p10_4.jpg';
import p10_5 from './p10_5.jpg';
import p10_6 from './p10_6.jpg';


// =========================
// GENERAL WEBSITE ASSETS
// =========================

import logo from './logo.png';
import hero_img from './hero_img.png';
import menu_icon from './menu_icon.png';
import about_img from './about_img.jpg';
import dropdown_icon from './dropdown_icon.png';
import rent_icon from './rent_icon.png';
import sale_icon from './sale_icon.png';
import tools_icon from './management.jpg';


// =========================
// GENERAL ASSETS EXPORT
// =========================

export const assets1 = {
  logo,
  hero_img,
  menu_icon,
  about_img,
  dropdown_icon,
  rent_icon,
  sale_icon,
  tools_icon,
};


// =========================
// PROPERTY LISTINGS (STANDARDIZED SCHEMA)
// =========================

export const assets = [

  // ---------------------------------
  // PROPERTY 1: PLOT FOR SALE
  // ---------------------------------
  {
    id: 1,
    title: "3845 Sq.Ft. Residential Land for Sale in Navalur",
    listingType: "sale",
    propertyType: "plot",
    buildingCategory: "standalone",
    propertyStatus: "resale",

    location: {
      address: "Navalur (Thalambur)",
      locality: "Navalur",
      city: "Chennai",
      landmark: "Near Intellect Software Company",
    },

    pricing: {
      totalPrice: 28837500, // 3845 sqft * 7500 per sqft
      pricePerSqFt: 7500,
      isNegotiable: true,
    },

    areaDetails: {
      plotAreaSqFt: 3845,
    },

    plotDetails: {
      plotFacing: "east",
      cornerPlot: false,
      boundaryWall: true,
      roadWidthFt: 30,
      approvals: ["CMDA", "DTCP"],
    },

    amenities: [
      "Blacktop Road Access",
      "Street Lights",
      "Water Line Connection Ready",
      "Gated Plot Boundary",
      "Close to IT Hub"
    ],

    images: [],
    featured: false,
    postedAt: "2026-03-01",
  },


  // ---------------------------------
  // PROPERTY 2: STANDALONE APARTMENT SALE
  // ---------------------------------
  {
    id: 2,
    title: "2 BHK Standalone Apartment for Sale in Kotturpuram",
    listingType: "sale",
    propertyType: "apartment",
    buildingCategory: "standalone",
    propertyStatus: "resale",

    location: {
      address: "Kotturpuram, Near Railway Station",
      locality: "Kotturpuram",
      city: "Chennai",
      landmark: "Near Railway Station",
    },

    pricing: {
      totalPrice: 8505000, // 945 sqft * 9000 per sqft
      pricePerSqFt: 9000,
      isNegotiable: true,
      maintenanceCharge: 1500,
    },

    areaDetails: {
      builtUpAreaSqFt: 945,
      udsSqFt: 636,
    },

    residentialDetails: {
      bhk: 2,
      bathrooms: 2,
      balconies: 1,
      furnishing: "semi_furnished",
      doorFacing: "north",
      ageOfPropertyYears: 20,
      floorDetails: {
        floorNo: 2,
        totalFloors: 3,
        unitsPerFloor: 2,
      },
      parking: {
        coveredCar: 0,
        openCar: 0,
        twoWheeler: true,
      },
    },

    amenities: [
      "2 Wheeler Parking",
      "Metro Water Connection",
      "Borewell Water",
      "CCTV in Common Area"
    ],

    images: [],
    featured: false,
    postedAt: "2026-03-05",
  },


  // ---------------------------------
  // PROPERTY 3: STANDALONE APARTMENT SALE
  // ---------------------------------
  {
    id: 3,
    title: "1 BHK Resale Apartment for Sale in Mylapore",
    listingType: "sale",
    propertyType: "apartment",
    buildingCategory: "standalone",
    propertyStatus: "resale",

    location: {
      address: "Mylapore Main Area",
      locality: "Mylapore",
      city: "Chennai",
    },

    pricing: {
      totalPrice: 8999860, // 580 sqft * 15517 per sqft
      pricePerSqFt: 15517,
      isNegotiable: false,
      maintenanceCharge: 1200,
    },

    areaDetails: {
      builtUpAreaSqFt: 580,
      udsSqFt: 435,
    },

    residentialDetails: {
      bhk: 1,
      bathrooms: 1,
      balconies: 1,
      furnishing: "unfurnished",
      doorFacing: "east",
      ageOfPropertyYears: 28,
      floorDetails: {
        floorNo: 1,
        totalFloors: 3,
        unitsPerFloor: 3,
      },
      parking: {
        coveredCar: 0,
        openCar: 0,
        twoWheeler: true,
      },
    },

    amenities: [
      "2 Wheeler Dedicated Parking",
      "Metro Water Access",
      "Borewell",
      "Close to Temples & Metro"
    ],

    images: [],
    featured: false,
    postedAt: "2026-03-08",
  },


  // ---------------------------------
  // PROPERTY 4: SOCIETY APARTMENT SALE
  // ---------------------------------
  {
    id: 4,
    title: "3 BHK Unfurnished Apartment in Sobha Meritta",
    listingType: "sale",
    propertyType: "apartment",
    buildingCategory: "society",
    propertyStatus: "resale",

    location: {
      address: "Pudupakkam, OMR",
      locality: "Pudupakkam",
      city: "Chennai",
      landmark: "Opp. to Butterfly Industries",
    },

    pricing: {
      totalPrice: 8500000,
      pricePerSqFt: 6357,
      isNegotiable: true,
      maintenanceCharge: 3500,
    },

    areaDetails: {
      builtUpAreaSqFt: 1337,
      udsSqFt: 435,
    },

    residentialDetails: {
      bhk: 3,
      bathrooms: 2,
      balconies: 1,
      furnishing: "unfurnished",
      doorFacing: "west",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 12,
        totalFloors: 13,
        unitsPerFloor: 4,
      },
      parking: {
        coveredCar: 1,
        openCar: 0,
        twoWheeler: true,
      },
    },

    societyDetails: {
      societyName: "Sobha Meritta",
      totalTowers: 5,
    },

    amenities: [
      "24/7 Security Guard",
      "Full Power Backup",
      "Elevators / Lifts",
      "Clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Children's Play Area",
      "Intercom Facility"
    ],

    images: [],
    featured: true,
    postedAt: "2026-03-12",
  },


  // ---------------------------------
  // PROPERTY 5: STANDALONE APARTMENT SALE
  // ---------------------------------
  {
    id: 5,
    title: "2 BHK Semi-Furnished Flat for Sale in Abhiramapuram",
    listingType: "sale",
    propertyType: "flat",
    buildingCategory: "standalone",
    propertyStatus: "resale",

    location: {
      address: "Abhiramapuram Main Road",
      locality: "Abhiramapuram",
      city: "Chennai",
    },

    pricing: {
      totalPrice: 18000000,
      pricePerSqFt: 19354,
      isNegotiable: false,
      maintenanceCharge: 2500,
    },

    areaDetails: {
      builtUpAreaSqFt: 930,
      udsSqFt: 375,
    },

    residentialDetails: {
      bhk: 2,
      bathrooms: 2,
      balconies: 1,
      furnishing: "semi_furnished",
      doorFacing: "south",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 2,
        totalFloors: 3,
      },
      parking: {
        coveredCar: 0,
        openCar: 1,
        twoWheeler: true,
      },
    },

    amenities: [
      "Open Car Parking Slot",
      "Lift Available",
      "Metro Water Connection",
      "Borewell Water",
      "CCTV Surveillance"
    ],

    images: [],
    featured: false,
    postedAt: "2026-03-15",
  },


  // ---------------------------------
  // PROPERTY 6: SOCIETY APARTMENT SALE
  // ---------------------------------
  {
    id: 6,
    title: "3 BHK Resale Apartment for Sale in Sobha Meritta",
    listingType: "sale",
    propertyType: "apartment",
    buildingCategory: "society",
    propertyStatus: "resale",

    location: {
      address: "Pudupakkam, OMR",
      locality: "Pudupakkam",
      city: "Chennai",
      landmark: "Opp. to Butterfly Industries",
    },

    pricing: {
      totalPrice: 8000000,
      pricePerSqFt: 5983,
      isNegotiable: false,
      maintenanceCharge: 3500,
    },

    areaDetails: {
      builtUpAreaSqFt: 1337,
      udsSqFt: 435,
    },

    residentialDetails: {
      bhk: 3,
      bathrooms: 2,
      balconies: 1,
      furnishing: "unfurnished",
      doorFacing: "south",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 11,
        totalFloors: 13,
        unitsPerFloor: 4,
      },
      parking: {
        coveredCar: 1,
        openCar: 0,
        twoWheeler: true,
      },
    },

    societyDetails: {
      societyName: "Sobha Meritta",
      totalTowers: 5,
    },

    amenities: [
      "Covered Car Parking",
      "24/7 Security",
      "Power Backup",
      "Lift",
      "Clubhouse Access",
      "Gym",
      "Swimming Pool"
    ],

    images: [],
    featured: false,
    postedAt: "2026-03-18",
  },


  // ---------------------------------
  // PROPERTY 7: SOCIETY APARTMENT SALE
  // ---------------------------------
  {
    id: 7,
    title: "3 BHK Spacious Apartment for Sale in Sobha Meritta",
    listingType: "sale",
    propertyType: "apartment",
    buildingCategory: "society",
    propertyStatus: "resale",

    location: {
      address: "Pudupakkam, OMR",
      locality: "Pudupakkam",
      city: "Chennai",
      landmark: "Opp. to Butterfly Industries",
    },

    pricing: {
      totalPrice: 10000000,
      pricePerSqFt: 6060,
      isNegotiable: true,
      maintenanceCharge: 4000,
    },

    areaDetails: {
      builtUpAreaSqFt: 1650,
      udsSqFt: 570,
    },

    residentialDetails: {
      bhk: 3,
      bathrooms: 3,
      balconies: 2,
      furnishing: "semi_furnished",
      doorFacing: "west",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 9,
        totalFloors: 13,
        unitsPerFloor: 4,
      },
      parking: {
        coveredCar: 1,
        openCar: 0,
        twoWheeler: true,
      },
    },

    societyDetails: {
      societyName: "Sobha Meritta",
      totalTowers: 5,
    },

    amenities: [
      "Modular Kitchen",
      "Covered Car Parking",
      "24/7 Gated Security",
      "Power Backup",
      "Clubhouse & Gym",
      "Swimming Pool",
      "Badminton Court"
    ],

    images: [],
    featured: true,
    postedAt: "2026-03-20",
  },


  // ---------------------------------
  // PROPERTY 8: SOCIETY APARTMENT SALE
  // ---------------------------------
  {
    id: 8,
    title: "3 BHK Semi-Furnished Flat in Sobha Meritta",
    listingType: "sale",
    propertyType: "flat",
    buildingCategory: "society",
    propertyStatus: "resale",

    location: {
      address: "Pudupakkam, OMR",
      locality: "Pudupakkam",
      city: "Chennai",
      landmark: "Opp. to Butterfly Industries",
    },

    pricing: {
      totalPrice: 10000000,
      pricePerSqFt: 6060,
      isNegotiable: true,
      maintenanceCharge: 4000,
    },

    areaDetails: {
      builtUpAreaSqFt: 1650,
      udsSqFt: 570,
    },

    residentialDetails: {
      bhk: 3,
      bathrooms: 3,
      balconies: 2,
      furnishing: "semi_furnished",
      doorFacing: "west",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 9,
        totalFloors: 13,
        unitsPerFloor: 4,
      },
      parking: {
        coveredCar: 1,
        openCar: 0,
        twoWheeler: true,
      },
    },

    societyDetails: {
      societyName: "Sobha Meritta",
      totalTowers: 5,
    },

    amenities: [
      "Modular Kitchen Work",
      "Covered Car Parking",
      "24/7 Security",
      "Power Backup",
      "Swimming Pool",
      "Gymnasium"
    ],

    images: [],
    featured: false,
    postedAt: "2026-03-22",
  },


  // ---------------------------------
  // PROPERTY 9: SOCIETY APARTMENT RENT
  // ---------------------------------
  {
    id: 9,
    title: "3 BHK Semi-Furnished Apartment for Rent in Sobha Meritta",
    listingType: "rent",
    propertyType: "apartment",
    buildingCategory: "society",
    propertyStatus: "ready_to_move",

    location: {
      address: "Pudupakkam, OMR",
      locality: "Pudupakkam",
      city: "Chennai",
      landmark: "Opp. to Butterfly Industries",
    },

    pricing: {
      monthlyRent: 42500,
      securityDeposit: 250000,
      maintenanceCharge: 0,
      isMaintenanceIncluded: true,
    },

    areaDetails: {
      builtUpAreaSqFt: 1996,
    },

    residentialDetails: {
      bhk: 3,
      bathrooms: 3,
      balconies: 2,
      furnishing: "semi_furnished",
      doorFacing: "east",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 9,
        totalFloors: 13,
      },
      parking: {
        coveredCar: 1,
        openCar: 0,
        twoWheeler: true,
      },
    },

    societyDetails: {
      societyName: "Sobha Meritta",
    },

    rentalTerms: {
      preferredTenants: ["family"],
      lockInPeriodMonths: 11,
      notes: "Rent includes maintenance charges and full access to community amenities.",
    },

    amenities: [
      "Maintenance Included",
      "Covered Parking Slot",
      "Power Backup",
      "24/7 Security",
      "Swimming Pool",
      "Gym Pass Access",
      "Children's Play Area"
    ],

    images: [p9_1, p9_2],
    featured: true,
    postedAt: "2026-03-25",
  },


  // ---------------------------------
  // PROPERTY 10: SOCIETY APARTMENT RENT
  // ---------------------------------
  {
    id: 10,
    title: "2 BHK Fully Furnished Apartment for Rent in Sobha Meritta",
    listingType: "rent",
    propertyType: "apartment",
    buildingCategory: "society",
    propertyStatus: "ready_to_move",

    location: {
      address: "Pudupakkam, OMR",
      locality: "Pudupakkam",
      city: "Chennai",
      landmark: "Opp. to Butterfly Industries",
    },

    pricing: {
      monthlyRent: 36000,
      securityDeposit: 200000,
      maintenanceCharge: 0,
      isMaintenanceIncluded: true,
    },

    areaDetails: {
      builtUpAreaSqFt: 1337,
    },

    residentialDetails: {
      bhk: 2,
      bathrooms: 2,
      balconies: 1,
      furnishing: "fully_furnished",
      doorFacing: "north",
      ageOfPropertyYears: 10,
      floorDetails: {
        floorNo: 7,
        totalFloors: 13,
      },
      parking: {
        coveredCar: 1,
        openCar: 0,
        twoWheeler: true,
      },
    },

    societyDetails: {
      societyName: "Sobha Meritta",
    },

    rentalTerms: {
      preferredTenants: ["family", "bachelors"],
      lockInPeriodMonths: 11,
      notes: "Fully furnished setup with ACs, TV, beds, sofa, and kitchen appliances. Rent includes maintenance.",
    },

    amenities: [
      "Fully Furnished Interiors",
      "Air Conditioned",
      "TV & Sofa Set",
      "Washing Machine & Fridge",
      "Covered Car Parking",
      "24/7 Security",
      "Clubhouse & Swimming Pool"
    ],

    images: [p10_1, p10_2, p10_3, p10_4, p10_5, p10_6],
    featured: true,
    postedAt: "2026-03-28",
  },

];


// =========================
// NAMED EXPORTS
// =========================

export { logo, hero_img };