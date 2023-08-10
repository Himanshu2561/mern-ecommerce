import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
      <Meta title={'Ecommerce - Make Payment'}/>
      <div>
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div className="font-bold text-xl text-gray-600">
        Please Select Payment Method
      </div>
      <form onSubmit={handleSubmit} className="container h-[80vh] pt-10">
        <ul className="items-center select-none w-1/2 mx-auto text-sm font-medium text-gray-900 bg-ecom-4 border border-gray-200 rounded-lg flex">
          <li className="w-full sm:border-b border-gray-200 border-b-0 border-r">
            <div className="flex items-center pl-3">
              <input
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="horizontal-list-radio-paypal"
                type="radio"
                value="PayPal"
                name="list-radio"
                defaultChecked
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="horizontal-list-radio-paypal"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
              >
                PayPal (Credit Card)
              </label>
            </div>
          </li>
          <li className="w-full sm:border-b border-gray-200 border-b-0 border-r">
            <div className="flex items-center pl-3">
              <input
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="horizontal-list-radio-stripe"
                type="radio"
                value="Stripe"
                disabled
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="horizontal-list-radio-stripe"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
              >
                Stripe (Credit Card)
              </label>
            </div>
          </li>
          <li className="w-full sm:border-b border-gray-200 border-b-0 border-r">
            <div className="flex items-center pl-3">
              <input
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="horizontal-list-radio-upi"
                type="radio"
                value="UPI"
                disabled
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="horizontal-list-radio-upi"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
              >
                RazorPay (UPI)
              </label>
            </div>
          </li>
        </ul>
        <div className="flex justify-center items-center mt-10">
          <button
            type="submit"
            className="px-5 py-1 text-black bg-opacity-50 font-semibold text-lg hover:bg-opacity-75 bg-ecom-3 rounded-md"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;
