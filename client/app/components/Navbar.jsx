// Import React and useState hook for managing state
"use client";
import React, { useState } from "react";
// Import Next.js Image component for optimized images
import Image from "next/image";
// Import the logo; ensure the path is correct for your project structure
import Logo from "../assets/images/retirewise.png";
import Link from "next/link";

// Define the Navbar component
const Navbar = () => {
  // State to manage the visibility of the menu on smaller screens
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu's visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="w-full z-50 top-0 start-0 bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={Logo} alt="Flowbite Logo" width={150} height={100} />
          </Link>
          <div className="flex md:order-2 space-x-0 md:space-x-0 rtl:space-x-reverse">
            <Link href="/login">
              <button
                type="button"
                className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center bg-black text-white px-4 py-4 hidden md:inline-flex"
              >
                Login
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 -gray-400 :-700 :ring-gray-600`}
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24" // Adjusted for a more standard viewbox size
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12h18M3 6h18M3 18h18"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md: -gray-700 w-full items-center text-black font-bold">
              <li>
                <Link
                  href="/#home"
                  className="block py-2 px-3 rounded md:p-0 hover:text-secondary"
                  aria-current="page"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/#learn"
                  className="block py-2 px-3 rounded hover:text-secondary md:p-0 md::text-blue-500 -white :-700 :text-white -gray-700"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/#investments"
                  className="block py-2 px-3 rounded hover:-100 md:hover: hover:text-secondary md:p-0 md::text-blue-500 -white :-700 :text-white md:: -gray-700"
                >
                  Investments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

// Export the Navbar component
export default Navbar;
