import styled from "@emotion/styled";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRecommendedPosts } from "../../store/posts/postActions";
import {
  followUser,
  getProfile,
  getPublicProfile,
  unfollowUser,
} from "../../store/user/userActions";

import Paper from "@mui/material/Paper";
import Emp4 from "../../assets/emp4.png";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Twitter from "../../assets/twitter.png";
import Worldwide from "../../assets/worldwide.png";
import { getMyActivePosts } from "../../store/posts/postActions";

// import girl from '../../assets/girls.jpg'
// import game from '../assets/game.jpg'
import CardSM from "../../components/BlogCard";
import Header from "../../components/Header";
import Image from "../../components/Image";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d10882"),
  backgroundColor: "#d10882",
  "&:hover": {
    backgroundColor: "#d10882",
  },
}));
const useStyles = makeStyles({
  loginBtn: {
    position: "absolute !important",
    marginRight: "2% !important",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user.publicProfile);
  const profile = useSelector((state) => state.user.publicProfile);
  const loggedInUserId = useSelector((state) => state.user.profile?._id);
  const myBlogs = useSelector((state) => state.post.activePosts);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (params.userId) {
      dispatch(getMyActivePosts({ userId: params.userId }));
      dispatch(getPublicProfile({ userId: params.userId }));
    }
  }, [params]);

  useEffect(() => {
    dispatch(getProfile());
    // dispatch(getPostTypes());
    dispatch(getRecommendedPosts());
  }, []);

  return (
    <Box sx={{ bgcolor: "background.primary" }} minHeight={"100vh"}>
      <Header />
      <Container maxWidth={"xl"}>
        <Grid container spacing={2} padding={{ xs: 2, md: 5 }}>
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                height: {
                  xs: "100%",
                  md: "90vh",
                },
                boxShadow: 10,
                borderRadius: 4,
                bgcolor: "background.secondary",
              }}
            >
              <Grid
                container
                height={"100%"}
                justifyContent="center"
                alignItems={"center"}
              >
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      padding={2}
                    >
                      {profile.user_attachments.length > 0 ? (
                        <Image
                          file_name={profile.user_attachments[0].filename}
                        />
                      ) : (
                        <img src={Emp4} />
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      pl={10}
                      pr={10}
                    >
                      <Grid item xs={6}>
                        <Stack
                          spacing={2}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Typography
                            fontWeight={"bold"}
                            textTransform={"uppercase"}
                          >
                            {profile.first_name} {profile.last_name}
                          </Typography>
                          <Typography>{profile.email}</Typography>
                          {/* <Typography>{profile.categories}</Typography> */}

                          {/* <Typography>india</Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      padding={4}
                      spacing={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Stack>Social Media</Stack>
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        justifyContent={"center"}
                        spacing={2}
                      >
                        <img src={Facebook} width="10%" height="10%" />
                        <img src={Twitter} width="10%" height="10%" />
                        <img src={Instagram} width="10%" height="10%" />
                        <img src={Worldwide} width="10%" height="10%" />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "text.primary",
                  "&:hover": {
                    color: "secondary.dark",
                  },
                  fontWeight: "700",
                  fontSize: 40,
                }}
              >
                My Blogs
              </Typography>
              {loggedInUserId && loggedInUserId !== profile._id && (
                <Stack>
                  <Button
                    variant="contained"
                    color="secondary"
                    size={"large"}
                    sx={{
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: 10,
                      paddingY: 1,
                    }}
                    onClick={() => {
                      if (
                        profile.followers &&
                        profile.followers.some((u) => u._id == loggedInUserId)
                      ) {
                        dispatch(
                          unfollowUser({
                            userId: profile._id,
                          })
                        );
                      } else {
                        dispatch(
                          followUser({
                            userId: profile._id,
                          })
                        );
                      }
                    }}
                  >
                    {profile.followers &&
                    profile.followers.some((u) => u._id == loggedInUserId)
                      ? " Following"
                      : "Follow"}
                  </Button>
                </Stack>
              )}
            </Stack>
            <Stack
              id="remove-scroll"
              spacing={2}
              sx={{ maxHeight: "800px", overflow: "auto" }}
            >
              <Stack sx={{ rowGap: 2 }}>
                {myBlogs.map((post) => {
                  return <CardSM post={post} />;
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
