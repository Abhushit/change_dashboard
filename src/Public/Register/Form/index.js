import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
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
    // marginTop: "10px",
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

const HelperText = styled("p")(({ theme }) => ({
  color: "#a02d2d",
  margin: "5px 0",
}));

const Form = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  console.log("register", registerData);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("firstName",registerData.firstName);
    formData.append("lastName",registerData.lastName);
    formData.append("email",registerData.email);
    formData.append("phone",registerData.phone);
    formData.append("gender",registerData.gender);
    formData.append("password",registerData.password);
    httpclient
      .post("register", formData)
      .then(({ data }) => {
        if(data.success){
          setOpen(true);
          setSnackStatus("success");
          setSnackMessage(data.message);
          setTimeout(() => {
            window.location = "/login";
          }, 2000);
        }else{
          setOpen(true);
          setSnackStatus("error");
          setSnackMessage(data.message);
        }
      })
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
            Register
          </h2>
        </Grid>
        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>First Name</InputLabel>
          <TextField
            variant="outlined"
            // label="First Name"
            name="firstName"
            type="text"
            value={registerData.firstName}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Last Name</InputLabel>
          <TextField
            variant="outlined"
            // label="Email"
            name="lastName"
            type="text"
            value={registerData.lastName}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Email</InputLabel>
          <TextField
            variant="outlined"
            // label="Email"
            name="email"
            type="text"
            value={registerData.email}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Phone</InputLabel>
          <TextField
            variant="outlined"
            // label="Email"
            name="phone"
            type="number"
            value={registerData.phone}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <FormControl>
            <FormLabel style={{ color: "#fff" }}>Gender</FormLabel>
            {/* <InputLabel style={{ color: "#fff" }}>Gender</InputLabel> */}
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <FormControlLabel
                value="Female"
                control={<Radio color="secondary" />}
                label="Female"
                style={{ color: "#fff" }}
              />
              <FormControlLabel
                value="Male"
                style={{ color: "#fff" }}
                control={<Radio color="secondary" />}
                label="Male"
              />
              <FormControlLabel
                value="Other"
                control={<Radio color="secondary" />}
                label="Other"
                style={{ color: "#fff" }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Password</InputLabel>
          <TextField
            variant="outlined"
            // label="Password"
            name="password"
            type="password"
            value={registerData.password}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <InputLabel style={{ color: "#fff" }}>Confirm Password</InputLabel>
          <TextField
            variant="outlined"
            // label="Password"
            name="confirmPassword"
            type="password"
            value={registerData.confirmPassword}
            onChange={(e) => handleChange(e)}
            style={{
              width: "100%",
              borderRadius: "5px",
              background: theme.palette.primary.lighter,
            }}
          />
          {registerData.confirmPassword && (
            <HelperText>
              {registerData.password !== registerData.confirmPassword &&
                "Password does not match!"}
            </HelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <span style={{ color: " #fff" }}>Forgot Password?</span>
        </Grid>
        <Grid item xs={12} md={12}>
          <SubmitDiv>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Register
            </Button>
          </SubmitDiv>
        </Grid>

        <Grid item xs={12} md={12}>
          <RegisterDiv>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back to Login
            </Button>
          </RegisterDiv>
        </Grid>
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
