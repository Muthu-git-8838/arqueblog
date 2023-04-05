import { Grid, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../BlogCard";

const Recommended = ({posts=[]}) => {
  const navigate = useNavigate();
  return (
    <Box py={5}>
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
                Popular blogs
              </Typography>
              <Typography
                sx={{
                  color: "#999",
                  fontSize: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    color: "secondary.dark",
                  },
                }}
                onClick={() => navigate(`/popular`)}
              >
                View all
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            {posts.length > 0 && (
              <BlogCard post={posts[0]} type={"lg"} />
            )}
          </Grid>
          <Grid item xs={12} md={6} height={{md:'670px', xs:'100%'}} overflow={'scroll'}>
            <Stack sx={{ rowGap: 2 }} >
              {posts.map((post, i) => {
                return i>0 && <BlogCard post={post} />;
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Recommended;
