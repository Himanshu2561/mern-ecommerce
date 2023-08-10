import { Link, useParams } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteProductHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new peoduct?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container min-h-screen mt-10 mx-auto">
      <Meta title={"Ecommerce - All Products"} />
      <div className="flex justify-between items-center border-b text-xl text-gray-800 font-bold uppercase py-1">
        <div>Products</div>
        <div
          onClick={createProductHandler}
          className="flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <div>
            <AiOutlineEdit />
          </div>
          <div>Create New Product</div>
        </div>
      </div>
      {loadingCreate && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {loadingDelete && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
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
          <div className="relative overflow-x-auto shadow-md rounded-lg flex flex-col justify-center items-center mb-10 mt-5">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRICE ($)
                  </th>
                  <th scope="col" align="center" className="px-6 py-3">
                    CATEGORY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BRAND
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product._id} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4">
                      {product._id}
                    </th>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td align="center" className="px-6 py-4">
                      <div className="flex w-20 justify-evenly items-center">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 flex justify-between items-center">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <AiOutlineEdit className="cursor-pointer" />
                      </Link>
                      <button onClick={() => deleteProductHandler(product._id)}>
                        <BiTrash className="text-red-500 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate pages={data.pages} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
