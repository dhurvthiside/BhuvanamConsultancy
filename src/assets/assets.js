// assets.js

// =========================
// PROPERTY IMAGES
// =========================

// // Property 1
// import p1_1 from './p1_1.jpg';
// import p1_2 from './p1_2.jpg';
// import p1_3 from './p1_3.jpg';
// import p1_4 from './p1_4.jpg';

// // Property 2
// import p2_1 from './p2_1.jpg';
// import p2_2 from './p2_2.jpg';
// import p2_3 from './p2_3.jpg';
// import p2_4 from './p2_4.jpg';

// // Property 3
// import p3_1 from './p3_1.jpg';
// import p3_2 from './p3_2.jpg';
// import p3_3 from './p3_3.jpg';
// import p3_4 from './p3_4.jpg';

// // Property 4
// import p4_1 from './p4_1.jpg';
// import p4_2 from './p4_2.jpg';
// import p4_3 from './p4_3.jpg';
// import p4_4 from './p4_4.jpg';

// // Property 5
// import p5_1 from './p5_1.jpg';
// import p5_2 from './p5_2.jpg';
// import p5_3 from './p5_3.jpg';
// import p5_4 from './p5_4.jpg';

// // Property 6
// import p6_1 from './p6_1.jpg';
// import p6_2 from './p6_2.jpg';
// import p6_3 from './p6_3.jpg';
// import p6_4 from './p6_4.jpg';

// // Property 7
// import p7_1 from './p7_1.jpg';
// import p7_2 from './p7_2.jpg';
// import p7_3 from './p7_3.jpg';
// import p7_4 from './p7_4.jpg';

// // Property 8
// import p8_1 from './p8_1.jpg';
// import p8_2 from './p8_2.jpg';
// import p8_3 from './p8_3.jpg';
// import p8_4 from './p8_4.jpg';

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
// PROPERTY LISTINGS
// =========================

