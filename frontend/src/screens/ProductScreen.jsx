import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
  BiLeftArrowCircle,
} from "react-icons/bi";
import { toast } from "react-toastify";
import Reviews from "../components/Reviews";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingCreateProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (qty > 0) {
      dispatch(addToCart({ ...product, qty }));
      navigate("/cart");
    } else {
      toast.info("Please Select Quantity");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review Submitted");
      setRating(5);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
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
          <Meta title={product.name} />
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
                className="w-1/2 sm:w-full h-auto sm:h-64 object-contain object-center rounded"
                src={product.image.url}
              />
            </div>
            <div className="w-4/5 mx-auto flex flex-wrap">
              <div className="w-1/2 flex flex-col gap-y-5 sm:w-full pr-10 py-6 mb-6 sm:mb-0">
                <div className="text-xl font-bold border-b pb-1">Reviews</div>
                {product.reviews.length === 0 && (
                  <div className="p-4 bg-[#4f46e5] bg-opacity-75 mb-5 text-white font-bold rounded-lg">
                    No Reviews Yet
                  </div>
                )}
                {product.reviews.map((review) => (
                  <Reviews key={review._id} review={review} />
                ))}
              </div>
              <div className="w-1/2 sm:w-full py-6 mb-6 sm:mb-0">
                {product.reviews.length === 0 ? (
                  <div className="text-base font-bold border-b pb-1 mb-5 capitalize">
                    Be the first to review this product
                  </div>
                ) : (
                  <div className="text-xl font-bold border-b pb-1 mb-5">
                    Write a Customer Review
                  </div>
                )}

                {userInfo ? (
                  <form
                    onSubmit={submitHandler}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="rating"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Choose a Rating
                      </label>
                      <select
                        value={rating}
                        id="rating"
                        required={true}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        name="rating"
                      >
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Bad</option>
                        <option value="1">Very Bad</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Comment
                      </label>
                      <textarea
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        name="comment"
                        id="comment"
                        placeholder="Your Comment Here"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required={true}
                        rows="5"
                      />
                    </div>
                    {loadingCreateProductReview && <Loader />}
                    <button
                      disabled={loadingCreateProductReview}
                      type="submit"
                      className="w-full bg-ecom-3 text-white transition bg-opacity-50 hover:bg-opacity-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <div className="p-4 bg-[#4f46e5] bg-opacity-75 mb-5 text-white font-bold rounded-lg">
                    Please{" "}
                    <Link to="/login" className="underline">
                      Sign In
                    </Link>{" "}
                    to write a review
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductScreen;
