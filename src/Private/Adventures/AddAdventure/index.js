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
  [theme.breakpoints.down("md")]: {
    padding:"20px"
  },
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

const AddAdventure = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [id, setId] = useState("");

  const [adventureDetails, setAdventureDetails] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    price: "",
    bookable: "",
    enabled: ""
  });

  useMemo(() => {
    if (location.state) {
      setAdventureDetails({
        title: location.state.row.title,
        description: location.state.row.description,
        image: location.state.row.image,
        location: location.state.row.location,
        price: location.state.row.price,
        bookable: location.state.row.bookable,
        enabled: location.state.row.enabled,
      });
      setId(location.state.row._id);
    }
  }, []);

  //Normal handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAdventureDetails({
      ...adventureDetails,
      [name]: value,
    });
  };

  
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
    formData.append("title", adventureDetails.title);
    formData.append("description", adventureDetails.description);
    formData.append("location", adventureDetails.location);
    formData.append("price", adventureDetails.price);
    formData.append("bookable", adventureDetails.bookable);
    formData.append("enabled", adventureDetails.enabled);
    adventureDetails.image.map(imgs => {
      formData.append("image", imgs);
    })

    !id.length
    ? httpclient
        .post("adventure", formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/adventures_day_trips");
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
        .put(`adventure/${id}`,formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/adventures_day_trips");
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
    setAdventureDetails({
      ...adventureDetails,
      image: file,
    })
  }
  };

  const handleResetImage = () => {
    setAdventureDetails({
      ...adventureDetails,
      image: "",
    });
  };

  return (
    <div>
      <h1>Add Adventure & day trip</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={adventureDetails.title}
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
              value={adventureDetails.description}
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
              value={adventureDetails.location}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="price"
              type="text"
              label="Price"
              value={adventureDetails.price}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ marginTop: "10px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Is Trip Bookable ?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="bookable"
                value={adventureDetails.bookable}
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
                value={adventureDetails.enabled}
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
                      {adventureDetails.image ? (
                        adventureDetails.image[0].type ? (
                          adventureDetails.image.map(imgs => (
                            <img
                              src={URL.createObjectURL(imgs)}
                              alt={imgs.name}
                              style={{ height:"250px", width:"250px", objectFit:"cover", marginRight:"20px" }}
                            />
                          ))
                          
                        ) : (

                          adventureDetails.image.map(imgs => (
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
                            setAdventureDetails({
                              ...adventureDetails,
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

export default AddAdventure;
