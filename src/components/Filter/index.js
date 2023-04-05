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
import FilterSidebar from "./FilterSidebar";
import Search from "./Search";
import "./index.css";


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

var isExists = false;
const Filter = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const searchedPosts = useSelector((state) => state.post.searchedPosts);

  const [filter, setFilter] = useState({
    ratings: "1",
  });

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        getSearchPosts({
          data: { category: selectedCategory, text: searchText },
        })
      );
    }
  }, [selectedCategory, searchText]);

  useEffect(() => {
    if (!searchParams.get("category")) {
      searchParams.set("category", "all");
      setSearchParams(searchParams, { replace: true });
    } else{
      setSelectedCategory(searchParams.get("category"));
    }
  }, [searchParams]);


  return (
    <Box sx={{ bgcolor: "background.primary" }}>
      <Header />
      
      <Container maxWidth={"xl"}    >
        <Box mb={5} className="detail-container">
          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}

          >
            <Grid item xs={12}>
              <Grid
                container
                justifyContent={"flex-end"}
                alignItems={"flex-end"}

              >
                <Grid item xs={12} md={4}>
                  <Search
                    sx={{
                      bgcolor: "background.secondary",
                    }}
                    selectValue={selectedCategory}
                    onSelectChange={(value) => {
                      searchParams.set("category", value);
                      setSelectedCategory(value);
                      setSearchParams(searchParams, { replace: true });
                      // setSearchParams({
                      //   pathname: "/search-results",
                      //   search: createSearchParams({
                      //     category: value,
                      //   }).toString(),
                      // });
                    }}
                    value={searchText}
                    onChange={setSearchText}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FilterSidebar filter={filter} setFilter={setFilter} />
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              sx={
                searchedPosts.length === 0
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
              <Stack direction={"row"} flexWrap={"wrap"} id="remove-scroll"
              sx={{ maxHeight: "700px", overflow: "auto" }}
              >
                <Posts
                  title=""
                  posts={searchedPosts}
                  noDataText="No results found"
                  isSearch={true}
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

export default Filter;
