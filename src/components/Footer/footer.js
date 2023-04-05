import { Grid, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import "./index.css";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MapSharpIcon from "@mui/icons-material/MapSharp";

const Footer = () => {
  return (
    <Box  sx={{ bgcolor: "background.primary" }}>
      <Container>
        <Box  py={3}>
          <Typography textAlign={"center"} color={"text.primary"}>
            All Rights Reserved by Elon Native Systems © 2023
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
