import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
// import HomeImg from "../../assets/offer.webp";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import childImg from "../../assets/child.jpg";
import Button from "@mui/material/Button";
import { display } from "@mui/system";
// import Tick from "../../assets/discount.png";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import product from "../../temp/product";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
// import SerciceCard from "../Cards/Service";
import { useSelector } from "react-redux";
import BlogCard from "../BlogCard/index";
// import Recent from "../Recent";

const styles = {
  heroContainer: {
    // backgroundImage: `url(${HomeImg})`,
    backgroundRepeat: "no-repeat",
  },
  lowestText: {
    fontSize: "38px",
    fontWeight: "bold",
  },
  containerSize: {
    background: "rgb(249, 249, 249)",
    maxHeight: "342px",
  },
  lowestTextAlign: {
    padding: "3em",
  },
  productStack: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "8px",
    marginTop: "28px",
    padding: "9px 16px",
  },
  productsText: {
    color: " rgb(102, 102, 102)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
  },
  productTxt: {
    color: "rgb(51, 51, 51)",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "xx-large",
    // textAlign: "center",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'space-around'
  },
  productDescription: {
    color: "rgb(153, 153, 153)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px !important",
    lineHeight: "20px",
    margin: "0px",
    padding: "0px",
  },
  rate: {
    color: "rgb(51, 51, 51)",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px !important",
    lineHeight: "32px",
    margin: "0px",
    padding: "0px",
    fontSize: "24px",
  },
  oldrate: {
    color: "rgb(153, 153, 153)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px !important",
    lineHeight: "32px",
    margin: "0px 8px",
    padding: "0px",
    textDecoration: "line-through",
    fontSize: "16px",
  },

  offers: {
    color: "rgb(3, 141, 99)",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px !important",
    lineHeight: "32px",
    margin: "0px 8px",
    padding: "0px",
    fontSize: "16px",
    // textDecoration: 'line-through'
  },
  discount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
  },
  freeDelivery: {
    backgroundColor: "rgb(249, 249, 249)",
    color: "rgb(102, 102, 102)",
    borderRadius: "4px 8px",
    padding: "14px",
    borderRadius: "48px",
    textTransform: "unset",
    width: "50%",
    height: "40px",
  },

  reviewBtn: {
    backgroundColor: "rgb(3, 141, 99)",
    color: "rgb(255, 255, 255)",
    borderRadius: "4px 8px",
    padding: "4px 8px",
    borderRadius: "16px",
    textTransform: "unset",
    width: "24%",
    height: "34px",
    display: "inline-flex",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "16px",
  },
  reviewBtnAlign: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  moreTxt: {
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
  },
  moreTxtBg: {
    color: "rgb(153, 153, 153)",
  },
  reviewsColor: {
    color: "rgb(153, 153, 153)",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "16px",
    // margin: 0px;
  },
  cardSize: {
    // minHeight: '320px',
    // width: "23%",
    // margin: "1%",
  },
  prodectDescription: {
    fontSize: "16px",
  },
};

export default function Posts({
  posts = [],
  title = "Popular Blogs ",
  noDataText = "",
  isSearch = false,
}) {
  return (
    <>
      <Container maxWidth="xl">
        <Stack container pt={title ? 0 : 0}>
          {title && (
            <Typography m={2} mt={1} mb={2} style={styles.productTxt}>
              {title}
            </Typography>
          )}
          <Stack direction={"row"} flexWrap={"wrap"}>
            {isSearch ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  {/* <Grid container rowGap={2} > */}
                  <Stack spacing={2}>
                    {posts &&
                      posts.length > 0 &&
                      posts.map((post, i) => {
                        return <BlogCard type={"sm"} post={post} />;
                      })}
                  </Stack>
                  {/* </Grid> */}
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Grid container rowGap={2}>
                    {posts &&
                      posts.length > 0 &&
                      posts.map((post, i) => {
                        return <BlogCard type={"sm"} post={post} />
                      }) }
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Stack>
          <Stack>
            {posts && posts.length === 0 && (
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={2} justifyContent="center">
                  <Typography textAlign="center">{noDataText}</Typography>
                  <Box sx={{ width: 300 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </Stack>
              </Box>
            )}
          </Stack>
          {/* {posts && posts.length > 0 && (
            <Stack m={1} mb={0} alignItems={"flex-end"}>
              <Button
                style={{
                  color: "#9c27b0",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                View more...
              </Button>
            </Stack>
          )} */}
        </Stack>
      </Container>
    </>
  );
}
