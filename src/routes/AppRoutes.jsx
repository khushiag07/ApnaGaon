import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import Splash from "../pages/customer/Splash";
import Login from "../pages/customer/Login";
import OTPVerification from "../pages/customer/OTPVerification";
import Home from "../pages/customer/Home";
import Search from "../pages/customer/Search";
import Categories from "../pages/customer/Categories";
import ProductListing from "../pages/customer/ProductListing";
import FarmerProfile from "../pages/customer/FarmerProfile";
import ProductDetails from "../pages/customer/ProductDetails";
import Wishlist from "../pages/customer/Wishlist";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import OrderSuccess from "../pages/customer/OrderSuccess";
import TrackDelivery from "../pages/customer/TrackDelivery";
import OrderHistory from "../pages/customer/OrderHistory";
import Notifications from "../pages/customer/Notifications";
import Profile from "../pages/customer/Profile";
import Settings from "../pages/customer/Settings";
import Support from "../pages/customer/Support";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth flow — no shell chrome */}
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTPVerification />} />

      {/* Main customer app shell */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryId" element={<ProductListing />} />
        <Route path="/farmer/:farmerId" element={<FarmerProfile />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/track/:orderId" element={<TrackDelivery />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
