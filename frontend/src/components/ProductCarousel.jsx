import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const width = "1100";
  const height = "320";

  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const modifyImageUrl = (imageUrl) => {
    const uploadIndex = imageUrl.indexOf("upload/");
    if (uploadIndex !== -1) {
      const modifiedUrl =
        imageUrl.slice(0, uploadIndex + 7) +
        `w_${width},h_${height},c_fill/` +
        imageUrl.slice(uploadIndex + 7);
      return modifiedUrl;
    }
    return imageUrl;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    !isLoading && (
      <Slider
        className="container w-[1440px] bg-ecom-4 mx-auto mt-10 rounded-xl p-5 text-center"
        {...settings}
      >
        {products.map((item) => (
          <div key={item._id} className="relative">
            <div className="text-white bg-black bg-opacity-50 max-w-5xl mx-auto h-fit py-2 px-4 rounded-md text-2xl font-bold absolute bottom-5 inset-x-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.name}
            </div>
            <img
              className="h-[20rem] rounded-lg mx-auto"
              src={modifyImageUrl(item.image.url)}
              alt=""
            />
          </div>
        ))}
      </Slider>
    )
  );
};

export default ProductCarousel;
