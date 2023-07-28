import { useState } from "react";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="text-gray-500 bg-ecom-1 body-font sm:flex sm:flex-col">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center sm:justify-between px-10 sm:px-5">
        <a className="flex title-font font-medium items-center text-gray-500 mb-0">
          <img
            className="w-14 h-14 p-1 bg-white rounded-full cursor-pointer shadow-md sm:h-10 sm:w-10"
            src="header-logo.svg"
            alt=""
          />
          <span className="ml-3 text-xl cursor-pointer">Ecommerce</span>
        </a>
        <nav className="mr-auto ml-4 py-1 pl-4 border-l border-gray-700 sm:border-none sm:m-auto	flex flex-wrap items-center text-base justify-center sm:hidden">
          <a className="mr-5 cursor-pointer hover:text-ecom-4">First Link</a>
          <a className="mr-5 cursor-pointer hover:text-ecom-4">Second Link</a>
          <a className="mr-5 cursor-pointer hover:text-ecom-4">Third Link</a>
          <a className="mr-5 cursor-pointer hover:text-ecom-4">Fourth Link</a>
        </nav>
        <div className="flex items-center gap-5 sm:hidden">
          <button>
            <img
              className="p-1 w-10 h-10 cursor-pointer"
              src="cart.svg"
              alt=""
            />
          </button>
          <button className="inline-flex items-center bg-ecom-4 border-0 py-1 px-3 focus:outline-none hover:bg-white hover:shadow-lg transition rounded text-base">
            Sign In
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div
          onClick={() => setToggle(!toggle)}
          className="hidden sm:flex relative gap-1 flex-col items-center rounded-full bg-ecom-4 p-2 w-8 h-8 justify-center"
        >
          {toggle ? (
            <p className="text-2xl ml-[5px] mb-[2px] rotate-45 transition">+</p>
          ) : (
            <>
              <p className="border-t-2 w-4 border-black transition"></p>
              <p className="border-t-2 w-4 border-black transition"></p>
              <p className="border-t-2 w-4 border-black transition"></p>
            </>
          )}
        </div>
      </div>
      {toggle && (
        <div className="bg-ecom-3 flex flex-col justify-center gap-10 items-center h-screen absolute w-full -z-10">
          <div className="flex flex-col flex-wrap items-start gap-4 justify-center">
            <a className="cursor-pointer hover:text-ecom-4">First Link</a>
            <a className="cursor-pointer hover:text-ecom-4">Second Link</a>
            <a className="cursor-pointer hover:text-ecom-4">Third Link</a>
            <a className="cursor-pointer hover:text-ecom-4">Fourth Link</a>
          </div>
          <div className="flex items-center justify-evenly w-full px-10">
            <button>
              <img
                className="p-1 w-10 h-10 cursor-pointer"
                src="cart.svg"
                alt=""
              />
            </button>
            <button className="inline-flex items-center bg-gray-500 text-ecom-4 border-0 py-1 px-3 focus:outline-none hover:bg-white hover:shadow-lg transition rounded text-base">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
