import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";
import { Validate } from "../../helpers/functions";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import apiRequest from "../../services/auth";
import "./ForgotPassword.css";

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  "Password must have one upper case alphabet, one lower case alphabet, one digit & special character, Minimum eight in length";

let schema = yup.object().shape({
  password: yup
    .string()
    .matches(strongPasswordRegex, stringPassswordError)
    .required(),
  otp: yup.string().min(6).max(6).required(),
  username: yup.string().required(),
});

let schema1 = yup.object().shape({
  email: yup.string().email().required(),
});

const useStyles = makeStyles({
  textField: {
    // width: "100% !important",
    // color: "white !important",
    background: "white",
    borderRadius: "3px !important",
    border: "unset",
  },
  textFieldWidth: {
    width: "100% !important",
  },
  cardView: {
    background: "transparent !important",
    // boxShadow: "0px -27px 1px 17px rgba(209,227,241,1) !important",
    // borderRadius: "16px !important",
    // color: "#000",
    // maxWidth: "600px",
    // width: "80%",
    // height: "80%",
  },
  contentStyle: {
    color: "text.primary !important",
  },
});

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  width: "100%",
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  // width:'15%'
}));

export default function ForgotPassword({ setForgotPassword }) {
  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [level, setLevel] = useState(0);
  const [error, setError] = useState({ path: null });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { width, height } = useWindowDimensions();

  const navigate = useNavigate();
  const goToSignin = () => {
    setForgotPassword(false);
  };
  const handleSubmit = async () => {
    let error = await Validate(schema1, { email: data.email });
    setError(error);
    if (error) return;
    setLoading(true);
    const response = await apiRequest({
      url: "auth/forgot-password",
      method: "POST",
      data: {
        email: data.email,
      },
    });
    setLoading(false);

    if (response.success) {
      goToSignin();
    }
  };
  const classes = useStyles();
  return (
    <>
      <Card className={`${classes.cardView}`}>
        <CardContent>
          <Typography
            sx={{ fontSize: 20, fontWeight: 600, pl: 1 }}
            color="text.secondary"
            gutterBottom
            className={classes.contentStyle}
          >
            FORGOT PASSWORD
          </Typography>
          <Typography
            sx={{ fontSize: 13, pl: 1, opacity: 0.8 }}
            className={classes.contentStyle}
          >
            Please enter below required fields to change your password.
          </Typography>
          {level === 0 ? (
            <>
              <CardActions>
                <Typography
                  sx={{ fontSize: 14 }}
                  className={classes.contentStyle}
                >
                  Email
                </Typography>
              </CardActions>
              <CardActions>
                <TextField
                  fullWidth
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                  size="small"
                  id="filled-basic"
                  variant="filled"
                  label="&nbsp;Email"
                  className={classes.textField}
                  sx={{ color: "black" }}
                />
              </CardActions>
              <CardActions>
                {error.path === "username" && (
                  <Typography
                    style={{ color: "#a80505", fontWeight: "600" }}
                    sx={{ fontSize: 14 }}
                  >
                    {error.message}
                  </Typography>
                )}
              </CardActions>
            </>
          ) : (
            <>
              <CardActions>
                <Typography
                  sx={{ fontSize: 14 }}
                  className={classes.contentStyle}
                >
                  OTP
                </Typography>
              </CardActions>
              <CardActions>
                <TextField
                  value={data.otp}
                  onChange={(e) => {
                    setData({
                      ...data,
                      otp: e.target.value,
                    });
                  }}
                  size="small"
                  id="outlined-basic"
                  placeholder="OTP"
                  className={classes.textField}
                />
              </CardActions>
              <CardActions>
                {error.path === "otp" && (
                  <Typography
                    style={{ color: "#a80505", fontWeight: "600" }}
                    sx={{ fontSize: 14 }}
                  >
                    {error.message}
                  </Typography>
                )}
              </CardActions>
              <CardActions>
                <Typography
                  sx={{ fontSize: 14 }}
                  className={classes.contentStyle}
                >
                  New Password
                </Typography>
              </CardActions>
              <CardActions>
                <TextField
                  onChange={(e) => {
                    setData({
                      ...data,
                      password: e.target.value,
                    });
                  }}
                  size="small"
                  id="outlined-basic"
                  placeholder="New Password"
                  type={"password"}
                  className={classes.textField}
                />
              </CardActions>
              <CardActions>
                {error.path === "old_password" && (
                  <Typography
                    style={{ color: "#a80505", fontWeight: "600" }}
                    sx={{ fontSize: 14 }}
                  >
                    {error.message}
                  </Typography>
                )}
              </CardActions>
            </>
          )}

          <CardActions>
            <Grid container spacing={0}>
              <ColorButton
                loading={loading}
                loadingPosition="start"
                variant="contained"
                className={classes.contentStyle}
                style={{
                  borderColor: "#fff",
                  borderWidth: 3,
                  borderStyle: "solid",
                  borderRadius: 5,
                }}
                onClick={handleSubmit}
              >
                {level === 0 ? "Submit" : "Change Password"}
              </ColorButton>
            </Grid>
          </CardActions>
          <CardActions>
            <Typography
              onClick={goToSignin}
              sx={{
                opacity: 0.8,
                fontSize: 13,
                mx: "auto",
              }}
              className={classes.contentStyle}
            >
              Back to login ?{" "}
              <Typography
                component={"a"}
                sx={{
                  color: "text.primary",
                  fontSize: 13,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Log in
              </Typography>
            </Typography>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
