import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { blue, green, purple } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";
import { Validate } from "../../helpers/functions";
import { login } from "../../store/login/loginActions";
import ForgotPassword from "../ForgotPassword";
import "./login.css";

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  "Password must have one upper case alphabet, one lower case alphabet, one digit & special character, Minimum eight in length";
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailError = "Enter a Valid E-mail address";
let schema = yup.object().shape({
  password: yup
    .string()
    .matches(strongPasswordRegex, stringPassswordError)
    .required(),
  email: yup.string().matches(emailRegex, emailError).required(),
});

const useStyles = makeStyles({
  textField: {
    width: "100% !important",
    color: "text.primary !important",
    // background: "white",
    borderRadius: "3px !important",
    border: "unset",
  },
  textFieldWidth: {
    width: "100% !important",
  },
  cardView: {
    background: "transparent !important",
    width: "100%",
    // boxShadow: "0px -27px 1px 17px rgba(209,227,241,1) !important",
    // borderRadius: "16px !important",
    // color:'#000',
    // maxWidth:'600px',
    // width: '80%',
    // height:'80%'
  },
  contentStyle: {
    color: "text.primary !important",
    textAlign: "center",
  },
});

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  width: "100%",
  "&:hover": {
    backgroundColor: green[700],
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

export default function Login({ setValue = () => {} }) {
  const [forgotPassword, setForgotPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ path: null });
  const [loading, setLoading] = useState(false);
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(false);
  const [isPPchecked, setIsPPchecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToSignup = () => {
    setValue(1);
  };
  const onLogin = async () => {
    let error = await Validate(schema, data);
    setError(error);
    if (error) return;
    setLoading(true);
    dispatch(login(data));
    setLoading(false);
  };
  const classes = useStyles();
  return (
    <>
      {!forgotPassword ? (
        <Card className={classes.cardView}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: 600, pl: 1 }}
              color="text.primary"
              gutterBottom
              className={classes.contentStyle}
            >
              LOGIN
            </Typography>
            {/* <Typography
              sx={{ fontSize: 16, mb: 1.5, fontWeight: 600, pl: 1 }}
              color="text.secondary"
              className={classes.contentStyle}
            >
              Login to your Account
            </Typography>
            <Typography
              sx={{ fontSize: 13, pl: 1, opacity: 0.8 }}
              className={classes.contentStyle}
            >
              Thank you for get back to Schan Display. lets access our the best
              recommendation for you
            </Typography> */}
            <CardActions>
              {/* <Typography
                sx={{ fontSize: 14 }}
                className={classes.contentStyle}
              >
                Email
              </Typography> */}
            </CardActions>
            <CardActions>
              <TextField
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="Email"
                className={classes.textField}
              />
            </CardActions>
            <CardActions>
              {error.path === "email" && (
                <Typography
                  style={{ color: "#a80505", fontWeight: "600" }}
                  sx={{ fontSize: 14 }}
                >
                  {error.message}
                </Typography>
              )}
            </CardActions>
            <CardActions>
              {/* <Typography
                sx={{ fontSize: 14 }}
                className={classes.contentStyle}
              >
                Password
              </Typography> */}
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
                variant="outlined"
                label="Password"
                type={"password"}
                className={classes.textField}
              />
            </CardActions>
            <CardActions>
              {error.path === "password" && (
                <Typography
                  style={{
                    color: "#a80505",
                    fontWeight: "600",
                    maxWidth: "500px",
                  }}
                  sx={{ fontSize: 14 }}
                >
                  {error.message}
                </Typography>
              )}
            </CardActions>
            <CardActions>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormGroup>
                  <FormControlLabel
                    className={classes.contentStyle}
                    control={
                      <Checkbox
                        defaultChecked
                        className={classes.contentStyle}
                      />
                    }
                    label={
                      <Typography style={{ fontSize: 13 }}>
                        Remember Me
                      </Typography>
                    }
                  />
                </FormGroup>
                <CardActions>
                  <Typography
                    onClick={() => setForgotPassword(true)}
                    style={{
                      color: "text.secondary",
                      fontSize: 13,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Forgot Password
                  </Typography>
                </CardActions>
              </Grid>
            </CardActions>
            <CardActions>
              <Grid container spacing={0}>
                <ColorButton
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  className={classes.contentStyle}
                  style={{
                    // borderColor: "#fff",
                    // borderWidth: 3,
                    // borderStyle: "solid",
                    borderRadius: 15,
                  }}
                  onClick={onLogin}
                >
                  Sign In
                </ColorButton>
              </Grid>
            </CardActions>
            <CardActions>
              <Typography
                onClick={goToSignup}
                sx={{
                  opacity: 0.8,
                  fontSize: 13,
                  mx: "auto",
                }}
                className={classes.contentStyle}
              >
                Don't Have an account yet ?{" "}
                <Typography
                  component={"a"}
                  sx={{
                    color: "text.primary",
                    fontSize: 13,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        <ForgotPassword setForgotPassword={setForgotPassword} />
      )}
    </>
  );
}
