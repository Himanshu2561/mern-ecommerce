import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
  BiLeftArrowCircle,
} from "react-icons/bi";
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    if (qty > 0) {
      dispatch(addToCart({ ...product, qty }));
      navigate("/cart");
    } else {
      toast.info("Please Select Quantity");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <div>{isError?.data?.message || isError.error}</div>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="w-4/5 mx-auto">
              <Link to="/">
                <BiLeftArrowCircle className="w-8 h-8" />
              </Link>
            </div>
            <div className="w-4/5 mx-auto flex flex-wrap">
              <div className="w-1/2 sm:w-full pr-10 py-6 mb-6 sm:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.brand}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  {product.name}
                </h1>
                <div className="flex mb-4">
                  <div className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                    Description
                  </div>
                </div>
                <p className="leading-relaxed mb-4">{product.description}</p>
                <div className="mb-4">
                  <Rating value={product.rating} text={product.numReviews} />
                </div>
                <div className="flex border-t border-gray-200 py-2 select-none">
                  <span className="text-gray-500">Status</span>
                  <span className="ml-auto text-gray-900">
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>
                {product.countInStock > 0 ? (
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2 select-none">
                    <span className="text-gray-500 flex gap-2 items-center">
                      Quantity
                      <span className="flex flex-col h-5">
                        <BiSolidUpArrow
                          onClick={() =>
                            qty < product.countInStock
                              ? setQty(qty + 1)
                              : setQty(product.countInStock)
                          }
                          className="cursor-pointer"
                        />
                        <BiSolidDownArrow
                          onClick={() =>
                            qty != 1 ? setQty(qty - 1) : setQty(1)
                          }
                          className="cursor-pointer"
                        />
                      </span>
                    </span>
                    <span className="ml-auto text-gray-900">{qty}</span>
                  </div>
                ) : (
                  <div className="flex border-t mb-6 border-gray-200 py-2 select-none"></div>
                )}
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product.price}
                  </span>
                  <button
                    onClick={addToCartHandler}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <img
                alt="ecommerce"
                className="w-1/2 sm:w-full h-auto sm:h-64 object-cover object-center rounded"
                src={product.image.url}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductScreen;
