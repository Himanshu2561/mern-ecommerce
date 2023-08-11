import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-ecom-4 bg-ecom-1 body-font">
      <div className="container px-10 sm:px-5 py-8 mx-auto flex items-center flex-row sm:flex-col">
        <Link
          to="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-ecom-4"
        >
          <img
            className="w-10 h-10 p-1 bg-ecom-3 rounded-full"
            src="/header-logo.svg"
            alt=""
          />
          <span className="ml-3 text-xl">Ecommerce</span>
        </Link>
        <p className="text-sm text-ecom-4 ml-4 pl-4 border-l-2 border-gray-800 py-2 mt-0 sm:pl-0 sm:ml-0 sm:mt-4 sm:border-none">
          © {year} Himanshu Rathore — @himanshu25061
        </p>
        <span className="inline-flex ml-auto mt-0 sm:mt-4 sm:justify-center sm:gap-2 gap-5 sm:mx-auto justify-start">
          <a className="text-ecom-3 hover:text-ecom-4 cursor-pointer">
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/Himanshu25061"
            className="ml-3 text-ecom-3 hover:text-ecom-4 cursor-pointer"
          >
            <FaTwitter />
          </a>
          <a className="ml-3 text-ecom-3 hover:text-ecom-4 cursor-pointer">
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/himanshurathore2561/"
            className="ml-3 text-ecom-3 hover:text-ecom-4 cursor-pointer"
          >
            <FaLinkedinIn />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
