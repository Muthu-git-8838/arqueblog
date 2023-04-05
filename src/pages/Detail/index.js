import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header";
import PopularPost from "../../components/PopularPost";
import PostDetail from "../../components/Post-detail";
import { getPost } from "../../store/posts/postActions";

const Detail = () => {
  const dispatch = useDispatch();
  const currentViewedPost = useSelector(
    (state) => state.post.currentViewedPost.post
  );
  const params = useParams();
  console.log("s-s-s>>>>>>>>>pramrmr>>>", params);
  useEffect(() => {
    if (params.postId) {
      dispatch(getPost({ post_id: params.postId }));
    }
  }, [params.postId]);
  return (
    <>
      <Box bgcolor={"background.secondary"}>
        <Header />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PostDetail post={currentViewedPost} />
            </Grid>
            {/* <Grid item xs={12} md={3} display={{ xs: "none", md: "block" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mt: 3,
                  py: 2,
                  fontSize: "24px",
                  color: "text.primary",
                }}
              >
                Similar blogs
              </Typography>
              <PopularPost posts={similarPosts} />
            </Grid> */}
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Detail;
