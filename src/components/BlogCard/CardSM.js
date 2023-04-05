import {
  Avatar,
  Button,
  IconButton,
  Card,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import watch from "../../assets/watch.jpg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Image from "../Image";
import { calculateStarCount } from "../../helpers/functions";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { addWishList, removeWishList } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import UserAvatar from "../../common/UserAvatar";
import AutoStoriesIcon from "@mui/icons-material/RemoveRedEyeSharp";

export default function CardSM({ post }) {
  console.log("S-s-s>>>posttt>>>>>>", post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.user.profile.wishlist);
  return post ? (
    <Card
      sx={{
        p: 2,
        boxShadow: 5,
        borderRadius: 4,
        bgcolor: "background.secondary",

        "&:hover": {
          elevation: 1,
          boxShadow: "4px 40px 60px 2px rgba(12, 5, 62, 0.15)",
          border: "none",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} display={{ xs: "block", md: "none" }}>
          <Image
            file_name={post.category.image}
            // style={{ width: "100%", borderRadius: 10 }}
            onClick={() => navigate(`/detail/${post._id}`)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack>
            <Box onClick={() => navigate(`/detail/${post._id}`)}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  maxWidth: "80px",
                  borderRadius: 10,
                }}
              >
                {post.category.name}
              </Button>
              <Typography
                sx={{
                  fontWeight: 600,
                  mt: 1,
                  textTransform: "capitalize",
                  cursor: "pointer",
                  color: "text.primary",
                  "&:hover": {
                    color: "secondary.dark",
                  },
                }}
              >
                {post.title}
              </Typography>
              <Stack direction={"row"} spacing={2} my={1}>
                <UserAvatar
                  src={
                    post.posted_by.user_attachments &&
                    post.posted_by.user_attachments.length > 0 &&
                    post.posted_by.user_attachments[0].filename
                  }
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
                  <Typography sx={{ fontSize: "13px", color: "#676767" }}>
                    {moment(post.createdAt).fromNow()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Stack
              mt={1}
              direction={"row"}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Stack direction={"row"} spacing={2}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    sx={{
                      borderRadius: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <StarBorderIcon />{" "}
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "text.secondary",
                      }}
                    >
                      {calculateStarCount(post.reviews || [])}
                    </Typography>
                  </Button>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    sx={{ gap: 1, borderRadius: 10 }}
                    onClick={() => navigate(`/detail/${post._id}`)}
                  >
                    <SmsOutlinedIcon
                      size="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography
                      sx={{ fontSize: "14px", color: "text.secondary" }}
                    >
                      {post.reviews.length}
                    </Typography>
                  </Button>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AutoStoriesIcon
                      size="small"
                      sx={{ color: "text.secondary" }}
                    />
                    <Typography
                      sx={{ fontSize: "13px", color: "text.secondary" }}
                      display={"flex"}
                      justifyContent={"end"}
                    >
                      {post?.views_count || 0}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {wishlist.includes(post._id) ? (
                  <IconButton
                    sx={{ color: "#f43397" }}
                    onClick={() => {
                      dispatch(removeWishList({ postId: post._id }));
                    }}
                    aria-label="remove to favorites"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      dispatch(addWishList({ postId: post._id }));
                    }}
                    aria-label="add to favorites"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid
          item
          sx={12}
          md={4}
          display={{ xs: "none", md: "block" }}
          onClick={() => navigate(`/detail/${post._id}`)}
        >
          <Image
            file_name={post.category.image}
            height={"150"}
            // style={{ width: "100%", height: "170px", borderRadius: 10 }}
          />
        </Grid>
      </Grid>
    </Card>
  ) : null;
}
