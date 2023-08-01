import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import httpclient from "../../../../utils/httpClient";
import { RemoveRedEye } from "@mui/icons-material";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PasswordDiv = styled("div")(({theme}) => ({
  position:"relative",
  "& svg":{
    fontSize:"18px",
    color:"#ccc",
    position:"absolute",
    right:"20px",
    top:"20px",
    cursor:"pointer",
  }
}))


let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const AddStaff = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [staffDetails, setStaffDetails] = useState({
    userName: "",
    email: "",
    jobtitle: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [viewPassword, setViewPassword] = useState(false);
  const [confirmViewPassword, setConfirmViewPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordValid2, setPasswordValid2] = useState(true);

  useEffect(() => {
    if (location.state) {
      setStaffDetails({
        ...staffDetails,
        userName: location.state.row.userName,
        email: location.state.row.email,
        jobtitle: location.state.row.jobTitle,
        role: location.state.row.role,
      });
      setId(location.state.row._id);
    }
  }, [location.state]);

  //password validation
  useEffect(() => {
    if (passwordRegex.test(staffDetails.password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [staffDetails.password]);

  useEffect(() => {
    if (staffDetails.confirmPassword.length > 0) {
      if (staffDetails.password === staffDetails.confirmPassword) {
        setPasswordValid2(true);
      } else {
        setPasswordValid2(false);
      }
    }
  }, [staffDetails.confirmPassword]);
  //password validation


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStaffDetails({
      ...staffDetails,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    !id.length
      ? httpclient
          .post("users/add_user", {
            userName: staffDetails.userName,
            email: staffDetails.email,
            jobTitle: staffDetails.jobtitle,
            role: staffDetails.role,
            password: staffDetails.password,
          })
          .then(({ data }) => {
            if (data.success) {
              setOpen(true);
              setSnackStatus("success");
              setSnackMessage(data.message);
              setTimeout(() => {
                navigate("/resources/staff_user_roles");
              }, 1000);
            } else {
              setOpen(true);
              setSnackStatus("error");
              setSnackMessage(data.message);
            }
          })
          .catch((err) => {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(err.response.data.msg);
          })
      : httpclient
          .put(`user/${id}`, {
            userName: staffDetails.userName,
            email: staffDetails.email,
            jobTitle: staffDetails.jobtitle,
            role: staffDetails.role,
          })
          .then(({ data }) => {
            if (data.success) {
              setOpen(true);
              setSnackStatus("success");
              setSnackMessage(data.message);
              setTimeout(() => {
                navigate("/resources/staff_user_roles");
              }, 1000);
            } else {
              setOpen(true);
              setSnackStatus("error");
              setSnackMessage(data.message);
            }
          })
          .catch((err) => {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(err.response.data.msg);
          });
  };

  return (
    <div>
      <h1>Add Staff Users and Roles</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="userName"
              type="text"
              label="Username"
              value={staffDetails.userName}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          {!id &&
          <Grid item xs={12} md={12}>
            <PasswordDiv>
              <TextField
                variant="outlined"
                name="password"
                color={passwordValid ? "primary" : "error"}
                type={viewPassword ? "text" : "password"}
                label="Password"
                value={staffDetails.password}
                onChange={(e) => handleChange(e)}
                sx={{ width: "100%" }}
                helperText="Password must include 8 characters, 1 Special character, 1 Uppercase and 1 Number."
              />
              <RemoveRedEye onClick={() => setViewPassword(!viewPassword)} />
            </PasswordDiv>
          </Grid>
          }
          
          {!id &&
          <Grid item xs={12} md={12}>
            <PasswordDiv>
              <TextField
                variant="outlined"
                name="confirmPassword"
                color={passwordValid2 ? "primary" : "error"}
                type={confirmViewPassword ? "text" : "password"}
                label="Confirm Password"
                value={staffDetails.confirmPassword}
                onChange={(e) => handleChange(e)}
                sx={{ width: "100%" }}
                helperText={passwordValid2 ? "" : "Password does not match!"}
              />
              <RemoveRedEye onClick={() => setConfirmViewPassword(!confirmViewPassword)} />
            </PasswordDiv>
          </Grid>
          }

          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="email"
              type="email"
              label="Email"
              value={staffDetails.email}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="jobtitle"
              type="text"
              label="Job Title"
              value={staffDetails.jobtitle}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={staffDetails.role}
                name="role"
                label="Role"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>Select Role</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                {/* <MenuItem value="user">User</MenuItem>
                <MenuItem value="editor">Editor</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box textAlign={"right"} mt={2}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button color="primary" variant="outlined" onClick={handleSubmit} disabled={!id ? ((passwordValid && passwordValid2) ? false : true) : false}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </RootCard>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
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

export default AddStaff;