export const assets = [

  // ---------------------------------
  // SALE 1
  // ---------------------------------

  {
    id: 1,
    listingType: "sale",
    propertyType: "Land",
    propertyStatus: "Resale",

    builtUpArea: null,
    area: 3845,
    uds: null,

    bhk: null,
    furnishing: null,
    doorFacing: null,

    ageOfHouse: null,
    noOfHouses: null,
    noOfFloors: null,
    floorNo: null,
    noOfHousesPerFloor: null,

    rent: null,
    deposit: null,
    price: 7500,
    priceUnit: "per sq.ft.",

    location: "Navalur (Thalambur)",
    landmark: "Near Intellect Software Company",

    parking: null,

    image: [],
  },


  // ---------------------------------
  // SALE 2
  // ---------------------------------

  {
    id: 2,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    builtUpArea: 945,
    area: null,
    uds: 636,

    bhk: null,
    furnishing: null,
    doorFacing: null,

    ageOfHouse: 20,
    noOfHouses: 4,
    noOfFloors: null,
    floorNo: null,
    noOfHousesPerFloor: null,

    rent: null,
    deposit: null,
    price: 9000,
    priceUnit: "per sq.ft.",

    location: "Kotturpuram",
    landmark: "Near Railway Station",

    parking: "Only 2 Wheeler Parking",

    image: [],
  },


  // ---------------------------------
  // SALE 3
  // ---------------------------------

  {
    id: 3,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    builtUpArea: 580,
    area: null,
    uds: 435,

    bhk: null,
    furnishing: null,
    doorFacing: null,

    ageOfHouse: 28,
    noOfHouses: 9,
    noOfFloors: null,
    floorNo: null,
    noOfHousesPerFloor: null,

    rent: null,
    deposit: null,
    price: 15517,
    priceUnit: "per sq.ft.",

    location: "Mylapore",
    landmark: null,

    parking: "Only 2 Wheeler Parking",

    image: [],
  },


  // ---------------------------------
  // SALE 4
  // ---------------------------------

  {
    id: 4,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    apartmentName: "Sobha Meritta",

    builtUpArea: 1337,
    area: null,
    uds: 435,

    bhk: null,
    furnishing: "Unfurnished",
    doorFacing: "West",

    ageOfHouse: 10,
    noOfHouses: null,
    noOfFloors: 13,
    floorNo: 12,
    noOfHousesPerFloor: 4,

    rent: null,
    deposit: null,
    price: 8500000,
    priceUnit: "Negotiable",

    location: "Pudupakkam",
    landmark: "Opp. to Butterfly Industries",

    parking: null,

    image: [],
  },


  // ---------------------------------
  // SALE 5
  // ---------------------------------

  {
    id: 5,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    builtUpArea: 930,
    area: null,
    uds: 375,

    bhk: null,
    furnishing: "Semi Furnished",
    doorFacing: null,

    ageOfHouse: "10+ years",
    noOfHouses: null,
    noOfFloors: null,
    floorNo: null,
    noOfHousesPerFloor: null,

    rent: null,
    deposit: null,
    price: 18000000,
    priceUnit: "Total",

    location: "Abhiramapuram",
    landmark: null,

    parking: "Open Car Parking",

    image: [],
  },


  // ---------------------------------
  // SALE 6
  // ---------------------------------

  {
    id: 6,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    apartmentName: "Sobha Meritta",

    builtUpArea: 1337,
    area: null,
    uds: 435,

    bhk: null,
    furnishing: "Unfurnished",
    doorFacing: "South",

    ageOfHouse: 10,
    noOfHouses: null,
    noOfFloors: 13,
    floorNo: 11,
    noOfHousesPerFloor: 4,

    rent: null,
    deposit: null,
    price: 8000000,
    priceUnit: "Total",

    location: "Pudupakkam",
    landmark: "Opp. to Butterfly Industries",

    parking: "Covered Car Parking",

    image: [],
  },


  // ---------------------------------
  // SALE 7
  // ---------------------------------

  {
    id: 7,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    apartmentName: "Sobha Meritta",

    builtUpArea: 1650,
    area: null,
    uds: 570,

    bhk: null,
    furnishing: "Semi Furnished",
    doorFacing: "West",

    ageOfHouse: 10,
    noOfHouses: null,
    noOfFloors: 13,
    floorNo: 9,
    noOfHousesPerFloor: 4,

    rent: null,
    deposit: null,
    price: 10000000,
    priceUnit: "Total",

    location: "Pudupakkam",
    landmark: "Opp. to Butterfly Industries",

    parking: null,

    image: [],
  },


  // ---------------------------------
  // SALE 8
  // ---------------------------------

  {
    id: 8,
    listingType: "sale",
    propertyType: "Apartment",
    propertyStatus: "Resale",

    apartmentName: "Sobha Meritta",

    builtUpArea: 1650,
    area: null,
    uds: 570,

    bhk: null,
    furnishing: "Semi Furnished",
    doorFacing: "West",

    ageOfHouse: 10,
    noOfHouses: null,
    noOfFloors: 13,
    floorNo: 9,
    noOfHousesPerFloor: 4,

    rent: null,
    deposit: null,
    price: 10000000,
    priceUnit: "Total",

    location: "Pudupakkam",
    landmark: "Opp. to Butterfly Industries",

    parking: null,

    image: [],
  },


  // ---------------------------------
  // RENTAL 1
  // ---------------------------------

  {
    id: 9,
    listingType: "rent",
    propertyType: "Apartment",
    propertyStatus: "Rental",

    apartmentName: "Sobha Meritta",

    builtUpArea: 1996,
    area: null,
    uds: null,

    bhk: null,
    furnishing: "Semi Furnished",
    doorFacing: "East",

    ageOfHouse: null,
    noOfHouses: null,
    noOfFloors: 13,
    floorNo: 9,
    noOfHousesPerFloor: null,

    rent: 42500,
    deposit: null,
    price: null,
    priceUnit: null,

    location: "Pudupakkam",
    landmark: "Opp. to Butterfly Industries",

    parking: null,

    rentalNotes:
      "Rent includes maintenance and amenities inside the community.",

    image: [p9_1, p9_2],
  },


  // ---------------------------------
  // RENTAL 2
  // ---------------------------------

  {
    id: 10,
    listingType: "rent",
    propertyType: "Apartment",
    propertyStatus: "Rental",

    apartmentName: "Sobha Meritta",

    builtUpArea: 1337,
    area: null,
    uds: null,

    bhk: null,
    furnishing: "Fully Furnished",
    doorFacing: "North",

    ageOfHouse: null,
    noOfHouses: null,
    noOfFloors: 13,
    floorNo: 7,
    noOfHousesPerFloor: null,

    rent: 36000,
    deposit: null,
    price: null,
    priceUnit: null,

    location: "Pudupakkam",
    landmark: "Opp. to Butterfly Industries",

    parking: null,

    rentalNotes:
      "Rent includes maintenance and amenities inside the community.",

    image: [p10_1, p10_2, p10_3, p10_4, p10_5, p10_6],
  },

];


// =========================
// NAMED EXPORTS
// =========================

export { logo, hero_img };