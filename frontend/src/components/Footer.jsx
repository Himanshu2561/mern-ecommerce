import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-ecom-1 body-font">
      <div className="container px-10 sm:px-5 py-8 mx-auto flex items-center flex-row sm:flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-500">
          <img
            className="w-10 h-10 p-1 bg-white rounded-full"
            src="header-logo.svg"
            alt=""
          />
          <span className="ml-3 text-xl">Ecommerce</span>
        </a>
        <p className="text-sm text-gray-500 ml-4 pl-4 border-l-2 border-gray-800 py-2 mt-0 sm:pl-0 sm:ml-0 sm:mt-4 sm:border-none">
          © 2020 Himanshu — @himanshu25061
        </p>
        <span className="inline-flex ml-auto mt-0 sm:mt-4 sm:justify-center sm:mx-auto justify-start">
          <a className="text-gray-500">
            <FaFacebookF />
          </a>
          <a className="ml-3 text-gray-500">
            <FaTwitter />
          </a>
          <a className="ml-3 text-gray-500">
            <FaInstagram />
          </a>
          <a className="ml-3 text-gray-500">
            <FaLinkedinIn />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
