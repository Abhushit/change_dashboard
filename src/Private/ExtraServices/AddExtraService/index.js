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
  Snackbar,
  Tooltip
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

const AddExtraService = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [id, setId] = useState("");

  const [serviceDetails, setServiceDetails] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    bookable: "",
    enabled: ''
  });

  useMemo(() => {
    if (location.state) {
      setServiceDetails({
        title: location.state.row.title,
        description: location.state.row.description,
        image: location.state.row.image,
        price: location.state.row.price,
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

    setServiceDetails({
      ...serviceDetails,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("title",serviceDetails.title);
    formData.append("description",serviceDetails.description);
    formData.append("price",serviceDetails.price);
    formData.append("bookable",serviceDetails.bookable);
    formData.append("enabled",serviceDetails.enabled);
    serviceDetails.image.map(imgs => {
      formData.append("image",imgs);
    })

    !id.length
    ? httpclient
        .post("extra_services", formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/extra_services");
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
        .put(`extra_services/${id}`,formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/extra_services");
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
    setServiceDetails({
      ...serviceDetails,
      image: file,
    })
    }
  };

  const handleResetImage = () => {
    setServiceDetails({
      ...serviceDetails,
      image: "",
    });
  };

  return (
    <div>
      <h1>Add Extra Service</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={serviceDetails.title}
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
              value={serviceDetails.description}
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
              value={serviceDetails.price}
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
                value={serviceDetails.enabled}
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

          <Grid item xs={12}>
            <FormControl sx={{ marginTop: "10px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Is Service Bookable ?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="bookable"
                value={serviceDetails.bookable}
                onChange={(e) => handleChange(e)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />

                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
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
                      {serviceDetails.image ? (
                        serviceDetails.image[0].type ? (
                          serviceDetails.image.map(imgs => (
                            <img
                              src={URL.createObjectURL(imgs)}
                              alt={imgs.name}
                              style={{ height:"250px", width:"250px", objectFit:"cover", marginRight:"20px" }}
                            />
                          ))
                        ) : (
                          serviceDetails.image.map(imgs => (
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
                            setServiceDetails({
                              ...serviceDetails,
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

export default AddExtraService;
