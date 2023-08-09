import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.shippingAddress.address, cart.paymentMethod]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
      <div>
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="container mx-auto px-10">
        <div className="py-10">
          {cart.cartItems.length === 0 ? (
            <div className="py-2 px-5 w-full bg-ecom-3 bg-opacity-50 text-white font-semibold rounded-lg mt-10">
              Your cart is empty
              <span className="ml-5 underline">
                <Link to="/">Go Back</Link>
              </span>
            </div>
          ) : (
            <div className="flex gap-5 justify-between">
              <div className="w-[70%] bg-white h-[10%] rounded-lg">
                <div className="relative overflow-x-auto shadow-md rounded-lg select-none">
                  <div className="text-2xl font-bold text-gray-600 border-b p-5">
                    <div className="pb-2">Shipping</div>
                    <div className="text-sm text-gray-500">
                      Addres: {cart.shippingAddress.address},{" "}
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.zipCode},{" "}
                      {cart.shippingAddress.country}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-600 border-b p-5">
                    <div className="pb-2">Payment</div>
                    <div className="text-sm text-gray-500">
                      Method: {cart.paymentMethod}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-600 p-5">
                    <div>Order Items</div>
                  </div>
                  <table className="w-full text-sm text-left text-gray-500">
                    <tbody>
                      {cart.cartItems.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium flex items-center gap-2 text-gray-900"
                          >
                            <div className="w-16">
                              <img
                                className="rounded-sm"
                                src={item.image.url}
                                alt=""
                              />
                            </div>
                            <div className="underline">
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </div>
                          </th>
                          <td align="center" className="px-6 py-4">
                            ${item.qty} X ${item.price} = $
                            {item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-[30%] bg-ecom-4 h-[10%] rounded-lg sticky top-0">
                <div className="bg-gray-50 p-4 shadow-lg rounded-lg text-gray-600">
                  <div className="font-bold text-xl border-b py-2">
                    Order Summary
                  </div>
                  <div className="py-4 border-b">
                    <div className="flex justify-between items-center py-1">
                      <div>Items</div>
                      <div className="font-semibold">${cart.itemPrice}</div>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <div>Shipping</div>
                      <div className="font-semibold">${cart.shippingPrice}</div>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <div>Tax</div>
                      <div className="font-semibold">${cart.taxPrice}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4 font-semibold">
                    <div>Total</div>
                    <div>${cart.totalPrice}</div>
                  </div>
                  {error && <div className="py-4 font-semibold">{error}</div>}
                  <button
                    onClick={placeOrderHandler}
                    type="button"
                    disabled={cart.cartItems.length === 0}
                    className="text-center py-2 rounded-md text-white font-bold bg-opacity-75 w-full bg-ecom-3 hover:bg-opacity-100 transition cursor-pointer"
                  >
                    Place Order
                  </button>
                  {isLoading && <Loader />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
