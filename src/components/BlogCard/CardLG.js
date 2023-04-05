import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import girl from "../../assets/girls.jpg";
import TypographyHTML from "../../common/TypographyHTML";
import moment from "moment";
import Image from "../Image";
import { calculateStarCount } from "../../helpers/functions";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { addWishList, removeWishList } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "../../common/UserAvatar";
import AutoStoriesIcon from "@mui/icons-material/RemoveRedEyeSharp";

export default function CardLG({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.user.profile.wishlist);
  return (
    <Card
      sx={{
        boxShadow: 5,
        borderRadius: 4,
        height: "100%",
        bgcolor: "background.secondary",
        "&:hover": {
          elevation: 1,
          boxShadow: "4px 40px 60px 2px rgba(12, 5, 62, 0.15)",
          border: "none",
        },
      }}
    >
      <Stack p={2} height={"98%"} justifyContent={"space-around"}>
        <Box onClick={() => navigate(`/detail/${post._id}`)}>
          <Image file_name={post.category.image} height={"300"} />
          <Stack>
            {/* <Button variant='contained' color='secondary' size='small' sx={{ fontWeight: 600, textTransform: 'none', maxWidth: "85px", borderRadius: 10 }}>Electronics</Button> */}
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "1.5rem",
                fontWeight: "800",
                cursor: "pointer",
                mt: 2,
              }}
            >
              {post.title}
            </Typography>
            <Typography
              fontSize={"15px"}
              color="text.primary"
              className="paragraph"
              pt={1}
            >
              <TypographyHTML
                sx={{ color: "text.secondary", cursor: "pointer" }}
              >
                {post.description}
              </TypographyHTML>
            </Typography>
          </Stack>
        </Box>
        <Box>
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
              <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
                {moment(post.createdAt).fromNow()}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            // mt={1}
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
                <Button sx={{ gap: 1, borderRadius: 10 }}>
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
              direction={"column"}
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
        </Box>
      </Stack>
    </Card>
  );
}
