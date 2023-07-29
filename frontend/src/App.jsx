import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import PageNotFound from "./screens/PageNotFound.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/*" element={<PageNotFound />} />
        // ---------Private Routes Below---------
      </Routes>
      <Footer />
    </>
  );
}

export default App;
