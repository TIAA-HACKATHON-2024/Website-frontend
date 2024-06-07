import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/images/retirewise.png";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          <div className="flex items-center">
            <Link href="/" passHref className="flex items-center">
              <Image
                src={Logo}
                className="h-12 me-3 object-contain"
                alt="FlowBite Logo"
                width={200}
                height={100}
              />
            </Link>
          </div>
          <div className="space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-gray-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm hover:text-gray-400"
            >
              Terms of Service
            </Link>
            <Link href="/contact-us" className="text-sm hover:text-gray-400">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            &copy; 2024 My Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
