import { NextResponse } from "next/server";

const MenuData = [
  {
    id: 1,
    title: "Home",
    path: "#",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "#",
    newTab: false,
  },
  {
    id: 3,
    title: "Services",
    path: "#",
    newTab: false,
  },
  {
    id: 4,
    title: "Gallery",
    path: "#",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];


const footerData = {
    name: "Vijayalakshmi Convention Hall",
    tagline: "Vijayalakshmi Convention Hall",
    info: [
        
      {
            icon: "/images/footer/email-arrow.svg",
            link: "+91 98765 43210",
            href: "tel:+919876543210"
        },
        {
            icon: "/images/footer/email-arrow.svg",
            link: "contact@vijayalakshmiconventionhall.in",
            href: "mailto:contact@vijayalakshmiconventionhall.in"
        },
        {
            icon: "/images/footer/Location.svg",
            link: "Site No.167/1,100 ft road, Road, next to SAHANA Rehabilitation Centre, near KLE Law College, Vishveshwarayya layout, Bengaluru, Karnataka 560091",
            href: "https://maps.app.goo.gl/pNEV8JBWcZ5MX6YVA"
        }
    ],
    links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/" },
        { name: "Services", href: "/" },
        { name: "Gallery", href: "#" },
        { name: "Contact", href: "/contact" }
    ],
    socialLinks: [
        { name: "Facebook", href: "https://www.facebook.com/" },
        { name: "Instagram", href: "https://www.instagram.com/" },
    ],
    copyright: "© Vijayalakshmi Convention Hall copyright 2026 | All Rights Reserved"
};

export const GET = async () => {
    return NextResponse.json({
        footerData,
        MenuData
    });
};