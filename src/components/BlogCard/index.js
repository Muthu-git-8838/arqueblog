import { Avatar, Button, Card, Grid, Stack, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import watch from "../../assets/watch.jpg";
import CardMD from "./CardMD";
import CardLG from "./CardLG";
import CardSM from "./CardSM";
import "./index.css";
import CardXS from "./CardXS";

export default function BlogCard(props) {
  return props.type === "lg" ? (
    <CardLG {...props} />
  ) : props.type === "md" ? (
    <CardMD {...props} />
  ) : props.type === "xs" ? (
    <CardXS {...props} />
  ) : (
    <CardSM {...props} />
  );
}
