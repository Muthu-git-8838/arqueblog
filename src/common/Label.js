import { Typography } from "@mui/material";
import React from "react";

export default function Label(props) {
  return (
    <Typography
      sx={{
        fontSize: 17,
        paddingTop: 1,
        paddingBottom: 1,
        textAlign: "left",
        fontWeight: "500",
        ...props.labelStyle,
      }}
    >
      {props.label}
    </Typography>
  );
}

Label.defaultProps = {
  labelStyle: {},
};
