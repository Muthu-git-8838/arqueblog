import { Avatar, Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, FILE_SERVER } from "../../constants/portConstants";
import imageErrorSrc from "../../assets/NA-image.png";

const Image = ({
  width = "100%",
  height = "150",
  file_name,
  isAvatar = false,
  ...restProps
}) => {
  return isAvatar ? (
    <Avatar src={`${FILE_SERVER}/${file_name}`} />
  ) : (
    <Box p={1}>
       <img
      width={width}
      height={height}
      src={`${FILE_SERVER}/${file_name}`}
      alt={file_name || null}
      style={{objectFit:'contain'}}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = imageErrorSrc;
      }}
      {...restProps}
    />
    </Box>
  );
};

export default Image;
