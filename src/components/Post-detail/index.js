import {
  Avatar,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  Button,Card, IconButton,
  Rating,
} from "@mui/material";
import { useQuill } from "react-quilljs";
import React, { useContext, useState, useEffect } from "react";
import man from "../../assets/emp4.png";
import girl from "../../assets/girls.jpg";
import watch from "../../assets/watch.jpg";
import "quill/dist/quill.snow.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Validate } from "../../helpers/functions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import TypographyHTML from "../../common/TypographyHTML";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import moment from "moment";
import Image from "../Image";
import * as yup from "yup";
import apiRequest from "../../services/auth";
import Carousel from "react-multi-carousel";
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "../../store/posts/postActions";
import { Container } from "@mui/system";
import { ColorModeContext } from "../Context";
import UserAvatar from "../../common/UserAvatar";
import Posts from "../../components/Getanswers/index";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import { calculateStarCount } from "../../helpers/functions";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AutoStoriesIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { addWishList, removeWishList } from "../../store/user/userActions";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
let postSchema = yup.object().shape({
  title: yup.string().label("Title").required(),
  description: yup.string().label("Content").required(),
  category: yup.string().label("Category").required(),
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostDetail = ({ post = null }) => {
  const similarPosts = useSelector((state) => state.post.similarPosts);
  const profile = useSelector((state) => state.user.profile);
  const { quill, quillRef } = useQuill({ placeholder: "Write your Answer..." });
  const themeMode = useSelector((state) => state.common.themeMode);
  const categories = useSelector((state) => state.common.categories);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => window.location.reload();
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ path: null });
  const wishlist = useSelector((state) => state.user.profile.wishlist);
  const currentViewedPost = useSelector(
    (state) => state.post.currentViewedPost.post
  );
  const [Info, setInfo] = useState({
    title: "",
    description: "",
    descriptionHTML: "",
    category: "",
    post_type: "blog",
    parent_id: "",
  });
  
  const [posts, setPosts] = useState([]);
  console.log("<<<<<<<<<<getpost>>>>>>>", posts);
  const onPost = async () => {
    let error = await Validate(postSchema, Info);
    setError(error);
    if (error) return;
    setLoading(true);
    const { password, ...restData } = Info;

    const response = await apiRequest({
      url: "post/create",
      method: "POST",
      data: restData,
    });
    console.log(">>>>>>>.siva", Info);
    setLoading(false);
    if (response.success) {
      setInfo({
        ...Info,
        title: "",
        description: "",
        descriptionHTML: "",
        category: "",
        post_type: "blog",
        parent_id: "",
      });
      handleClose();
      window.location.reload();
    }
  };

  const getAllPosts = async () => {
    const response = await apiRequest({
      url: `post/get/byid/${params.postId}`,
      method: "GET",
      // data
    });
    console.log("s--s>>>>rajesh123>>>>>>>>>", response);
    if (response.success) {
      setPosts(response.data);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const params = useParams();
  console.log("s--s>>>>rajes>>>>>>>>>", params);
  const [reviewData, setReviewData] = useState({
    review: "",
    starCount: 1,
  });
  console.log("s--s>>>>rajesh>>>>>>>>>", params);
  const addReview = () => {
    dispatch(
      createReview({
        data: {
          ...reviewData,
          post: params.postId,
        },

        cb: () => {
          setReviewData({
            starCount: 1,
            review: "",
          });
        },
      })
    );
  };

  React.useEffect(() => {
    console.log("trrrrrrrrr", Object.keys(Info).length === 0);
    if (quill) {
      quill.on("text-change", () => {
        console.log("===..........", quill.getText());
        console.log(quillRef.current.firstChild.innerHTML);
        setInfo({
          ...Info,
          description: quill.getText(),
          descriptionHTML: quillRef.current.firstChild.innerHTML,
          category: currentViewedPost.category._id,
          title: currentViewedPost.title,
          parent_id: currentViewedPost._id,
        });
      });
    }
  }, [quill, Info]);

  return post ? (
    <>
      {currentViewedPost.post_type.type === "blog" ? (
        <Typography>
          <Box
            className="detail"
            sx={{ border: "1px solid border" }}
            mb={3}
            b
            p={{ xs: 1, mt: 5 }}
          >
            {/* order='1px solid #efefef' */}
            <Grid
              container
              mt={5}
              sx={{ color: "text.primary" }}
              className="detail-container"
            >
              <Grid xs={12}>
                <Stack>
                  <Typography className="title" sx={{ color: "text.primary" }}>
                    {post.title}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={2}
                  my={1}
                  sx={{ color: "text.primary" }}
                >
                 
                  <UserAvatar
              src={post.posted_by.user_attachments && post.posted_by.user_attachments.length>0 && post.posted_by.user_attachments[0].filename}
              userId={post.posted_by._id}
              text={post.posted_by.first_name}
            />
                  <Stack>
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {post.posted_by.first_name} {post.posted_by.last_name}
                    </Typography>
                    <Typography sx={{ fontSize: "13px" }}>
                      {moment(post.createdAt).fromNow()}
                    </Typography>
                  </Stack>
                </Stack>
                {/* <Stack sx={{ p: 2 }}>
            <img src={girl} style={{ width: "100%" }} />
          </Stack> */}
                <Stack my={{ xs: 0, md: 3 }}>
                  <Container>
                    <TypographyHTML
                      className="dynamic-content-html"
                      short={false}
                      sx={
                        themeMode === "dark"
                          ? {
                              color: "#fff !important",
                              backgroundColor: "transparent !important",
                              "& span": {
                                color: "#fff !important",
                                backgroundColor: "transparent !important",
                              },
                              "& strong": {
                                color: "#fff !important",
                                backgroundColor: "transparent !important",
                              },
                            }
                          : {}
                      }
                    >
                      {post.descriptionHTML}
                    </TypographyHTML>
                  </Container>
                </Stack>
                <Divider sx={{ border: "1px solid #efefef", my: 3 }} />
                {/* <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Stack>
              <Avatar src={man} sx={{ width: "70px", height: "70px" }} />
            </Stack>
            <Stack>
              <Typography className="name">
                <span style={{ fontWeight: 100 }}>By:</span>IW STUDIO
              </Typography>
              <Typography className="user-detail">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </Typography>
            </Stack>
          </Stack> */}
              </Grid>
              <Grid xs={12} my={2}>
                <Accordion sx={{ bgcolor: "transparent" }} expanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      Rating & reviews
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack px={{ xs: 1, md: 5 }} spacing={2}>
                      <Rating
                        name="simple-controlled"
                        value={reviewData.starCount}
                        onChange={(event, newValue) => {
                          setReviewData({
                            ...reviewData,
                            starCount: newValue,
                          });
                        }}
                      />

                      <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                          Write Your review
                        </InputLabel>
                        <Input
                          id="input-with-icon-adornment"
                          value={reviewData.review}
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                          onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === "Enter") {
                              // Do code here
                              ev.preventDefault();
                              addReview();
                            }
                          }}
                          onChange={(e) => {
                            setReviewData({
                              ...reviewData,
                              review: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                    </Stack>

                    <Stack p={{ xs: 1, md: 5 }}>
                      <Stack>
                        <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                          {post.reviews.length} reviews
                        </Typography>
                      </Stack>
                      {post.reviews.map((review) => {
                        return (
                          <Stack direction={"row"} spacing={2} my={1}>
                            <UserAvatar
                              src={
                                review.reviewed_by.user_attachments[0].filename
                              }
                              userId={review.reviewed_by._id}
                              text={review.reviewed_by.first_name}
                            />
                            <Stack>
                              <Typography
                                sx={{
                                  textTransform: "capitalize",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {review.reviewed_by.first_name}{" "}
                                {review.reviewed_by.last_name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  color: "text.disabled",
                                }}
                              >
                                {moment(review.createdAt).fromNow()}
                              </Typography>

                              <Stack mt={1} spacing={1}>
                                <Rating
                                  name="read-only"
                                  value={review.starCount}
                                  readOnly
                                />
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    color: "text.disabled",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {review.review}
                                </Typography>
                                <Stack
                                  mt={1}
                                  direction={"row"}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {/* <Stack direction={"row"} spacing={2}>
                          <Stack
                            direction={"row"}
                            spacing={1}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Stack direction={"row"} spacing={1}>
                              <FavoriteBorderIcon
                                size="small"
                                sx={{ color: "text.disabled" }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "text.disabled",
                                }}
                              >
                                19
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack direction={"row"} spacing={1}>
                            <Stack direction={"row"} spacing={1}>
                              <SmsOutlinedIcon
                                size="small"
                                sx={{ color: "text.disabled" }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "text.disabled",
                                }}
                              >
                                Replay
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack> */}
                                </Stack>
                              </Stack>
                            </Stack>
                          </Stack>
                        );
                      })}
                      {/* <Stack mt={2}>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      Replay
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Stack> */}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid xs={12}>
                <Typography my={3} sx={{ fontWeight: 600 }}>
                  Related Posts
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Carousel
                      autoPlay={true}
                      removeArrowOnDeviceType="mobile"
                      responsive={responsive}
                      style={{ bgcolor: "background.secondary" }}
                    >
                      {similarPosts.map((post) => {
                        return (
                          <Box
                            p={3}
                            m={2}
                            sx={{ border: "1px solid #d3d3d330" }}
                            onClick={() => navigate(`/detail/${post._id}`)}
                          >
                            <Image file_name={post.category.image} />
                            <Stack rowGap={1} mt={2}>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "secondary.dark",
                                  },
                                }}
                              >
                                {post.title}
                              </Typography>
                              <Stack
                                direction={{ xs: "column", md: "row" }}
                                spacing={{ xs: 0, md: 2 }}
                              >
                                <Typography className="user-detail">
                                  {post.posted_by.first_name}{" "}
                                  {post.posted_by.last_name}
                                </Typography>
                                <Typography className="user-detail">
                                  {moment(post.createdAt).fromNow()}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        );
                      })}
                    </Carousel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Typography>
      ) : (
        <Typography>
          <Box
            className="detail"
            sx={{ border: "1px solid border" }}
            mb={3}
            b
            p={{ xs: 1, mt: 5 }}
          >
            {/* order='1px solid #efefef' */}
            <Grid
              container
              mt={5}
              sx={{ color: "text.primary" }}
              className="detail-container"
            >
              <Grid xs={12}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  my={1}
                  sx={{ color: "text.primary" }}
                >
                  <UserAvatar
                    src={post.posted_by.user_attachments[0].filename}
                    userId={post.posted_by._id}
                    text={post.posted_by.first_name}
                  />
                  <Stack>
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {post.posted_by.first_name} {post.posted_by.last_name}
                    </Typography>
                    <Typography sx={{ fontSize: "13px" }}>
                      {moment(post.createdAt).fromNow()}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  <Stack
                    direction={"row"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      className="title"
                      sx={{ color: "text.primary" }}
                    >
                      {post.title}
                    </Typography>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        textTransform: "none",
                        // maxWidth: "80px",
                        borderRadius: "10px",
                      }}
                      onClick={handleOpen}
                    >
                      Add Your Answer
                    </Button>
                  </Stack>
                  <Posts posts={posts.answers} onChange={getAllPosts} /> 
                </Stack>
              </Grid>

              {/* <Grid xs={12}>
                <Typography my={3} sx={{ fontWeight: 600 }}>
                  Related Posts
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Carousel
                      autoPlay={true}
                      removeArrowOnDeviceType="mobile"
                      responsive={responsive}
                      style={{ bgcolor: "background.secondary" }}
                    >
                      {similarPosts.map((post) => {
                        return (
                          <Box
                            p={3}
                            m={2}
                            sx={{ border: "1px solid #d3d3d330" }}
                            onClick={() => navigate(`/detail/${post._id}`)}
                          >
                            <Image file_name={post.category.image} />
                            <Stack rowGap={1} mt={2}>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "secondary.dark",
                                  },
                                }}
                              >
                                {post.title}
                              </Typography>
                              <Stack
                                direction={{ xs: "column", md: "row" }}
                                spacing={{ xs: 0, md: 2 }}
                              >
                                <Typography className="user-detail">
                                  {post.posted_by.first_name}{" "}
                                  {post.posted_by.last_name}
                                </Typography>
                                <Typography className="user-detail">
                                  {moment(post.createdAt).fromNow()}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        );
                      })}
                    </Carousel>
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
            
            
            
          </Box>
          
          <Grid>
            <Modal
              //  hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 500, height: "500px" }}>
            
                <Container>
                  <Grid container>
                    <Grid item xs={12} >
                      <Stack direction={"row"} justifyContent={"flex-end"}>
                        <Button
                          disabled={!Info.description}
                          variant="contained"
                          onClick={onPost}
                          size="large"
                          // sx={{
                          //   fontWeight: 600,
                          //   textTransform: "none",
                          //   maxWidth: "120px",
                          // }}
                          endIcon={<SendIcon />}
                          //   onClick={handleOpen}
                        >
                          Post
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} pt={5}>
                      <div
                        style={{
                          backgroundColor: "white",
                          width: "100%",
                          minHeight: "40vh",
                          border: "none",
                        }}
                      >
                        <div
                          ref={quillRef}
                          style={{ height: "300px", overflow: "auto"}}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Modal>
            
          </Grid>
        </Typography>
      )}
    </>
  ) : null;
};

export default PostDetail;
