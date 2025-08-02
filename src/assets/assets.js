// assets.js

import p1_1 from './p1_1.jpg';
import p1_2 from './p1_2.jpg';
import p1_3 from './p1_3.jpg';
import p1_4 from './p1_4.jpg';
import p1_5 from './p1_5.jpg';
import p1_6 from './p1_6.jpg';
import p1_7 from './p1_7.jpg';

import p2_1 from './p2_1.jpg';
import p2_2 from './p2_2.jpg';
import p2_3 from './p2_3.jpg';
import p2_4 from './p2_4.jpg';
import p2_5 from './p2_5.jpg';
import p2_6 from './p2_6.jpg';
import p2_7 from './p2_7.jpg';

import p3_1 from './p3_1.jpg';
import p3_2 from './p3_2.jpg';
import p3_3 from './p3_3.jpg';
import p3_4 from './p3_4.jpg';
import p3_5 from './p3_5.jpg';

import p4_1 from './p4_1.jpg';
import p4_2 from './p4_2.jpg';
import p4_3 from './p4_3.jpg';
import p4_4 from './p4_4.jpg';
import p4_5 from './p4_5.jpg';
import p4_6 from './p4_6.jpg';
import p4_7 from './p4_7.jpg';

import p5_1 from './p5_1.jpg';
import p5_2 from './p5_2.jpg';
import p5_3 from './p5_3.jpg';
import p5_4 from './p5_4.jpg';
import p5_5 from './p5_5.jpg';
import p5_6 from './p5_6.jpg';
import p5_7 from './p5_7.jpg';
import p5_8 from './p5_8.jpg';

import p6_1 from './p6_1.jpg';
import p6_2 from './p6_2.jpg';
import p6_3 from './p6_3.jpg';
import p6_4 from './p6_4.jpg';
import p6_5 from './p6_5.jpg';
import p6_6 from './p6_6.jpg';
import p6_7 from './p6_7.jpg';

import logo from './logo.png';
import hero_img from './hero_img.png';
import menu_icon from './menu_icon.png';
import about_img from './about_img.jpg';
import dropdown_icon from './dropdown_icon.png';
import rent_icon from './rent_icon.png';
import sale_icon from './sale_icon.png';
import tools_icon from './management.jpg';
export const assets1 = {
    logo,
    hero_img,
    menu_icon,
    about_img,
    dropdown_icon,
    rent_icon,
    sale_icon,
    tools_icon,
}
export const assets = [
  {
    id: 1,
    listingType: "rent",
    bhk: "3BHK",
    furnishing: "Fully Furnished",
    builtUpArea: 1996,
    rent: 50000,
    deposit: 300000,
    price: 0,
    location: "Sobha Meritta",
    preference: "Family",
    image: [p1_1, p1_2, p1_3, p1_4, p1_5, p1_6, p1_7],
  },
  {
    id: 2,
    listingType: "sale",
    bhk: "3BHK",
    furnishing: "Semi Furnished",
    builtUpArea: 1996,
    rent: null,
    deposit: null,
    price: 9500000,
    location: "Sobha Meritta, Pudhupakkam (Kelambakkam - Vandalur Road)",
    image: [p2_1, p2_2, p2_3, p2_4, p2_5, p2_6, p2_7],
  },
  {
    id: 3,
    listingType: "sale",
    bhk: "1BHK",
    furnishing: "Semi Furnished",
    builtUpArea: 542,
    rent: null,
    deposit: null,
    price: 3000000,
    location: "Sobha Meritta",
    image: [p3_1, p3_2, p3_3, p3_4, p3_5],
  },
  {
    id: 4,
    listingType: "both",
    bhk: "3BHK",
    furnishing: "Unfurnished",
    builtUpArea: 1996,
    rent: null,
    deposit: null,
    price: 11000000,
    location: "Sobha Meritta",
    image: [p4_1, p4_2, p4_3, p4_4, p4_5, p4_6, p4_7],
  },
  {
    id: 5,
    listingType: "both",
    bhk: "3BHK",
    furnishing: "Fully Furnished",
    builtUpArea: 1996,
    rent: null,
    deposit: null,
    price: 12000000,
    location: "Sobha Meritta",
    image: [p5_1, p5_2, p5_3, p5_4, p5_5, p5_6, p5_7, p5_8],
  },
  {
    id: 6,
    listingType: "sale",
    bhk: "3BHK",
    furnishing: "Semi Furnished",
    builtUpArea: 1996,
    rent: null,
    deposit: null,
    price: 13500000,
    location: "Sobha Meritta",
    image: [p6_1, p6_2, p6_3, p6_4, p6_5, p6_6, p6_7],
  },
  
];
export { logo, hero_img };

