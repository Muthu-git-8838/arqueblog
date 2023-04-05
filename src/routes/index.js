import * as React from "react";
import routes from "./RoutesConstants";
import PrivateRoute from "./PraivateRoute";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import CommonRoute from "./CommonRoute";
import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getCurrencies,
  getProfileTypes,
} from "../store/common/CommonActions";
import { getPostTypes } from "../store/postType/postTypeAction";
import { getProfile } from "../store/user/userActions";
import { getRecommendedPosts } from "../store/posts/postActions";

function Router() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategories());
    dispatch(getPostTypes());
    dispatch(getProfile());
    dispatch(getRecommendedPosts());
  }, []);

  return (
    <Suspense
      fallback={
        <Stack
          direction={"row"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Stack>
      }
    >
      <Routes>
        {routes.map(
          (
            { element: Component, path, isAuthenticated, isCommon, ...rest },
            i
          ) => {
            return (
              <Route
                {...rest}
                path={path}
                element={
                  isCommon ? (
                    <Component />
                  ) : isAuthenticated ? (
                    <PrivateRoute path={path}>
                      <Component />
                    </PrivateRoute>
                  ) : (
                    <CommonRoute path={path}>
                      <Component />
                    </CommonRoute>
                  )
                }
              />
            );
          }
        )}
      </Routes>
    </Suspense>
  );
}

export default Router;
