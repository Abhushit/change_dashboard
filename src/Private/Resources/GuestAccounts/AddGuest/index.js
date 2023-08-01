import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Snackbar
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import httpclient from "../../../../utils/httpClient";
import moment from "moment";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
}));

// const allTags = [
//   { id: "1", name: "bug", color: "#2d9bf0" },
//   { id: "2", name: "duplicate", color: "#3c3cf1" },
//   { id: "3", name: "enhancement", color: "yellow" },
//   { id: "4", name: "help wanted", color: "#00af00" },
//   { id: "5", name: "question", color: "purple" },
//   { id: "6", name: "invalid", color: "#ef3a3a" },
//   { id: "7", name: "fix needed", color: "#00af00" },
// ];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddGuest = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
    checkinDate: null,
    checkoutDate: null,
    stayDays: "",
    // room: "",
    // status: "",
    account: "",
    // tags: "",
  });


  useEffect(() => {
    if (location.state) {
      setGuestDetails({
        name: location.state.row.name,
        email: location.state.row.email,
        phone: location.state.row.phone,
        checkinDate: moment(location.state.row.checkinDate).format("YYYY-MM-DD"),
        checkoutDate: moment(location.state.row.checkoutDate).format("YYYY-MM-DD"),
        stayDays: location.state.row.stayDays,
        // room: location.state.row.room,
        // status: location.state.row.status,
        account: location.state.row.account,
        // tags: location.state.row.tags.map((tag, index) => tag.name),
      });
      // setTags(location.state.row.tags);
      setId(location.state.row._id);
    }
    // getAllTags();
  }, []);

  // console.log('guestDetails',guestDetails);

  // const getAllTags = () => {
  //   httpclient.get("tags").then(({data}) => {
  //     if(data.success){
  //       setAllTags(data.data)
  //     }
  //   })
  // }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGuestDetails({
      ...guestDetails,
      [name]: value,
    });
  };

  const handleDeleteTag = (data) => {
    // console.log("data", data);
    let res = tags.filter(tag => tag._id !== data._id);
    setTags(res);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    !id.length ?
    httpclient
      .post("guest_accounts", {
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone,
        checkinDate: guestDetails.checkinDate,
        checkoutDate: guestDetails.checkoutDate,
        stayDays: guestDetails.stayDays,
        // room: guestDetails.room,
        // status: guestDetails.status,
        account: guestDetails.account,
        // tags: tags.map(tag => tag._id),
      })
      .then(({ data }) => {
        if(data.success){
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setTimeout(() => {
          navigate("/resources/guest_accounts");
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
    httpclient
      .put(`guest_accounts/${id}`, {
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone,
        checkinDate: guestDetails.checkinDate,
        checkoutDate: guestDetails.checkoutDate,
        stayDays: guestDetails.stayDays,
        // room: guestDetails.room,
        // status: guestDetails.status,
        account: guestDetails.account,
        // tags: tags.map(tag => tag._id),
      })
      .then(({ data }) => {
        if(data.success){
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setTimeout(() => {
          navigate("/resources/guest_accounts");
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
      <h1>Add Guest Account</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="name"
              type="text"
              label="Name"
              value={guestDetails.name}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="email"
              type="email"
              label="Email"
              value={guestDetails.email}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="phone"
              type="text"
              label="Phone"
              value={guestDetails.phone}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="stayDays"
              type="text"
              label="Number of days in stay"
              value={guestDetails.stayDays}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="checkinDate"
              type="date"
              label="Checkin Date"
              value={guestDetails.checkinDate && guestDetails.checkinDate}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="checkoutDate"
              type="date"
              label="Checkout Date"
              value={guestDetails.checkoutDate && guestDetails.checkoutDate}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              name="room"
              type="text"
              label="Room"
              value={guestDetails.room}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              options={allTags}
              // defaultValue={[top100Films[13]]}
              getOptionLabel={(option) => option.name}
              value={tags}
              onChange={(e, tags) => setTags(tags)}
              renderTags={() => null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Tags"
                />
              )}
            />
            <Box
              mt={1}
              sx={{
                "& > :not(:last-child)": { marginRight: 1 },
                "& > *": { marginBottom: 1 },
              }}
            >
              {tags.map((tag) => (
                <Chip
                  // icon={<Close fontSize="small" style={{ color:"#fff" }} />}
                  key={tag.name}
                  label={tag.name}
                  onDelete={() => handleDeleteTag(tag)}
                  style={{ background: tag.color, color:"#fff", cursor:"pointer" }}
                />
              ))}
            </Box>
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={guestDetails.status}
                name="status"
                label="Status"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="Not yet checked in">
                  Not yet checked in
                </MenuItem>
                <MenuItem value="Onsite">Onsite</MenuItem>
                <MenuItem value="Checked-out">Checked-out</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Account</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={guestDetails.account}
                name="account"
                label="Account"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>Select Account</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
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

export default AddGuest;
