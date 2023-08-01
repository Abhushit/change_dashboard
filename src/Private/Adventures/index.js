import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  styled,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import {
  AcUnit,
  AddToQueue,
  AdminPanelSettings,
  Aod,
  Search,
} from "@mui/icons-material";
import TableComponent from "../../Components/TableComponent";
import httpclient from "../../utils/httpClient";
import DeleteDialog from "../SendPushNotification/DeleteDialog";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  // { id: "id", name: "ID" },
  { id: "image", name: "Picture" },
  { id: "title", name: "Title" },
  { id: "description", name: "Description" },
  { id: "location", name: "Location" },
  { id: "price", name: "Price" },
  { id: "enabled", name: "Enabled" },
  { id: "bookable", name: "Bookable" },
  { id: "actions", name: "Actions" },
];

const options = [
  { id: "edit", name: "Edit", action: "handleEdit" },
  { id: "delete", name: "Delete", action: "handleDelete" },
];

const SearchDiv = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginRight: "10px",
  "& input": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "12px",
    padding: "10px 10px",
    border: `1px solid ${theme.palette.primary.dark}`,
    width: "100%",
    outline: "none",
    boxShadow: "none",
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  "& button": {
    backgroundColor: theme.palette.primary.light,
    border: "none",
    position: "absolute",
    right: "7px",
    transition: "0.3s",
    padding: "4px",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Adventures = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleID, setVisibleID] = useState("");

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllAdventures();
    getPageVisible();
  }, []);

  const getPageVisible = () => {
    httpclient.get("adventure_visible").then(({ data }) => {
      if (data) {
        setVisibleID(data.data[0]._id);
        setVisible(data.data[0].pageVisible);
      }
    });
  };

  const getAllAdventures = () => {
    httpclient.get("adventure").then(({ data }) => {
      if (data.success) {
        setRows(data.data);
      }
    });
  };

  const handleSwitch = (e) => {
    setVisible(e.target.checked);
    httpclient
      .put(`/adventure_visible/${visibleID}`, {
        pageVisible: e.target.checked,
      })
      .then(({ data }) => {
        if (data.success) {
          setOpen(true);
          setSnackStatus("success");
          setSnackMessage(data.message);
        } else {
          setOpen(true);
          setSnackStatus("error");
          setSnackMessage(data.message);
        }
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAdd = () => {
    navigate(`/adventures_day_trips/add_adventures_day_trips`);
  };

  const handleEdit = (row) => {
    console.log("row", row);
    navigate(`/adventures_day_trips/add_adventures_day_trips/${row._id}`, {
      state: { row: row },
    });
  };

  const handleDelete = (row) => {
    setOpenDeleteDialog(true);
    setSelectedID(row._id);
  };

  const sendToDelete = (call) => {
    if (call.delete === true) {
      handleDeleteFinal();
    }
    if (call.open === false) {
      setOpenDeleteDialog(false);
      setSelectedID("");
    }
  };

  const handleDeleteFinal = () => {
    httpclient.delete(`adventure/${selectedID}`).then(({ data }) => {
      if (data.success) {
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setOpenDeleteDialog(false);
        setSelectedID("");
        getAllAdventures();
      } else {
        setOpen(true);
        setSnackStatus("error");
        setSnackMessage(data.message);
      }
    });
  };

  const currentChange = (value, row) => {
    if (value === "Edit") {
      handleEdit(row);
    }
    if (value === "Delete") {
      handleDelete(row);
    }
  };

  const handleKeyEnter = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  const handleSearch = (e) => {
    // e.preventDefault();
    httpclient
      .post("adventure/search", {
        search: searchText,
      })
      .then(({ data }) => {
        if (data.success) {
          setRows(data.data);
        }
      });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <h1>Adventures & Day Trips</h1>
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <SearchDiv>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onKeyDown={handleKeyEnter}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>
              <Search fontSize="small" />
            </button>
          </SearchDiv>

          <Button color="primary" variant="outlined" onClick={handleAdd}>
            + Add new
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={handleSwitch}
                  value={visible}
                  checked={visible}
                />
              }
              label="Page Visible in App"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <TableComponent
            multiAction={true}
            options={options}
            currentChange={currentChange}
            columns={columns}
            rows={rows}
          />
        </Grid>
      </Grid>

      {openDeleteDialog && <DeleteDialog sendToDelete={sendToDelete} />}

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

export default Adventures;
