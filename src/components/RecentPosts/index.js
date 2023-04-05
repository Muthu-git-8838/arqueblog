import { Grid, Stack, Card, Typography, Divider } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import BlogCard from "../BlogCard";

const RecentPosts = ({ posts = [] }) => {
  console.log("S-s-s/.............posts..", posts);
  return (
    posts.length > 0 && (
      <Box>
        <Container maxWidth="xl">
          {/* <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            my: 2,
            color: "text.primary",
          }}
        >
          
        </Typography> */}

          <Grid container spacing={2}>
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
                  Recently viewed blogs
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
            {posts.length > 0 && (
              <Grid item xs={12} md={4}>
                <BlogCard post={posts[0]} type={"md"} />
              </Grid>
            )}
            <Grid item xs={12} md={8}>
              <Card
                boxShadow={0}
                
                sx={{ p: 3, borderRadius: 3, bgcolor: "background.secondary" ,overflow:'scroll' ,height:{ md: "530px", xs: "100%" }}}
              >
                <Grid container spacing={2} direction={"row"} flexWrap={"wrap"}>
                  {posts.map((post) => {
                    return (
                      <Grid item xs={12} md={6}>
                        <BlogCard post={post} type={"xs"} />
                        <Divider
                          sx={{ my: 1, borderBottom: "2px solid divider" }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  );
};

export default RecentPosts;
