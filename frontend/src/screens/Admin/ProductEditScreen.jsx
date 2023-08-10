import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { BiLeftArrowCircle } from "react-icons/bi";
import Meta from "../../components/Meta";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const maxImageSize = 1000000;

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation(productId);

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });

      toast.success("Product updated");
      refetch();

      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async () => {
    if (imageFile) {
      if (imageFile.size > maxImageSize) {
        return toast.error("File size exceeded");
      } else {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage({ public_id: res.public_id, url: res.url });
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } else {
      toast.error("No file choosen");
    }
  };

  return (
    <div className="container max-w-screen-lg mx-auto">
      <Meta title={"Ecommerce - Edit Product"} />
      <div className="py-5 text-gray-600">
        <Link to="/admin/productlist">
          <BiLeftArrowCircle className="w-10 h-10" />
        </Link>
      </div>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-10">
        <div className="grid gap-4 gap-y-2 text-sm sm:grid-cols-1 grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Edit Product</p>
            <p>Please edit all the fields correctly.</p>
          </div>
          <form onSubmit={submitHandler} className="col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : error ? (
              <div className="py-2 w-full rounded-md bg-opacity-50 bg-red-500 text-red-500">
                {error?.data?.message || error.error}
              </div>
            ) : (
              <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3">
                  <label className="font-medium text-gray-900">Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    value={name}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="font-medium text-gray-900">Price</label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    name="price"
                    value={price}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="00.00"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block mb-2 font-medium text-gray-900">
                    Upload Image
                  </label>
                  <input
                    className="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  <p className="mt-1 text-red-500 text-xs" id="file_input_help">
                    PNG, JPG or JPEG (MAX: 1MB).
                  </p>
                  <div className="flex mt-2 gap-x-4">
                    <button
                      type="button"
                      className="w-20 mt-2 bg-ecom-3 bg-opacity-75 px-2 py-1 text-white font-bold rounded-md hover:bg-opacity-100"
                      onClick={uploadFileHandler}
                    >
                      Upload
                    </button>
                    {loadingUpload && <Loader />}
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="font-medium text-gray-900">Brand</label>
                  <input
                    onChange={(e) => setBrand(e.target.value)}
                    type="text"
                    name="brand"
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={brand}
                    placeholder="Product Brand"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="font-medium text-gray-900">
                    Count In Stock
                  </label>
                  <input
                    onChange={(e) => setCountInStock(e.target.value)}
                    type="number"
                    name="countInStock"
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={countInStock}
                    placeholder="0000"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="font-medium text-gray-900">Category</label>
                  <input
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    name="category"
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={category}
                    placeholder="Product Category"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="font-medium text-gray-900">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    name="description"
                    className="transition-all flex items-center border mt-1 rounded px-4 py-2 w-full bg-gray-50"
                    value={description}
                    placeholder="Product Description"
                  ></textarea>
                </div>

                <div className="md:col-span-5 text-right mt-5">
                  {loadingUpdate && <Loader />}

                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditScreen;
