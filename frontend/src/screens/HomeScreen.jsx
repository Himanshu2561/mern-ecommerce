import Products from "../components/Products";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div>
      <Meta />
      {!keyword && (
        <div>
          <h1 className="container mx-auto px-10 sm:px-5 mt-10 sm:py-5 font-semibold text-ecom-2 text-2xl">
            <div className="border-b-2 border-indigo-500 pb-2 w-full text-indigo-500">
              Top Products
            </div>
            <ProductCarousel />
          </h1>
        </div>
      )}
      <h1 className="container mx-auto px-10 sm:px-5 mt-20 sm:py-5 font-semibold text-ecom-2 text-2xl flex justify-between items-center">
        <div className="border-b-2 border-indigo-500 pb-2 w-full text-indigo-500">
          Latest Products
        </div>
        {keyword && (
          <Link to="/" className="text-lg text-gray-600">
            Go Back
          </Link>
        )}
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-10 sm:px-5 py-10 sm:py-5 mx-auto">
          {isLoading ? (
            <div className="min-h-[80vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : isError ? (
            <div>{isError?.data?.message || isError.error}</div>
          ) : (
            <>
              <div className="flex flex-wrap -m-4">
                {data.products.map((item) => (
                  <Products key={item._id} item={item} />
                ))}
              </div>
              <Paginate pages={data.pages} keyword={keyword ? keyword : ""} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
