import { Typography } from "@mui/material";
import React from "react";

const trimLength = 30;

export default function TypographyHTML({
  children,
  element = "p",
  className = "",
  short = true,
  ...restProps
}) {
  const text = children;
  return short ? (
    <Typography {...restProps}>
      {/* {text.length > trimLength ? text.substring(0, trimLength) + "..." : text} */}
    </Typography>
  ) : (
    <Typography
      className={className}
      {...restProps}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
