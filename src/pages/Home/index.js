import { Card, Grid, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import SuggestedBlogs from "../../components/SuggestedBlogs";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header";
import CategoriesCarousel from "../../components/CategoriesCarousel";
import Popular from "../../components/Popular";
import PopularPost from "../../components/PopularPost";
import RecommendedBlogs from "../../components/Recommended";
import RecentPosts from "../../components/RecentPosts";
import Trending from "../../components/Trending";
import Post from "../Post";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  getRecentPosts,
  getRecommendedPosts,
  getMyFollowings,
} from "../../store/posts/postActions";

const Home = () => {
  const dispatch = useDispatch();
  const recentPosts = useSelector((state) => state.post.recentPosts);
  const myFollowingPosts = useSelector((state) => state.post.myFollowingPosts);
  const recommendedPosts = useSelector((state) => state.post.recommendedPosts);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(getRecommendedPosts());
    dispatch(getRecentPosts());
    dispatch(getMyFollowings());
    dispatch(getMyFollowings());
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: "background.primary" }}>
        <Header />
        <CategoriesCarousel />
        <RecommendedBlogs posts={recommendedPosts} />
        <SuggestedBlogs posts={myFollowingPosts} />
        <RecentPosts posts={recentPosts} />
      </Box>
      {/* <Post /> */}
      <Footer />
    </>
  );
};

export default Home;
