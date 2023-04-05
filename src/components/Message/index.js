import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../Header";
import Skeleton from "@mui/material/Skeleton";

const Message = () => {
  return (
    <>
      <Box sx={{ bgcolor: "background.primary" }}>
        <Header />
        <Typography
          sx={{
            fontSize: "20px",
            color: "text.secondary",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          You Don't Have Any Messages
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Box width={300}>
            <Skeleton sx={{ color: "text.primary" }} animation="wave" />
            <Skeleton sx={{ color: "text.primary" }} animation="wave" />
            <Skeleton sx={{ color: "text.primary" }} animation="wave" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Message;
