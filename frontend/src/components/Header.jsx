import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.info("You have been logged out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="text-ecom-4 bg-ecom-1 body-font sm:flex sm:flex-col">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center sm:justify-between px-10 sm:px-5">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-ecom-4 mb-0"
        >
          <img
            className="w-14 h-14 p-1 bg-ecom-3 rounded-full cursor-pointer shadow-md sm:h-10 sm:w-10"
            src="/header-logo.svg"
            alt=""
          />
          <span className="ml-3 text-xl cursor-pointer">Ecommerce</span>
        </Link>
        <nav className="mr-auto ml-4 py-1 pl-4 border-l border-gray-700 sm:border-none sm:m-auto	flex flex-wrap items-center text-base justify-center sm:hidden">
          <Link className="mr-5 cursor-pointer hover:text-ecom-3">
            First Link
          </Link>
          <Link className="mr-5 cursor-pointer hover:text-ecom-3">
            Second Link
          </Link>
          <Link className="mr-5 cursor-pointer hover:text-ecom-3">
            Third Link
          </Link>
          <Link className="mr-5 cursor-pointer hover:text-ecom-3">
            Fourth Link
          </Link>
        </nav>
        <div className="flex items-center gap-5 sm:hidden">
          <Link to="/cart">
            <div className="w-11 h-11 relative">
              <img
                className="p-1 w-full cursor-pointer"
                src="/cart.svg"
                alt=""
              />
              {cartItems.length > 0 && (
                <div className="absolute w-4 h-4 top-0 right-0 rounded-full bg-ecom-3 text-xs text-center">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </div>
          </Link>
          {/* DROP DOWN */}
          {userInfo ? (
            <div className="dropdown items-center bg-ecom-3 border-0 py-1 px-3 focus:outline-none rounded text-base">
              <button className="flex items-center gap-2">
                <div>Hello, {userInfo.name}</div>
                <div className="text-lg mt-1">
                  <FaAngleDown />
                </div>
              </button>
              <div className="dropdown-content hidden absolute right-0 flex-col bg-ecom-4 w-28 mt-1 rounded-sm text-gray-500 shadow-xl z-10">
                <Link
                  to="/profile"
                  className="hover:font-semibold px-3 py-1 cursor-pointer"
                >
                  Profile
                </Link>
                <div
                  onClick={logoutHandler}
                  className="hover:font-semibold px-3 py-1 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center bg-ecom-3 border-0 py-1 px-3 focus:outline-none hover:bg-ecom-2 transition rounded text-base"
            >
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
            </Link>
          )}
          {/* ADMIN DROP DOWN (ONLY DESKTOP) */}
          {userInfo && userInfo.isAdmin && (
            <>
              <div className="dropdown items-center bg-ecom-3 border-0 py-1 px-3 focus:outline-none rounded text-base">
                <button className="flex items-center gap-2">
                  <div>Admin</div>
                  <div className="text-lg mt-1">
                    <FaAngleDown />
                  </div>
                </button>
                <div className="dropdown-content hidden absolute right-0 flex-col text-xs text-right bg-ecom-4 w-20 mt-1 rounded-sm text-gray-500 shadow-xl z-10">
                  <Link
                    to="/admin/userlist"
                    className="hover:font-semibold px-3 py-1 cursor-pointer"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="hover:font-semibold px-3 py-1 cursor-pointer"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className="hover:font-semibold px-3 py-1 cursor-pointer"
                  >
                    Products
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        {/* SMALL SCREEN TOGGLE BTN */}
        <div
          onClick={() => setToggle(!toggle)}
          className="hidden sm:flex relative gap-1 flex-col items-center rounded-full bg-ecom-4 p-2 w-8 h-8 justify-center z-20"
        >
          {toggle ? (
            <FaTimes className="text-gray-800 transition" />
          ) : (
            <>
              <p className="border-t-2 w-4 border-gray-800 transition z-20"></p>
              <p className="border-t-2 w-4 border-gray-800 transition z-20"></p>
              <p className="border-t-2 w-4 border-gray-800 transition z-20"></p>
            </>
          )}
        </div>
      </div>
      {toggle && (
        <div className="bg-ecom-3 flex flex-col justify-center gap-10 items-center h-screen absolute w-full z-10">
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
                src="/cart.svg"
                alt=""
              />
            </button>
            {userInfo ? (
              <div className="dropdown items-center bg-ecom-3 border-0 py-1 px-3 focus:outline-none rounded text-base">
                <button className="flex items-center gap-2">
                  <div>Hello, {userInfo.name}</div>
                  <div className="text-lg mt-1">
                    <FaAngleDown />
                  </div>
                </button>
                <div className="dropdown-content hidden absolute right-0 flex-col bg-ecom-4 w-28 mt-1 rounded-sm text-gray-500 shadow-xl z-10">
                  <Link
                    to="/profile"
                    className="hover:font-semibold px-3 py-1 cursor-pointer"
                  >
                    Profile
                  </Link>
                  <div
                    onClick={logoutHandler}
                    className="hover:font-semibold px-3 py-1 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <button className="inline-flex items-center bg-gray-500 text-ecom-4 border-0 py-1 px-3 focus:outline-none hover:bg-white hover:shadow-lg transition rounded text-base">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
