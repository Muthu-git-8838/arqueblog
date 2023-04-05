import {
  Card,
  Grid,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Image from "../Image";
import TypographyHTML from "../../common/TypographyHTML";
import { calculateStarCount } from "../../helpers/functions";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { addWishList, removeWishList } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import AutoStoriesIcon from '@mui/icons-material/RemoveRedEyeSharp';

export default function CardXS({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.user.profile.wishlist);
  return (
    <Card
      onClick={() => navigate(`/detail/${post._id}`)}
      sx={{
        p: 1,
        boxShadow: 0,

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
        <Grid item xs={4}>
          <Image
            file_name={post.category.image}
            style={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Stack height={"100%"} justifyContent={"center"}>
            <Stack direction={"row"} spacing={1}>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "info.light",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                {" "}
                {post.category.name}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                / {moment(post.createdAt).format("MMM DD YYYY")}
              </Typography>
            </Stack>
            <Typography
              className="post-title"
              sx={{
                textTransform: "capitalize",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
            >
              {post.title}
            </Typography>
            <TypographyHTML
              sx={{
                textTransform: "capitalize",
                fontSize: "13px",
                color: "text.secondary",
              }}
            >
              {post.description}
            </TypographyHTML>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
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
                   sx={{ color: "text.secondary" }}/>
              <Typography sx={{ fontSize: "13px", color: "text.secondary" }} display={"flex"}  justifyContent={"end"}>
                {post?.views_count || 0} 
              </Typography>
              </Stack>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={8}
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
        </Grid>
      </Grid>
    </Card>
  );
}
