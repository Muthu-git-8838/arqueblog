import React from "react";
import {
    Stack
} from "@mui/material";
import BlogCard from "./BlogCard";

const Fashion = ({ items = [] }) => {
  return (
    <Stack sx={{ rowGap: 2 }}>
      {items.map((i) => {
        return <BlogCard />
      })}
    </Stack>
  );
};

export default Fashion;
