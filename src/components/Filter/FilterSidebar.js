import { Box } from "@mui/system";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Grid,
  FormControl,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  Checkbox,
} from "@mui/material";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// import discount from "../../assets/home/discount.png";
// import logo from "../../assets/images/logo.png";
// import { getSearchPosts } from "../../store/posts/postActions";
// import Footer from "../footer/Footer";
// import HomeFooder from "../footer/HomeFooter";
// import Header from "../Header_2";
// import Posts from "../Posts";
// import Search from "./Search";

const useStyles = makeStyles({
  textField: {
    color: "white !important",
    background: "white",
    borderRadius: "3px !important",
    border: "unset",
  },
  textFieldWidth: {
    width: "100% !important",
  },
  cardView: {
    background: "#2a7fb8 !important",
    boxShadow: "0px -27px 1px 17px rgba(209,227,241,1) !important",
    borderRadius: "16px !important",
  },
  contentStyle: {
    color: "#000 !important",
  },
  radio: {
    "&$checked": {
      color: "#4B8DF8",
    },
  },
  checked: {},
  selectMenuItemMultiple: {
    backgroundColor: "#9c27b0",
    color: "#fff",
  },
});
const FilterSidebar = ({ filter, setFilter }) => {
  const classes = useStyles();
  const [isPPchecked, setIsPPchecked] = useState(false);
  const [error, setError] = useState({ path: null });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.secondary",
        }}
      >
        <Accordion
              defaultExpanded={true}
              sx={{
            bgcolor: "background.secondary",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                textTransform: " uppercase",
                letterSpacing: ".3px",
              }}
            >
              Filter
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Accordion
              defaultExpanded={true}
              sx={{
                bgcolor: "background.secondary",
              }}
            >
               <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    textTransform: " uppercase",
                    letterSpacing: ".3px",
                  }}
                >
                  Categories
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "background.secondary",
                }}
              >
                {categories.map((e) => (
                  <Stack p={1}>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      display={"flex"}
                      alignItems={"center"}
                      onClick={() =>
                        navigate(`/search-results?category=${e._id}`,{
                          replace: true
                        })
                      }
                    >
                      <Stack sx={{ rowGap: 1 }}>
                        <Button >{e.name}</Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </AccordionDetails>
            </Accordion>
            {/* <Accordion
              defaultExpanded={true}
              sx={{
                bgcolor: "background.secondary",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    textTransform: " uppercase",
                    letterSpacing: ".3px",
                  }}
                >
                  Customer Ratings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  onClick={() =>
                    setFilter({
                      ...filter,
                      ratings: filter.ratings === "4" ? "1" : "4",
                    })
                  }
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Checkbox checked={filter.ratings === "4"} />
                  <Typography> 4★ & above</Typography>
                </Stack>
                <Stack
                  onClick={() =>
                    setFilter({
                      ...filter,
                      ratings: filter.ratings === "3" ? "1" : "3",
                    })
                  }
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Checkbox checked={filter.ratings === "3"} />
                  <Typography> 3★ & above</Typography>
                </Stack>
                <Stack
                  onClick={() =>
                    setFilter({
                      ...filter,
                      ratings: filter.ratings === "2" ? "1" : "2",
                    })
                  }
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Checkbox checked={filter.ratings === "2"} />
                  <Typography> 2★ & above</Typography>
                </Stack>
                <Stack
                  onClick={() =>
                    setFilter({
                      ...filter,
                      ratings: filter.ratings === "1" ? "1" : "",
                    })
                  }
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Checkbox checked={filter.ratings === "0"} />
                  <Typography> 1★ & above</Typography>
                </Stack>
              </AccordionDetails>
            </Accordion> */}
            {/* <Accordion sx={{ boxShadow: "none" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography sx={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    textTransform: " uppercase",
                                    letterSpacing: ".3px"
                                }}>Brand</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography> Puma</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography> Addidas</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Nike</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Sparx</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography> ASIAN</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Campus</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Reebook</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion> */}
            {/* <Accordion sx={{ boxShadow: "none" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    textTransform: " uppercase",
                                    letterSpacing: ".3px"
                                }}>Gender</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography> Men</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Women</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Kids</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion> */}
            {/* <Accordion sx={{ boxShadow: "none" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    textTransform: " uppercase",
                                    letterSpacing: ".3px"
                                }}>Metriyal</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Beaded</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Canvas</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Cotton</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Denim</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Faux Fur</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox />
                                    <Typography>Felt</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion> */}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default FilterSidebar;
