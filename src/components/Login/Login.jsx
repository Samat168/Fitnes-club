import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Button } from "react-scroll";
import { Context } from "../..";
import firebase from "firebase/compat/app";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Login.css";
import { useAuth } from "../../context/AuthContextProvider";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const { auth } = useContext(Context);
  const navigate = useNavigate();

  const {
    email,
    password,

    emailError,
    passwordError,
    hasAccount,

    setEmail,
    setPasword,
    setHasAccount,
    setName,

    handleSignUp,
    handleLogin,
  } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const login = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await auth.signInWithPopup(provider);
      console.log(user);
      navigate("/"); // Перенаправление на главную страницу
    } catch (error) {
      console.error("Error during sign-in: ", error);
    }
  };

  return (
    <div className="sam" style={{ width: "100%", height: "1400px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header />
      </div>
      <div>
        <Box>
          <Container component="main" maxWidth="xs" sx={{}}>
            <Box
              sx={{
                padding: "25px",
                display: "flex",
                flexDirection: "column",
                // background:
                //   " url(	https://store.akamai.steamstatic.com/public/shared/images/joinsteam/new_login_bg_strong_mask.jpg)",
                width: "100%",
                borderRadius: "20px",
              }}
            >
              <img
                src="https://thalassafestival.com/wp-content/uploads/2019/12/registration-icon-png-6.png"
                alt=""
                style={{
                  width: "200px",
                  marginLeft: "30%",
                  marginBottom: "7%",
                }}
              ></img>
              <Typography component="h1" variant="h5" sx={{ color: "white" }}>
                {hasAccount ? "Войти" : "Регистрация"}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  sx={{ backgroundColor: "white", borderRadius: "5px" }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={emailError}
                />
                <TextField
                  sx={{ backgroundColor: "white", borderRadius: "5px" }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPasword(e.target.value)}
                  helperText={passwordError}
                />

                {hasAccount ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      style={{
                        width: "50%",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid white",
                        borderRadius: "3px",
                      }}
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      Войти
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      style={{
                        width: "50%",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid white",
                        borderRadius: "3px",
                      }}
                      onClick={() => {
                        handleSignUp();
                      }}
                    >
                      Регистрация
                    </Button>
                  </div>
                )}

                <Grid container>
                  <Grid item style={{ width: "100%" }}>
                    {hasAccount ? (
                      <Link
                        onClick={() => setHasAccount(!hasAccount)}
                        href="#"
                        variant="body2"
                        style={{
                          width: "100%",
                          color: "wheat",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {"Если у вас нет аккаунта? Регистрируйтесь!"}
                      </Link>
                    ) : (
                      <Link
                        onClick={() => setHasAccount(!hasAccount)}
                        href="#"
                        variant="body2"
                        style={{
                          width: "100%",
                          color: "wheat",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {"Если у вас уже есть аккаунт? Войти!"}
                      </Link>
                    )}
                    <p
                      style={{
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Или
                    </p>
                    <div style={{ display: "flex" }}>
                      <Button
                        onClick={login}
                        variant={"outlined"}
                        style={{
                          border: "90%",
                          width: "87%",
                          height: "42px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Войти с помощью Google
                      </Button>
                      <img
                        src="https://cdn-teams-slug.flaticon.com/google.jpg"
                        alt=""
                        style={{
                          width: "40px",
                          marginLeft: "1%",
                          marginBottom: "2%",
                        }}
                      ></img>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
