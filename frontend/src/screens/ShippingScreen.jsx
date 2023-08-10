import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import ShippingForm from "../components/ShippingForm";

const ShippingScreen = () => {
  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
      <Meta title={"Ecommerce - Shipping"} />
      <div>
        <CheckoutSteps step1 step2 />
      </div>
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm sm:grid-cols-1 grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Shipping Address</p>
              <p>Please fill out all the fields.</p>
            </div>
            <ShippingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
