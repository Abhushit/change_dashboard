import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { color } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useLocation, useNavigate } from "react-router-dom";
import httpclient from "../../../../utils/httpClient";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
}));

const colorList = [
  { color: "#f24726" },
  { color: "#da0062" },
  { color: "#9510ac" },
  { color: "#Cee741" },
  { color: "#8fd14f" },
  { color: "#0ca789" },
  { color: "#12cdd4" },
  { color: "#2d9bf0" },
  { color: "#414bb2" },
  { color: "#Fac710" },
  { color: "#808080" },
  { color: "#1a1a1a" },
];

const AddTag = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [tagDetails, setTagDetails] = useState({
    name: "",
    color: "#f24726",
  });

  useEffect(() => {
    if (location.state) {
      setTagDetails({
        name: location.state.row.name,
        color: location.state.row.color,
      });
      setId(location.state.row._id);
    }
  }, []);

  console.log('id', id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTagDetails({
      ...tagDetails,
      [name]: value,
    });
  };

  const handleChangeColor = (color) => {
    setTagDetails({
      ...tagDetails,
      color: color,
    });
  };
  console.log('tag', tagDetails);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    !id.length ?
    httpclient.post("tags", {
      name: tagDetails.name,
      color: tagDetails.color
    })
    .then(({ data }) => {
      if(data.success){
      setOpen(true);
      setSnackStatus("success");
      setSnackMessage(data.message);
      setTimeout(() => {
        navigate("/resources/tags");
      }, 1000);
    }else{
      setOpen(true);
      setSnackStatus("error");
      setSnackMessage(data.message);
    }
    }).catch(err => {
      setOpen(true);
      setSnackStatus("error");
      setSnackMessage(err.response.data.msg);
    })
    : 
    httpclient.put(`tags/${id}`, {
      name: tagDetails.name,
      color: tagDetails.color
    })
    .then(({ data }) => {
      if(data.success){
      setOpen(true);
      setSnackStatus("success");
      setSnackMessage(data.message);
      setTimeout(() => {
        navigate("/resources/tags");
      }, 1000);
    }else{
      setOpen(true);
      setSnackStatus("error");
      setSnackMessage(data.message);
    }
    }).catch(err => {
      setOpen(true);
      setSnackStatus("error");
      setSnackMessage(err.response.data.msg);
    })
  };

  return (
    <div>
      <h1>Add Tag</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <TextField
              variant="outlined"
              name="name"
              type="text"
              label="Name"
              value={tagDetails.name}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={12} md={12}>
            <Typography mt={2} mb={2} variant="h5">
              Select Color
            </Typography>
            <div style={{ width:"190px" }}>
            {colorList.map((color) => (
              <div
                onClick={() => handleChangeColor(color.color)}
                style={{
                  display: "inline-flex",
                  borderRadius:"50%",
                  border: tagDetails.color === color.color? "2px solid blue": "2px solid transparent",
                }}
              >
                <span
                  style={{
                    backgroundColor: color.color,
                    borderRadius: "50%",
                    padding: "15px",
                    margin: "3px",
                    display: "inline-block",

                  }}
                ></span>
              </div>
            ))}
            </div>
          </Grid>

          <Grid item sm={12}>
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

export default AddTag;
