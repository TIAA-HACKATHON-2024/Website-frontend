import React from "react";
import Logo from "../assets/images/retirewise.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                className="h-12 me-3 object-contain"
                alt="FlowBite Logo"
                width={200}
                height={100}
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1 justify-center">
            {/* Resources */}
            <div className="">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase justify-center flex">
                About
              </h2>
              <ul className="text-gray-500 font-medium grid md:grid-cols-2 md:gap-8 justify-center">
             
                <li className="mb-4 flex justify-center">
                  <Link
                    href="/"
                    className="hover:underline"
                  >
                    Meet the Team
                  </Link>
                </li>
                <li className="mb-4 flex justify-center">
                  <Link href="/" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-gray-500 sm:text-center">
            © {year}{" "}
            <Link href="/" className="hover:underline">
              RetireWise™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
