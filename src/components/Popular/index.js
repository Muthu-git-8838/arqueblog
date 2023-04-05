import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/footer";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// import discount from "../../assets/home/discount.png";
// import logo from "../../assets/images/logo.png";
import { getSearchPosts } from "../../store/posts/postActions";
// import Footer from "../footer/Footer";
// import HomeFooder from "../footer/HomeFooter";
import Header from "../../components/Header";
import Posts from "../Posts";
import FilterSidebar from "../Filter/FilterSidebar";
import Search from "../Filter/Search";
import "./index.css";
import RecommendedBlogs from "../../components/Recommended";
import {
  getRecommendedPosts,
} from "../../store/posts/postActions";

const USERS = [
  {
    price: "₹1296",
    name: "Addidas",
    // img: require("../../assets/shoe/shoe1.webp"),
    ratings: "4.5",
  },
  {
    price: "₹900",
    name: "Nike",
    // img: require("../../assets/shoe/shoe2.webp"),
    ratings: "3.5",
  },
  {
    price: "₹2000",
    name: "Puma",
    // img: require("../../assets/shoe/shoe5.webp"),
    ratings: "2.7",
  },
  {
    price: "₹3296",
    name: "Sparx",
    // img: require("../../assets/shoe/shoe3.webp"),
    ratings: "4.3",
  },
  {
    price: "₹4296",
    name: "Asian",
    // img: require("../../assets/shoe/shoe4.webp"),
    ratings: "1.8",
  },
];
const useStyles = makeStyles({
  header: {
    backgroundColor: "#9c27b0 !important",
    maxHeight: "15px",
    height: "64px",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d10882"),
  backgroundColor: "#d10882",
  "&:hover": {
    backgroundColor: "#d10882",
  },
}));

const Popular = () => {
  const recommendedPosts = useSelector((state) => state.post.recommendedPosts);

  return (
    <Box sx={{ bgcolor: "background.primary" }}>
      <Header />
      
      <Container maxWidth={"xl"}    >
        <Box mb={5} className="detail-container">
          <Grid container spacing={1} pt={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
              }}
            >
              <Stack direction={"row"} flexWrap={"wrap"} id="remove-scroll"
              sx={{ maxHeight: "770px", overflow: "auto" }}
              >
                <Posts
                  posts={recommendedPosts}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Popular;
