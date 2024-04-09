import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/tmp/endpoints";
import { useRouter } from "next/router";
import tokenKey from "@/constants/token";
import getJwtToken from "@/utils/getJwtToken";

const defaultTheme = createTheme();

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = getJwtToken();
    console.log(token);

    if (token) {
      router.push("/p/admin");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const res = await fetch("http://localhost:3002/auth/signin", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });

    const { token } = await res.json();

    if (token) {
      console.log(token);

      setIsLoading(false);
      sessionStorage.setItem(tokenKey, token);
      router.push("/p/admin");
    } else {
      setEmailError(true);
      setPasswordError(true);
      setIsLoading(false);
    }
  };

  const handleVisibilityClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? "Incorrect email or password" : ""}
            />
            <TextField
              label="Password"
              id="outlined-start-adornment"
              className="w-full"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="cursor-pointer">
                    <Visibility onClick={handleVisibilityClick} />
                  </InputAdornment>
                ),
              }}
              error={passwordError}
              helperText={passwordError ? "Incorrect email or password" : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              className="bg-slate-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Typography>Sign In</Typography>
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
