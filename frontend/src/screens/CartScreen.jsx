import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartRows from "../components/CartRows";
import CartTotal from "../components/CartTotal";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="container mx-auto px-10">
      <div className="py-10">
        <div className="text-2xl font-bold text-gray-600 flex items-baseline gap-5">
          <div>Shopping cart</div>
          <div className="text-sm text-gray-500">
            ({cartItems.reduce((acc, item) => acc + item.qty, 0)} Items)
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className=" py-2 px-5 w-full bg-ecom-3 bg-opacity-50 text-white font-semibold rounded-lg mt-10">
            Your cart is empty
            <span className="ml-5 underline">
              <Link to="/">Go Back</Link>
            </span>
          </div>
        ) : (
          <div className="flex gap-5 justify-between mt-10">
            <div className="w-[70%] bg-ecom-4 h-[10%] rounded-lg">
              <CartRows />
            </div>
            <div className="w-[30%] bg-ecom-4 h-[10%] rounded-lg sticky top-0">
              <CartTotal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
