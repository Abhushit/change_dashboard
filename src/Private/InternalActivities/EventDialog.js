import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import { width } from "@mui/system";
import moment from "moment";

function EventDialog(props) {
  // console.log("props", props);
  const [eventDetails, setEventDetails] = useState({
    open: true,
    save: false,
    delete: false,
    id: props?.eventData._id || "",
    title: props?.eventData.title || "",
    location: props?.eventData.location || "",
    bookable: props?.eventData.bookable || "",
    start: props?.eventData.start ? moment(props?.eventData.start).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm"),
    end: props?.eventData.end ? moment(props?.eventData.end).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm"),
    startDate: props?.eventData.start ? moment(props?.eventData.start).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm"),
    endDate: props?.eventData.start ? moment(props?.eventData.end).format("YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm"),
  });

  React.useEffect(() => {
    props.callBackEvent(eventDetails);
  },[eventDetails])

  const handleClose = () => {
    setEventDetails({
      ...eventDetails,
      open: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleChangeStart = (e) => {
    setEventDetails({
      ...eventDetails,
      start: e.target.value,
      startDate:new Date(e.target.value),
    });
  };

  const handleChangeEnd = (e) => {
    // console.log('end  dateee',new Date(Date.parse(e.target.value)))
    setEventDetails({
      ...eventDetails,
      end: e.target.value,
      endDate: new Date(e.target.value),
    });
  };
  const handleSave = () => {
    setEventDetails({
      ...eventDetails,
      save: true,
      open: false,
    });
  };

  const handleDelete = () => {
    setEventDetails({
      ...eventDetails,
      delete: true,
      open: false,
    });
  };
// console.log('eventDetails',eventDetails)

  return (
    <Dialog
      onClose={handleClose}
      open={eventDetails.open}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        New Event
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: "10px", top: "10px" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              value={eventDetails.title}
              variant="outlined"
              label="Title"
              onChange={handleChange}
              fullWidth
              sx={{ marginTop: "5px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="location"
              value={eventDetails.location}
              variant="outlined"
              label="Location"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="datetime-start"
              label="Start Date"
              type="datetime-local"
              value={eventDetails.start}
              // format="YYYY-MM-DD"
              // defaultValue="2017-05-24T10:30"
              // defaultValue={new Date()}
              sx={{ width: 250 }}
              onChange={handleChangeStart}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="datetime-end"
              label="End Date"
              type="datetime-local"
              value={eventDetails.end}
              // format="YYYY-MM-DD"
              // defaultValue="2017-05-24T10:30"
              sx={{ width: 250 }}
              defaultValue={new Date()}
              onChange={handleChangeEnd}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ marginTop: "10px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Bookable ?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="bookable"
                value={eventDetails.bookable}
                onChange={handleChange}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />

                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Box>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="primary"
            >
              Delete
            </Button>
          </Box>
          <Box>
            <Button color="primary" variant="outlined" onClick={handleSave} sx={{ marginRight:"5px" }}>
              Save
            </Button>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default EventDialog;
