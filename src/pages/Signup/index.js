import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { green, purple } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Validate } from "../../helpers/functions";
import "./signup.css";
// import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/signup/SignUpActions";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Select from "react-select";
import FileUpload from "../../components/FileUpload";

const useStyles = makeStyles({
  textField: {
    color: "white !important",
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
    textAlign: "center",
  },
  radio: {
    "&$checked": {
      color: "#4BbusinessData8DF8",
    },
  },
  checked: {},
  selectMenuItemMultiple: {
    backgroundColor: "#9c27b0",
    color: "#fff",
  },
});

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length";

const customerSchema = yup.object().shape({
  terms_conditions: yup
    .boolean()
    .oneOf([true], "Please agree to our terms to create account!"),
  user_attachments: yup.array().min(1).label("User profile").required(),
  categories: yup.array().min(1).label("Interested in").required(),
  confirm_password: yup
    .string()
    .label("Confirm Password")
    .matches(strongPasswordRegex, stringPassswordError)
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
  password: yup
    .string()
    .label("Password")
    .matches(strongPasswordRegex, stringPassswordError)
    .required(),
  email: yup.string().label("Email").email().required(),
  last_name: yup.string().label("Last name").required(),
  first_name: yup.string().label("First name").required(),
});

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  width: "100%",
  textTransform: "unset",
  "&:hover": {
    backgroundColor: green[700],
  },
}));

export default function SignUp({ setValue = () => {} }) {
  const classes = useStyles();
  const [error, setError] = useState({ path: null });
  const [loading, setLoading] = useState(false);
  const categories = useSelector((state) => state.common.categories);
  console.log("s--ss>>>>>categories>>>>>>>>>", categories);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    categories: [],
    user_attachments: [],
    terms_conditions: false,
  });
  console.log("s--ss>>dattatat>>>>>>>>>>>>", data);
  const navigate = useNavigate();
  const onRegister = async () => {
    let error = await Validate(customerSchema, data);
    setError(error);
    if (error) return;
    const { confirm_password, ...rest } = data;
    setLoading(true);
    dispatch(
      signup({
        msg: rest,
        onSuccess: () => {
          setData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            categories: [],
            user_attachments: [],
            terms_conditions: false,
          });
          setValue(0);
        },
      })
    );
    setLoading(false);
  };

  return (
    <Card className={classes.cardView}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: 600 ,marginBottom:3}}
          color="text.primary"
          gutterBottom
          className={classes.contentStyle}
        >
          REGISTER
        </Typography>

        {/* <Typography
          sx={{
            fontSize: 16.5,
            fontWeight: 600,
            marginBottom: "10px",
          }}
          color="text.secondary"
          className={classes.contentStyle}
        >
          Create new account
        </Typography> */}
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <Typography sx={{ fontSize: 13, fontFamily: "sans-serif" }}>
                First Name
              </Typography> */}
              <TextField
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    first_name: e.target.value,
                  });
                }}
                value={data.first_name}
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="First_Name"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={6}>
              {/* <Typography
                sx={{ fontSize: 13 }}
                className={classes.contentStyle}
              >
                Last Name
              </Typography> */}
              <TextField
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    last_name: e.target.value,
                  });
                }}
                value={data.last_name}
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="Last_Name"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12}>
              {/* <Typography
                sx={{ fontSize: 13 }}
                className={classes.contentStyle}
              >
                Email
              </Typography> */}
              <TextField
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
                value={data.email}
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="Email"
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={6}>
              {/* <Typography
                sx={{ fontSize: 13 }}
                className={classes.contentStyle}
              >
                Password
              </Typography> */}
              <TextField
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
                value={data.password}
                size="small"
                type={"password"}
                id="outlined-basic"
                variant="outlined"
                label="Password"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              {/* <Typography
                sx={{ fontSize: 13 }}
                className={classes.contentStyle}
              >
                Confirm Password
              </Typography> */}
              <TextField
                fullWidth
                onChange={(e) => {
                  setData({
                    ...data,
                    confirm_password: e.target.value,
                  });
                }}
                value={data.confirm_password}
                size="small"
                type={"password"}
                id="outlined-basic"
                variant="outlined"
                label="Confirm Password"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="standard" fullWidth>
                <Typography
                  sx={{ fontSize: 13 }}
                  className={classes.contentStyle}
                >
                  Interested in
                </Typography>
                <Select
                  className="category_list"
                  onChange={(e) => {
                    console.log(e);
                    setData({
                      ...data,
                      categories: e.map((e) => e._id),
                    });
                  }}
                  isMulti={true}
                  options={categories.map((d) => {
                    return {
                      ...d,
                      value: d._id,
                      label: d.name,
                    };
                  })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: 13 }}
                className={classes.contentStyle}
              >
                Upload your profile images
              </Typography>
              <FileUpload
                onChange={(files) => {
                  console.log("Ss0s>>>>>>>>>>>", files);
                  setData({
                    ...data,
                    user_attachments: files,
                  });
                }}
                buttonText={"Choose images"}
                multiple={true}
              />
            </Grid>
          </Grid>
        </React.Fragment>
        <Grid container>
          <FormGroup>
            <FormControlLabel
              sx={{ fontSize: 14 }}
              className={classes.contentStyle}
              control={
                <Checkbox
                  checked={data.terms_conditions}
                  onChange={() => {
                    setData({
                      ...data,
                      terms_conditions: !data.terms_conditions,
                    });
                  }}
                  className={classes.contentStyle}
                />
              }
              label={
                <Typography
                  sx={{ opacity: 0.8, fontSize: 13 }}
                  className={classes.contentStyle}
                >
                  I agree to all the term, Privacy policy and fees
                </Typography>
              }
            />
          </FormGroup>
        </Grid>
        <Grid container>
          {error.path && (
            <Typography
              style={{
                color: "#ff3d47",
                fontWeight: "600",
                maxWidth: "400px",
              }}
              sx={{ fontSize: 14 }}
            >
              {error.message}
            </Typography>
          )}
        </Grid>
        <Grid container mt={2}>
          <ColorButton
            loading={loading}
            loadingPosition="start"
            onClick={onRegister}
            variant="contained"
            className={classes.contentStyle}
            style={{
              // borderColor: "#fff",
              // borderWidth: 3,
              // borderStyle: "solid",
              borderRadius: 15,
            }}
          >
            Create account
          </ColorButton>
        </Grid>
        <CardActions>
          <Typography
            sx={{
              mx: "auto",
              opacity: 0.8,
              fontSize: 13,
            }}
            className={classes.contentStyle}
          >
            Already have account yet?{" "}
            <Typography
              component={"a"}
              sx={{
                color: "text.primary",
                fontSize: 13,
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setValue(0);
              }}
            >
              Login
            </Typography>
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
}
