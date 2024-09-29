// App.js
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductLists from "./pages/ProductLists";
import ProductOverview from "./pages/ProductOverview";
import CheckCart from "./pages/CheckCart";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import ResetPassword from "./pages/ResetPassword";
import MyOrders from "./components/profileComponets/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Discussion from "./pages/discussion/Discussion"
import DiscussionDetail from "./pages/discussion/DetailView"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<ProductLists />} />
        <Route path="/shop/:product_category" element={<ProductLists />} />
        <Route path="/product/:product_id" element={<ProductOverview />} />
        <Route path="/check" element={<CheckCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders/:orderId" element={<OrderDetails />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/discussion/detail/:discussion_id" element={<DiscussionDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
