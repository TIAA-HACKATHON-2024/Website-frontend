import Image from "next/image";
import React from "react";

import HeroBanner from "../assets/images/hero_banner.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center h-[615px]">
      <div className="flex flex-col items-center">
        <div className="relative text-2xl md:text-5xl justify-center items-center font-semibold text-white flex pb-3">
          Invest with Confidence,
          <br></br>Secure your Retirement
        </div>
        <div className="flex text-lg px-6 text-center md:text-2xl justify-center items-center text-white">
          Empower your retirement with smart investments and peace of mind.
          <br></br>Invest confidently with RetireWise.
        </div>
        <button className="flex bg-white text-black text-primary font-semibold text-lg px-8 py-4 mt-8 rounded-3xl">
          <Link href="/Questionnaire">Forecast Your Investments</Link>
        </button>
      </div>
      <Image
        src={HeroBanner}
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />
    </div>
  );
};

export default Hero;
