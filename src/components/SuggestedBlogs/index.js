import { Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import BlogCard from "../BlogCard";
import MoreSuggestedBlogs from "../MoreSuggestedBlogs";
import "./index.css";

const SuggestedBlogs = ({ posts = [] }) => {
  const navigate = useNavigate();
  return (
    posts.length > 0 && (
      <Box mb={2}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack
                justifyContent={"space-between"}
                alignItems={"center"}
                display={"flex"}
                direction={"row"}
              >
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Suggested blogs
                </Typography>

                {/* <Typography
                  sx={{
                    color: "#999",
                    fontSize: "10px",
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      color: "secondary.dark",
                    },
                  }}
                >
                  View all
                </Typography> */}
              </Stack>
            </Grid>
            {posts.map((post, i) => {
              return (
                i < 2 && (
                  <Grid item xs={12} md={4}>
                    <BlogCard post={post} type={"md"} />
                  </Grid>
                )
              );
            })}
            <Grid
              item
              xs={12}
              md={4}
              height={{ md: "530px", xs: "100%" }}
              overflow={"scroll"}
            >
              <MoreSuggestedBlogs posts={posts} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  );
};

export default SuggestedBlogs;
