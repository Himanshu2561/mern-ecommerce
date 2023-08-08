import { BiTrash } from "react-icons/bi";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartRows = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCartHandler = async (product, qty) => {
    if (qty >= 1 && qty <= product.countInStock) {
      dispatch(addToCart({ ...product, qty }));
    }
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg select-none">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              Price
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium flex items-center gap-2 text-gray-900"
              >
                <div className="w-16">
                  <img className="rounded-sm" src={item.image.url} alt="" />
                </div>
                <div className="">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>
              </th>
              <td align="center" className="px-6 py-4">
                ${item.price}
              </td>
              <td align="center" className="px-6 py-4">
                <div className="flex w-20 justify-evenly items-center">
                  <div
                    onClick={() => {
                      addToCartHandler(item, Number(item.qty - 1));
                    }}
                    className="cursor-pointer"
                  >
                    <AiOutlineMinusCircle />
                  </div>
                  <div className="select-none">{item.qty}</div>
                  <div
                    onClick={() => {
                      addToCartHandler(item, Number(item.qty + 1));
                    }}
                    className="cursor-pointer"
                  >
                    <AiOutlinePlusCircle />
                  </div>
                </div>
              </td>
              <td align="center" className="px-6 py-4">
                <div
                  onClick={() => {
                    removeFromCartHandler(item._id);
                  }}
                  className="cursor-pointer"
                >
                  <BiTrash />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartRows;
