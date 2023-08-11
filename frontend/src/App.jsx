import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import LazyLoad from "./components/LazyLoad";

// Lazyly loading necessory screens
const PageNotFoundScreen = lazy(() => import("./screens/PageNotFoundScreen"));
const OrderListScreen = lazy(() => import("./screens/Admin/OrderListScreen"));
const UserListScreen = lazy(() => import("./screens/Admin/UserListScreen"));
const UserEditScreen = lazy(() => import("./screens/Admin/UserEditScreen"));
const PlaceOrderScreen = lazy(() => import("./screens/PlaceOrderScreen"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));
const ShippingScreen = lazy(() => import("./screens/ShippingScreen"));
const PaymentScreen = lazy(() => import("./screens/PaymentScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const OrderScreen = lazy(() => import("./screens/OrderScreen"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const CartScreen = lazy(() => import("./screens/CartScreen"));
const ProductListScreen = lazy(() =>
  import("./screens/Admin/ProductListScreen")
);
const ProductEditScreen = lazy(() =>
  import("./screens/Admin/ProductEditScreen")
);
// End lazy screens

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if pathname starts with '/page/'
    if (pathname.startsWith("/page/")) {
      window.scrollTo({ top: 800, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Suspense fallback={<LazyLoad />}>
        <Routes>
          <Route index={true} path="/" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen />}
          />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/*" element={<PageNotFoundScreen />} />
          {/*---------++++++++++++++++++++++++++++++---------*/}
          {/*---------Protected Private Routes Below---------*/}
          {/*---------++++++++++++++++++++++++++++++---------*/}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
          {/*---------++++++++++++++++++++++++++++---------*/}
          {/*---------Protected Admin Routes Below---------*/}
          {/*---------++++++++++++++++++++++++++++---------*/}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route
              path="/admin/productlist/page/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
