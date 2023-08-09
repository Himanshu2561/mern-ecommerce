import Products from "../components/Products";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber });

  const navigate = useNavigate();

  const onPageChange = (selectedPage, onProductList) => {
    // Transforming from zero-based index to one-based index
    if (onProductList) {
      navigate("/admin/productlist/" + selectedPage);
    } else {
      navigate("/page/" + selectedPage);
    }
  };

  return (
    <div>
      <h1 className="container mx-auto px-10 sm:px-5 mt-10 sm:py-5 font-semibold text-ecom-2 text-2xl">
        Latest Products
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
              <Paginate pages={data.pages} onPageChange={onPageChange} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
