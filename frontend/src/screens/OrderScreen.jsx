import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import Meta from "../components/Meta";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [payOrder, { isLoading: lodingPayOrder }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, errorPayPal, loadingPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success("Payment Successful");
  // }

  function onError(err) {
    toast.error(err?.data?.message || err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-[50vh]">
      <Loader />
    </div>
  ) : error ? (
    <div>{error.data.message}</div>
  ) : (
    <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
      <Meta title={'Ecommerce - Order Product'}/>
      <div className="container mx-auto px-10">
        <div className="py-10">
          <div className="flex gap-5 justify-between">
            <div className="w-[70%] bg-white h-[10%] rounded-lg">
              <div className="relative overflow-x-auto shadow-md rounded-lg">
                <div className="text-2xl text-gray-500 border-b p-5">
                  <div className="pb-4 font-bold">Shipping</div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold">Name: </span>
                      {order?.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold">Email: </span>
                      {order?.user.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold">Addres: </span>{" "}
                      {order?.shippingAddress.address},{" "}
                      {order?.shippingAddress.city},{" "}
                      {order?.shippingAddress.zipCode},{" "}
                      {order?.shippingAddress.country}
                    </div>
                    {order?.isDelivered ? (
                      <div className="py-2 px-4 w-full rounded-md bg-green-500 bg-opacity-50 mt-4 text-white font-semibold text-sm">
                        Delivered on: {order?.deliveredAt.substring(0, 10)}
                      </div>
                    ) : (
                      <div className="py-2 px-4 w-full border rounded-md bg-red-500 bg-opacity-50 mt-4 text-white font-semibold text-sm">
                        Not Delivered
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-2xl text-gray-500 border-b p-5">
                  <div className="pb-4 font-bold">Payment</div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold">Method: </span>
                    {order?.paymentMethod}
                  </div>
                  {order?.isPaid ? (
                    <div className="py-2 px-4 w-full rounded-md bg-green-500 bg-opacity-50 mt-4 text-white font-semibold text-sm">
                      Paid on: {order?.paidAt.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="py-2 px-4 w-full border rounded-md bg-red-500 bg-opacity-50 mt-4 text-white font-semibold text-sm">
                      Not Paid
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-500 p-5">
                  <div>Order Items</div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                  <tbody>
                    {order?.orderItems.map((item, index) => (
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
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                        </th>
                        <td align="center" className="px-6 py-4">
                          ${item.qty} X ${item.price} = ${item.qty * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-[30%] bg-ecom-4 h-[10%] rounded-lg sticky top-2">
              <div className="bg-gray-50 p-4 shadow-lg rounded-lg text-gray-600">
                <div className="font-bold text-xl border-b-2 border-indigo-500 py-2 text-indigo-500">
                  Order Summary
                </div>
                <div className="py-4 border-b-2 border-indigo-500">
                  <div className="flex justify-between items-center py-1">
                    <div>Items</div>
                    <div className="font-semibold">$ {order?.itemPrice}</div>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div>Shipping</div>
                    <div className="font-semibold">$ {order?.shippingPrice}</div>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div>Tax</div>
                    <div className="font-semibold">$ {order?.taxPrice}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 font-semibold ">
                  <div>Total</div>
                  <div className="text-indigo-500">$ {order?.totalPrice}</div>
                </div>
                {!order.isPaid && (
                  <>
                    {loadingPayPal && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <>
                        {/* <button
                          onClick={onApproveTest}
                          type="button"
                          className="text-center py-2 mb-4 rounded-md text-white font-bold bg-opacity-75 w-full bg-ecom-3 hover:bg-opacity-100 transition cursor-pointer"
                        >
                          Test Pay Order
                        </button> */}
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </>
                    )}
                  </>
                )}

                {loadingDeliver && <Loader />}

                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <button
                      onClick={deliverOrderHandler}
                      type="button"
                      className="text-center py-2 mb-4 rounded-md text-white font-bold w-full bg-ecom-3 hover:text-indigo-600 transition cursor-pointer"
                    >
                      Mark As Delivered
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
