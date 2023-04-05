import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";

const CommonRoute = ({ children, path }) => {
  const [cookies, setCookie] = useCookies(["SID", "ASID"]);
  let location = useLocation();
  if ( window.location.pathname.startsWith("/admin")) {
    if (cookies.ASID) {
      return <Navigate to="/admin/dashboard" state={{ from: location }} />;
    } else {
      return children;
    }
  }
  if (cookies.SID) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default CommonRoute;
