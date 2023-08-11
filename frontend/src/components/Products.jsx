import { Link } from "react-router-dom";
import Rating from "./Rating";

const Products = ({ item }) => {
  return (
    <div className="w-1/4 md:w-1/2 p-4 lg:w-full shadow-lg scale-[90%]">
      <Link
        to={`/product/${item._id}`}
        className="block relative h-48 rounded overflow-hidden"
      >
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={item.image.url}
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-indigo-500 text-xs tracking-widest title-font mb-1">
          {item.category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium overflow-hidden overflow-ellipsis whitespace-nowrap">
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </h2>
        <div className="mt-1">
          <Rating value={item.rating} text={item.numReviews} />
        </div>
        <p className="mt-1 font-bold"><span className="text-green-500">$</span> {item.price}</p>
      </div>
    </div>
  );
};

export default Products;
