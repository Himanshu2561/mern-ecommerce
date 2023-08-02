import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 p-4 shadow-lg rounded-lg text-gray-600">
      <div className="font-bold text-xl border-b py-2">
        Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
      </div>
      <div className="py-4 border-b">
        <div className="flex justify-between items-center py-1 font-semibold">
          <div className="">Total</div>
          <div className="">${cart.itemPrice}</div>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="">Dilevery</div>
          <div className="font-semibold">${cart.shippingPrice}</div>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="">Tax</div>
          <div className="font-semibold">${cart.taxPrice}</div>
        </div>
      </div>
      <div className="flex justify-between items-center py-4">
        <div className="">Subtotal</div>
        <div className="font-semibold">${cart.totalPrice}</div>
      </div>
      <button
        onClick={() => navigate("/login?redirect=/shipping")}
        type="button"
        disabled={cartItems.length === 0}
        className="text-center py-2 rounded-md text-white font-bold bg-opacity-75 w-full bg-ecom-3 hover:bg-opacity-100 transition cursor-pointer"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
