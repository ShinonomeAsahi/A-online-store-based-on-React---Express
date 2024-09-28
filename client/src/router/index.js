import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import ContentList from '../pages/ContentList';
import ContentDetail from '../pages/ContentDetail';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductOverview from '../pages/ProductOverview';
import CheckCart from '../pages/CheckCart';
import Shop from "../pages/Shop";
import Discussion from "../pages/discussion/Discussion"
import DiscussionDetail from "../pages/discussion/DetailView"

const Routes = () => {
  const { token } = useAuth();

  // 公共路由配置
  const routesForPublic = [
    {
      path: "/",
      element: <Shop />,
    },
  ];

  // 授权的用户才可以访问的路由配置
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        {
          path: "/content",
          element: <ContentList />,
        },
        {
          path: "/blog/:content_id",
          element: <ContentDetail />,
        },
        {
          path: "/topic/:content_id",
          element: <ContentDetail />,
        },
        {
          path: "/create-blog",
          element: <CreateContent type="blog" />,
        },
        {
          path: "/create-topic",
          element: <CreateContent type="topic" />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/product/:product_id",
          element: <ProductOverview />,
        },
        {
          path: "/checkout",
          element: <CheckCart />,
        },
        {
          path: "/discussion",
          element: <Discussion />,
        },
        {
          path: "/discussion/detail",
          element: <DiscussionDetail />,
        },
      ],
    },
  ];

  // 没有授权的用户才可以访问的路由配置
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <div>Login</div>,
    },
  ];

  // 合并路由配置
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;