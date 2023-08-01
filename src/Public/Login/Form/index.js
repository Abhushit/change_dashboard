import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import theme from "../../../theme/theme";
import httpclient from "../../../utils/httpClient";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SubmitDiv = styled("div")(({ theme }) => ({
  "& .MuiButton-root": {
    backgroundColor: theme.palette.primary.darker,
    color: theme.palette.primary.lighter,
    width: "100%",
    marginTop: "10px",
    padding:"10px"
  },
}));

const RegisterDiv = styled("div")(({ theme }) => ({
  "& .MuiButton-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.lighter,
    width: "100%",
    // marginTop: "10px",
  },
}));

const Form = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    // userName: "admin@gmail.com",
    // password: "admin123",
    email: "admin@demo.com",
    password: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = () => {
    setLoading(true);
    httpclient
      .post("login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then(({ data }) => {
        if (data.success) {
          let newTime = new Date();

          setOpen(true);
          setSnackStatus("success");
          setSnackMessage(data.message);
          localStorage.setItem("login", JSON.stringify(data.data));
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("loggedin", JSON.stringify(newTime))
          setLoading(false);
          setTimeout(() => {
            window.location = "/";
          }, 1000);
        } else {
          setOpen(true);
          setSnackStatus("error");
          setSnackMessage(data.message || data.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        // console.log('err',err)
        setOpen(true);
        setSnackStatus("error");
        setSnackMessage(err.response.data.msg);
        setLoading(false);
      });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <h2
            style={{
              margin: "0",
              paddingBottom: "20px",
              fontSize: "35px",
              color: "#fff",
            }}
          >
            Login
          </h2>
        </Grid>
        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Username</InputLabel>
          <TextField
            variant="outlined"
            // label="Email"
            name="email"
            // name="userName"
            type="text"
            // value={loginData.userName}
            value={loginData.email}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Password</InputLabel>
          <TextField
            variant="outlined"
            // label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <span style={{ color: " #fff" }}>Forgot Password?</span>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <SubmitDiv>
            {loading ?
            <Button variant="contained" color="primary">
              <CircularProgress style={{ height:"20px", width:"20px", color:"#fff", marginRight:"10px" }} />   Loading
            </Button>
            :
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Sign In
            </Button>
            }
          </SubmitDiv>
        </Grid>

        {/* <Grid item xs={12} md={12}>
          <RegisterDiv>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </RegisterDiv>
        </Grid> */}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackStatus}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
