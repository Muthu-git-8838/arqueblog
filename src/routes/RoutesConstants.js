import React from "react";
const Home = React.lazy(() => import("../pages/Home"));
const Detail = React.lazy(() => import("../pages/Detail"));
const Login = React.lazy(() => import("../pages/Login"));
const AdminLogin = React.lazy(() => import("../pages/Admin/AdminLogin"));
const AdminHome = React.lazy(() => import("../pages/Admin/AdminHome"));
// const Recent = React.lazy(() => import('../components/Recent'))

const Popular = React.lazy(() => import("../components/Popular"));
const Message = React.lazy(() => import("../components/Message"));
const Wishlist = React.lazy(() => import("../components/Wishlist"));
const SignUp = React.lazy(() => import("../pages/Signup"));
const Notification = React.lazy(() => import("../components/Notification"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const UpdatePassword = React.lazy(() => import("../pages/UpdatePassword"));
const BlogCreate = React.lazy(() => import("../pages/BlogCreate"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Following = React.lazy(() => import("../pages/Following"));
const SearchResults = React.lazy(() => import("../pages/SearchResults"));

const routes = [
  {
    path: "/",
    exact: false,
    element: Home,
    isAuthenticated: false,
    isCommon: true,
  },
  {
    path: "/popular",
    exact: false,
    element: Popular,
    isAuthenticated: false,
    isCommon: true,
  },
  // {
  //   path:'/recent',
  //   exact:false,
  //   element:Recent,
  //   isAuthenticated: false,
  //   isCommon: true
  // },
  {
    path: "/detail/:postId",
    exact: false,
    element: Detail,
    isAuthenticated: true,
    isCommon: true,
  },
  {
    path: "/login",
    exact: false,
    element: Login,
    isAuthenticated: false,
  },
  {
    path: "/admin/login",
    exact: false,
    element: AdminLogin,
    isAuthenticated: false,
    isCommon: true,
  },
  {
    path: "/admin/dashboard",
    exact: false,
    element: AdminHome,
    isAuthenticated: true,
  },
  {
    path: "/signup",
    exact: false,
    element: SignUp,
    isAuthenticated: false,
  },
  {
    path: "/forgot-password",
    exact: false,
    element: ForgotPassword,
    isAuthenticated: false,
  },
  {
    path: "/message",
    exact: true,
    element: Message,
    isAuthenticated: true,
  },
  {
    path: "/profile/:userId",
    exact: false,
    element: Profile,
    isCommon: true,
  },
  {
    path: "/following",
    exact: true,
    element: Following,
    isAuthenticated: true,
  },
  {
    path: "/notification",
    exact: true,
    element: Notification,
    isAuthenticated: true,
  },
  {
    path: "/wishlist",
    exact: true,
    element: Wishlist,
    isAuthenticated: true,
  },
  {
    path: "/update-password/:forgotPasswordToken",
    exact: false,
    element: UpdatePassword,
    isAuthenticated: false,
  },
  {
    path: "/blog-write",
    exact: false,
    element: BlogCreate,
    isAuthenticated: true,
  },

  {
    path: "/search-results",
    exact: false,
    element: SearchResults,
    isAuthenticated: false,
    isCommon: true,
  },
];

export default routes;
