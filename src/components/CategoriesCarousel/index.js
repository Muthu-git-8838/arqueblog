import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import "./index.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "@mui/system";
import Image from "../Image";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const itemData = [
  {
    img: require("../../assets/cars.jpg"),
    title: "Technology",
    sub: "Review of New porsche Cars",
  },
  {
    img: require("../../assets/girls.jpg"),
    title: "Fashion",
    sub: "How lovely yellow is! It stands for the sun",
  },
  {
    img: require("../../assets/watch.jpg"),
    title: "Tech",
    sub: "Review of New porsche Cars",
  },
  {
    img: require("../../assets/food.jpg"),
    title: "Food",
    sub: "Review of New porsche Cars",
  },
  {
    img: require("../../assets/car2.jpg"),
    title: "Technology",
    sub: "Review of New porsche Cars",
  },
];
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

const CategoriesCarousel = () => {
  const categories = useSelector((state) => state.common.categories);
  const navigate = useNavigate();

  return (
    <Box className={"CategoriesCarousel"} mt={2}>
      <Container maxWidth="xl" sx={{ bgcolor: "background.secondary" }}>
        <Carousel
          autoPlay={true}
          removeArrowOnDeviceType="mobile"
          responsive={responsive}
          style={{ bgcolor: "background.secondary" }}
        >
          {categories.map((category) => (
            <Stack p={2}>
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                alignItems={"center"}
                onClick={() =>
                  navigate(`/search-results?category=${category._id}`)
                }
              >
                <Stack>
                  <Image
                    width="70"
                    height="70"
                    isStatic={true}
                    file_name={category.image}
                  />{" "}
                  {/* <Image
                          file_name={category.image[0]}
                        /> */}
                </Stack>

                <Stack sx={{ rowGap: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                    {category.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                      color: "text.primary",
                    }}
                  >
                    {category.description}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default CategoriesCarousel;
