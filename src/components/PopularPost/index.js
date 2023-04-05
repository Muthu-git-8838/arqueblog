import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import girl from "../../assets/girls.jpg";
import watch from "../../assets/watch.jpg";
import watch1 from "../../assets/watch1.jpg";
import car from "../../assets/car1.jpg";
import moment from "moment";

import "./index.css";
import { useNavigate } from "react-router-dom";

const PopularPost = ({ posts = [] }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box className="popularPost" mb={2}>
        {/* <Typography mb={3} sx={{ fontWeight: 600,color:"text.primary" }}>Popular</Typography> */}
        {posts.map((post) => {
          return (
            <>
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                alignItems={"center"}
                onClick={() => navigate(`/detail/${post._id}`)}
              >
                <Stack>
                  <Avatar sx={{ width: "70px", height: "70px" }} src={girl} />
                </Stack>
                <Stack sx={{ rowGap: 1 }}>
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                      "&:hover": {
                        color: "secondary.dark",
                      },
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    className="detail"
                    sx={{ color: "text.disabled" }}
                  >
                    {moment(post.createdAt).fromNow()}
                  </Typography>
                </Stack>
              </Stack>
              <Divider sx={{ border: "1px solid divider", my: 1 }} />
            </>
          );
        })}
      </Box>
    </>
  );
};

export default PopularPost;
