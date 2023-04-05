import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import BlogCard from "../BlogCard";

const MoreSuggestedBlogs = ({ posts = [] }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box className="car">
        <Grid container rowGap={1}>
            {posts.map((post, i) => {
              return i>1 && <Grid xs={12}>
                <BlogCard post={post} type={"xs"} />
              </Grid>
            })}
            </Grid>
      </Box>
      {/* <Divider sx={{ my: 1, borderBottom: "2px solid #efefef" }} /> */}
    </>
  );
};

export default MoreSuggestedBlogs;
