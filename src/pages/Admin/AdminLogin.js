import { Box, Button, Card, Grid, InputAdornment, Stack, TextField, Typography,CardActions } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { notify } from "../../utils/index";
import apiRequest, { cookies } from "../../services/auth";
import * as yup from "yup";
import { Validate } from "../../helpers/functions";

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  "Password must have one upper case alphabet, one lower case alphabet, one digit & special character, Minimum eight in length";

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(strongPasswordRegex, stringPassswordError)
    .required()
    .label("Password"),
  email: yup.string().email().required().label("Email"),
});

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ path: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    console.log("$$$$$$~~~~~~~~~>>>", data)
    setError({ path: null });
    let error = await Validate(schema, data);
    setError(error);
    if (error) return;
    setLoading(true);
    const response = await apiRequest({
      url: "auth/admin",
      method: "POST",
      data,
    });
    setLoading(false);
    if (response.success) {
      notify("Login successful", "success");
      if (response.data.accessToken && response.data.isAdmin) {
        await cookies.set("ASID", response.data.accessToken);
      }
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 1000);
    }
  };
  
  return (
    <>
      <Box bgcolor={'background.primary'}>
        <Container>
          <Grid container sx={{ height: "100vh", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
            <Grid xs={12} md={5}>
              <Card sx={{ p: 5, bgcolor: "background.default", borderRadius: 5, boxShadow: 5 }}>
                <Typography sx={{ textAlign: "center", fontWeight: 600, fontSize: { xs: "24px", md: "28px" }, color: "text.primary" }}> Admin Login</Typography>
                <Stack mt={6} spacing={1}>
                  <TextField placeholder='Email' type={"email"} variant="standard" sx={{ bgcolor: "background.success", py: "8px", px: 2 }} InputProps={{
                    disableUnderline: true, startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }} value={data.email}
                    onChange={(e) => {
                      setData({
                        ...data,
                        email: e.target.value,
                      });
                    }}
                  />
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
                  <TextField size='large' placeholder='Password' type={"Password"} variant="standard" sx={{ bgcolor: "background.success", py: "8px", px: 2, mt: 3 }} InputProps={{
                    disableUnderline: true, startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>)
                  }}
                    value={data.password}
                    onChange={(e) => {
                      setData({
                        ...data,
                        password: e.target.value,
                      });
                    }} />
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

                  <Stack mt={3}>
                    <Stack sx={{ display: "flex", alignItems: "center" }}>
                      <Button variant='contained' onClick={login} sx={{ width: "70%",  textTransform: 'none', fontWeight: 600, color: "#000" ,
                            bgcolor: "#ce93d8",
                          }}>Login</Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>

      </Box>
    </>
  )
}

export default Login

