import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="pt-5 pb-10 sm:scale-75">
      <ol className="flex items-center w-full text-lg font-medium text-center text-gray-500">
        {step1 ? (
          <li className="flex md:w-full items-center text-ecom-3 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-[''] after:mt-1 after:rounded-full after:w-20 after:bg-ecom-3 after:h-[3px] after:mx-5 after:text-gray-200">
              <svg
                className="w-3.5 h-3.5 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <Link to="/login">Sign In</Link>
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-[''] after:mt-1 after:rounded-full after:w-20 after:bg-ecom-3 after:h-[3px] after:mx-5 after:text-gray-200">
              <span className="mr-2">1</span>
              <Link>Sign In</Link>
            </span>
          </li>
        )}
        {step2 ? (
          <li className="flex md:w-full items-center text-ecom-3 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-[''] after:mt-1 after:rounded-full after:w-20 after:bg-ecom-3 after:h-[3px] after:mx-5 after:text-gray-200">
              <svg
                className="w-3.5 h-3.5 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <Link to="/shipping">Shipping</Link>
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-[''] after:mt-1 after:rounded-full after:w-20 after:bg-ecom-3 after:h-[3px] after:mx-5 after:text-gray-200">
              <span className="mr-2">2</span>
              <Link>Shipping</Link>
            </span>
          </li>
        )}
        {step3 ? (
          <li className="flex md:w-full items-center text-ecom-3 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-[''] after:mt-1 after:rounded-full after:w-20 after:bg-ecom-3 after:h-[3px] after:mx-5 after:text-gray-200">
              <svg
                className="w-3.5 h-3.5 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <Link to="/payment">Payment</Link>
            </span>
          </li>
        ) : (
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center after:content-[''] after:mt-1 after:rounded-full after:w-20 after:bg-ecom-3 after:h-[3px] after:mx-5 after:text-gray-200">
              <span className="mr-2">3</span>
              <Link>Payment</Link>
            </span>
          </li>
        )}
        {step4 ? (
          <li className="flex md:w-full items-center text-ecom-3 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:mx-6 xl:after:mx-10">
            <span className="flex items-center">
              <svg
                className="w-3.5 h-3.5 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <Link to="placeorder">Place Order</Link>
            </span>
          </li>
        ) : (
          <li className="flex items-center">
            <span className="mr-2">4</span>
            <Link>Place Order</Link>
          </li>
        )}
      </ol>
    </div>
  );
};

export default CheckoutSteps;
