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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Validate } from "../../helpers/functions";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import apiRequest from "../../services/auth";
import "./UpdatePassword.css";

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  "Password must have one upper case alphabet, one lower case alphabet, one digit & special character, Minimum eight in length";

let schema = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  newPassword: yup
    .string()
    .matches(strongPasswordRegex, stringPassswordError)
    .required(),
  forgotPasswordToken: yup.string().required(),
});

const useStyles = makeStyles({
  textField: {
    width: "100% !important",
    // color: "white !important",
    // background: "white",
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
    // color:'#000'
    // maxWidth:'600px'
    // width: '80%',
    // height:'80%'
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

export default function UpdatePassword() {
  const params = useParams();
  const [data, setData] = useState({
    forgotPasswordToken: "",
    confirmPassword: "",
    newPassword: "",
  });
  const [level, setLevel] = useState(0);
  const [error, setError] = useState({ path: null });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { width, height } = useWindowDimensions();

  const navigate = useNavigate();
  const goToSignin = () => {
    navigate(`/login`);
  };
  const handleSubmit = async () => {
    setError({ path: null });
    let error = await Validate(schema, data);
    setError(error);
    if (error) return;
    const { confirmPassword, ...restData } = data;
    setLoading(true);
    const response = await apiRequest({
      url: "auth/update-password",
      method: "POST",
      data: restData,
    });
    setLoading(false);

    if (response.success) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  const classes = useStyles();

  useEffect(() => {
    if (params) {
      setData({
        ...data,
        forgotPasswordToken: params.forgotPasswordToken,
      });
    } else {
      goToSignin();
    }
  }, [params]);
  return (
    <>
      <Grid
        container
        // height={'auto'}
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 10, sm: 0 }}
        mb={{ xs: 10, sm: 0 }}
        // rowSpacing={{xs:-10,sm:0}}
        height={"100%"}
        minHeight={"100vh"}
      >
        <Grid xs={12} sm={6}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems={"center"}>
              <Grid item xs={10} sm={8}>
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
                      Please enter below required fields to change your
                      password.
                    </Typography>

                    <>
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
                          value={data.otp}
                          onChange={(e) => {
                            setData({
                              ...data,
                              newPassword: e.target.value,
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
                        {error.path === "newPassword" && (
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
                          Confirm Password
                        </Typography>
                      </CardActions>
                      <CardActions>
                        <TextField
                          onChange={(e) => {
                            setData({
                              ...data,
                              confirmPassword: e.target.value,
                            });
                          }}
                          size="small"
                          id="outlined-basic"
                          placeholder="Confirm Password"
                          className={classes.textField}
                        />
                      </CardActions>
                      <CardActions>
                        {error.path === "confirmPassword" && (
                          <Typography
                            style={{ color: "#a80505", fontWeight: "600" }}
                            sx={{ fontSize: 14 }}
                          >
                            {error.message}
                          </Typography>
                        )}
                      </CardActions>
                    </>

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
                          Change Password
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
                        <a
                          style={{
                            color: "#000",
                            fontSize: 13,
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Log in
                        </a>
                      </Typography>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
