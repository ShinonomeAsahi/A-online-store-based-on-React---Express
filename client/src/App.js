// App.js
import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
// import Shop from './pages/Shop';
import ProductLists from './pages/ProductLists';
import ProductOverview from './pages/ProductOverview';
import CheckCart from './pages/CheckCart';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import TopicList from './pages/TopicList';
import TopicDetail from './pages/TopicDetail';
import ResetPassword from './pages/ResetPassword';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import Discussion from "./pages/discussion/Discussion"
import DiscussionDetail from "./pages/discussion/DetailView"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event" element={<EventList />} />
        <Route path="/event/:event_id" element={<EventDetail />} />
        <Route path="/shop" element={<ProductLists />} />
        <Route path="/shop/:product_category" element={<ProductLists />} />
        <Route path="/product/:product_id" element={<ProductOverview />} />
        <Route path="/check" element={<CheckCart />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:content_id" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topic/:content_id" element={<TopicDetail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders/:orderId" element={<OrderDetails />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/discussion/detail" element={<DiscussionDetail />} />
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
