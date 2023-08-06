import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const ProfileOrders = ({ orders }) => {
  console.log(orders);
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg select-none">
      <table className="w-full text-xs text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              DATE
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              TOTAL
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              PAID
            </th>
            <th scope="col" align="center" className="px-6 py-3">
              DELIVERED
            </th>
            <th scope="col" align="center" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 select-text">
                {order._id}
              </th>
              <td align="center" className="px-6 py-4">
                {order.createdAt.substring(0, 10)}
              </td>
              <td align="center" className="px-6 py-4">
                <div className="flex w-20 justify-evenly items-center">
                  ${order.totalPrice}
                </div>
              </td>
              <td align="center" className="px-6 py-4">
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td align="center" className="px-6 py-4">
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td align="center" className="px-6 py-4">
                <Link to={`/order/${order._id}`}>
                  <button className="font-bold underline">Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileOrders;
