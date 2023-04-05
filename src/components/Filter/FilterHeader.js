import React from "react";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/images/logo.png";
import { Paper, Grid, Card, Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#9c27b0 !important",
    maxHeight: "15px",
    height: "64px",
  },
});
const FilterHeader = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }} bgcolor="#fff" mt={6} pb={4}>
        <AppBar position="fixed" className={classes.header}></AppBar>
        <Grid container>
          <Grid item xs={12} md={2.5}>
            <Card sx={{ width: "fit-content" }} className="logo-image-card">
              <img
                className="logo-img-padding"
                src={logo}
                alt={"Logo"}
                loading="lazy"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: "100%", md: "50%" },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                aria-label="search"
                bgcolor=""
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilterHeader;
