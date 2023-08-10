import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Meta from "../../components/Meta";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container h-screen mt-10 mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="py-2 w-full rounded-md bg-opacity-50 bg-red-500 text-red-500">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          <div className="border-b text-xl text-gray-800 font-bold uppercase py-1">
            Orders
          </div>
          <div className="relative overflow-x-auto shadow-md rounded-lg flex flex-col justify-center items-center mb-10 mt-5">
            <Meta title={"Ecommerce - All Orders"} />
            <table className="w-full text-left text-gray-500">
              <thead className="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USER
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
                    <th scope="row" className="px-6 py-4 select-text">
                      {order.user && order.user.name}
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
        </>
      )}
    </div>
  );
};

export default OrderListScreen;
