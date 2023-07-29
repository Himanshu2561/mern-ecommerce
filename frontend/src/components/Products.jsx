import { Link } from "react-router-dom";
import products from "../data/products";
import Rating from "./Rating";

const Products = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-10 sm:px-5 py-10 sm:py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((item) => {
            return (
              <div
                key={item._id}
                className="w-1/4 md:w-1/2 p-4 lg:w-full shadow-lg scale-[90%]"
              >
                <Link
                  to={`/product/${item._id}`}
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-center lg:w-full h-full block"
                    src="dummyImg2.jpg"
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </h2>
                  <div className="mt-1">
                    <Rating value={item.rating} text={item.numReviews} />
                  </div>
                  <p className="mt-1">${item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
