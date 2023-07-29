import Products from "../components/Products";

const HomeScreen = () => {
  return (
    <div>
      <h1 className="container mx-auto px-10 sm:px-5 mt-10 sm:py-5 font-semibold text-ecom-2 text-2xl">Latest Products</h1>
      <Products />
    </div>
  );
};

export default HomeScreen;
