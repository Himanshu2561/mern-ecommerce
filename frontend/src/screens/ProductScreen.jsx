import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useState } from "react";
import Rating from "../components/Rating";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
  BiLeftArrowCircle,
} from "react-icons/bi";

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(0);

  const { id: productId } = useParams();
  const product = products.find((p) => p._id == productId);

  return (
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
            <div className="flex border-t border-b mb-6 border-gray-200 py-2 select-none">
              <span className="text-gray-500 flex gap-2 items-center">
                Quantity
                <span className="flex flex-col h-5">
                  <BiSolidUpArrow
                    onClick={() =>
                      quantity < 5 ? setQuantity(quantity + 1) : setQuantity(5)
                    }
                    className="cursor-pointer"
                  />
                  <BiSolidDownArrow
                    onClick={() =>
                      quantity != 0 ? setQuantity(quantity - 1) : setQuantity(0)
                    }
                    className="cursor-pointer"
                  />
                </span>
              </span>
              <span className="ml-auto text-gray-900">{quantity}</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Add To Cart
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="w-1/2 sm:w-full h-auto sm:h-64 object-cover object-center rounded"
            src="/dummyImg.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductScreen;
