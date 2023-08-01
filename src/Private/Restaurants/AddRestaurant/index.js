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

const AddRestaurant = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [id, setId] = useState("");

  const [restaurantDetails, setRestaurantDetails] = useState({
    title: "",
    description: "",
    shortDescription: "",
    image: "",
    location: "",
    phone: "",
    email: "",
    openHours: "",
    priceRange: "",
    bookable: "",
    enabled: "",
  });

  useMemo(() => {
    if (location.state) {
      setRestaurantDetails({
        title: location.state.row.title,
        description: location.state.row.description,
        shortDescription: location.state.row.shortDescription,
        image: location.state.row.image,
        location: location.state.row.location,
        phone: location.state.row.phone,
        email: location.state.row.email,
        openHours: location.state.row.openHours,
        priceRange: location.state.row.priceRange,
        bookable: location.state.row.bookable,
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

    setRestaurantDetails({
      ...restaurantDetails,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    let formData = new FormData();

    formData.append("title", restaurantDetails.title);
    formData.append("description", restaurantDetails.description);
    formData.append("shortDescription", restaurantDetails.shortDescription);
    formData.append("location", restaurantDetails.location);
    formData.append("phone", restaurantDetails.phone);
    formData.append("email", restaurantDetails.email);
    formData.append("openHours", restaurantDetails.openHours);
    formData.append("priceRange", restaurantDetails.priceRange);
    formData.append("bookable", restaurantDetails.bookable);
    formData.append("enabled", restaurantDetails.enabled);
    restaurantDetails.image.map(imgs => {
      formData.append("image",imgs);
    })


    !id.length
    ? httpclient
        .post("restaurants",formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/restaurants");
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
        .put(`restaurants/${id}`, formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/restaurants");
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
    if(file.length > 3){
      window.alert("Max number of file to be uploaded is 3")
    }else{
    setRestaurantDetails({
      ...restaurantDetails,
      image: file,
    })
  }
  };

  const handleResetImage = () => {
    setRestaurantDetails({
      ...restaurantDetails,
      image: "",
    });
  };

  return (
    <div>
      <h1>Add Restaurant</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={restaurantDetails.title}
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
              value={restaurantDetails.shortDescription}
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
              value={restaurantDetails.location}
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
              value={restaurantDetails.phone}
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
              value={restaurantDetails.email}
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
              value={restaurantDetails.openHours}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="priceRange"
              type="text"
              label="Price Range"
              value={restaurantDetails.priceRange}
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
              value={restaurantDetails.description}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ marginTop: "10px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Is Restaurant Bookable ?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="bookable"
                value={restaurantDetails.bookable}
                onChange={(e) => handleChange(e)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />

                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Enabled</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={restaurantDetails.enabled}
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
                      {restaurantDetails.image ? (
                        restaurantDetails.image[0].type ? (
                          restaurantDetails.image.map(imgs => (
                            <img
                              src={URL.createObjectURL(imgs)}
                              alt={imgs.name}
                              style={{ height:"250px", width:"250px", objectFit:"cover", marginRight:"20px" }}
                            />
                          ))
                          
                        ) : (

                          restaurantDetails.image.map(imgs => (
                            <img
                              src={imgs}
                              alt={imgs.name}
                              style={{ height:"250px", width:"250px", objectFit:"cover", marginRight:"20px" }}
                            />
                          ))
                        )
                      ) : (
                        <UploadDiv {...getRootProps()}>
                          <input {...getInputProps()} />
                          <AddPhotoAlternateOutlined color="primary" />
                            <p>{"Upload Image here ( max 3 )"}</p>
                        </UploadDiv>
                      )}
                      <div style={{ textAlign: "center", marginTop: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setRestaurantDetails({
                              ...restaurantDetails,
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

export default AddRestaurant;
