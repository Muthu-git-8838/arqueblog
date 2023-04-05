import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Box bgcolor={"background.primary"}>
      <Container>
        <Grid
          container
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                bgcolor: "background.default",
                borderRadius: 5,
                boxShadow: 5,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: { xs: "24px", md: "28px" },
                }}
              >
                Sign Up
              </Typography>
              <Stack mt={3}>
                <TextField
                  placeholder="First Name"
                  type={"text"}
                  variant="standard"
                  sx={{
                    bgcolor: "background.success",
                    borderRadius: 10,
                    py: "8px",
                    px: 2,
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  placeholder="Last Name"
                  type={"text"}
                  variant="standard"
                  sx={{
                    bgcolor: "background.success",
                    borderRadius: 10,
                    py: "8px",
                    px: 2,
                    mt: 3,
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  placeholder="Email"
                  type={"email"}
                  variant="standard"
                  sx={{
                    bgcolor: "background.success",
                    borderRadius: 10,
                    py: "8px",
                    px: 2,
                    mt: 3,
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  size="large"
                  placeholder="Password"
                  type={"Password"}
                  variant="standard"
                  sx={{
                    bgcolor: "background.success",
                    borderRadius: 10,
                    py: "8px",
                    px: 2,
                    mt: 3,
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack
                  direction={"row"}
                  mt={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox />
                  <Typography>I agree to the terms of service</Typography>
                </Stack>
                <Stack sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      borderRadius: "50px",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
                <Typography
                  sx={{ fontWeight: 600, my: 1, textAlign: "center" }}
                >
                  OR
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{ display: "flex", justifyContent: "center" }}
                  spacing={1}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src={
                      "https://arasari.studio/wp-content/projects/forny/templates/img/icon-facebook.png"
                    }
                  />
                  <img
                    style={{ cursor: "pointer" }}
                    src={
                      "https://arasari.studio/wp-content/projects/forny/templates/img/icon-google.png"
                    }
                  />
                  <img
                    style={{ cursor: "pointer" }}
                    src={
                      "https://arasari.studio/wp-content/projects/forny/templates/img/icon-twitter.png"
                    }
                  />
                </Stack>
                <Typography textAlign={"center"} sx={{ mt: 1 }}>
                  Have you an account?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#0d6efd" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;
