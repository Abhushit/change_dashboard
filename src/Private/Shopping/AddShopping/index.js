import { Add, AddPhotoAlternateOutlined, Clear } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Tooltip,
  Snackbar
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import MuiAlert from "@mui/material/Alert";
import httpclient from "../../../utils/httpClient";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
}));

const DropzoneDiv = styled("div")({
  "& img": {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
});

const UploadDiv = styled("div")({
  cursor: "pointer",
  textAlign: "center",
  padding: "40px 0",
  border: `1px solid #999`,
  borderRadius: "5px",
  "&:hover": {
    border: `1px solid #333`,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "45px",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AddShopping = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [shoppingDetails, setShoppingDetails] = useState({
    title: "",
    description: "",
    shortDescription: "",
    image: "",
    location: "",
    phone: "",
    email: "",
    openHours: "",
    enabled: "",
  });

  useMemo(() => {
    if (location.state) {
      setShoppingDetails({
        title: location.state.row.title,
        description: location.state.row.description,
        shortDescription: location.state.row.shortDescription,
        image: location.state.row.image,
        location: location.state.row.location,
        phone: location.state.row.phone,
        email: location.state.row.email,
        openHours: location.state.row.openHours,
        enabled: location.state.row.enabled,
      });
      setId(location.state.row._id)
    }
  }, []);

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  //Normal handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setShoppingDetails({
      ...shoppingDetails,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("title", shoppingDetails.title);
    formData.append("description", shoppingDetails.description);
    formData.append("shortDescription", shoppingDetails.shortDescription);
    formData.append("image", shoppingDetails.image);
    formData.append("location", shoppingDetails.location);
    formData.append("phone", shoppingDetails.phone);
    formData.append("email", shoppingDetails.email);
    formData.append("openHours", shoppingDetails.openHours);
    formData.append("enabled", shoppingDetails.enabled);

    !id.length
    ? httpclient
        .post("shopping",formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/shopping");
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
        .put(`shopping/${id}`, formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/shopping");
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

  const handleDrop = (file) => {
    console.log("file", file);
    setShoppingDetails({
      ...shoppingDetails,
      image: file[0],
    });
  };

  const handleResetImage = () => {
    setShoppingDetails({
      ...shoppingDetails,
      image: "",
    });
  };

  return (
    <div>
      <h1>Add Shopping</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={shoppingDetails.title}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              multiline
              rows={3}
              variant="outlined"
              name="shortDescription"
              type="text"
              label="Short Description"
              value={shoppingDetails.shortDescription}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="location"
              type="text"
              label="Location"
              value={shoppingDetails.location}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="phone"
              type="text"
              label="Phone"
              value={shoppingDetails.phone}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="email"
              type="text"
              label="Email"
              value={shoppingDetails.email}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="openHours"
              type="text"
              label="Open Hours"
              value={shoppingDetails.openHours}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>


          <Grid item xs={12} md={12}>
            <TextField
              multiline
              rows={5}
              variant="outlined"
              name="description"
              type="text"
              label="Description"
              value={shoppingDetails.description}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Enabled</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shoppingDetails.enabled}
                name="enabled"
                label="Enabled"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="Enabled">Yes</MenuItem>
                <MenuItem value="Disabled">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <DropzoneDiv>
              <Dropzone
                onDrop={handleDrop}
                // accept="image/png, image/gif image/jpg" //whatever the file type needed
              >
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject,
                  rejectedFiles,
                }) => {
                  return (
                    <div>
                      {shoppingDetails.image ? (
                        shoppingDetails.image.type ? (
                          <img
                            src={URL.createObjectURL(shoppingDetails.image)}
                            //   className={classes.imgClass}
                            alt={shoppingDetails.image.name}
                          />
                        ) : (
                          <img
                            src={shoppingDetails.image}
                            //   className={classes.imgClass}
                            alt={shoppingDetails.name}
                          />
                        )
                      ) : (
                        <UploadDiv {...getRootProps()}>
                          <input {...getInputProps()} />
                          <AddPhotoAlternateOutlined color="primary" />
                          <p>Upload Image here</p>
                        </UploadDiv>
                      )}
                      <div style={{ textAlign: "center", marginTop: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setShoppingDetails({
                              ...shoppingDetails,
                              image: "",
                            })
                          }
                        >
                          {" "}
                          Reset Image
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </Dropzone>
            </DropzoneDiv>
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
              <Button color="primary" variant="outlined" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </RootCard>
    </div>
  );
};

export default AddShopping;
