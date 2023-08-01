import { Box, Button, Grid, Snackbar, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../../Components/TableComponent";
import MuiAlert from "@mui/material/Alert";
import { Search } from "@mui/icons-material";
import httpclient from "../../../utils/httpClient";
import DeleteDialog from "./DeleteDialog";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  // { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
  { id: "checkinDate", name: "Checkin Date" },
  { id: "checkoutDate", name: "Checkout Date" },
  { id: "stayDays", name: "Stay days" },
  // { id: "room", name: "Room" },
  // { id: "status", name: "Status" },
  { id: "account", name: "Account" },
  // { id: "tags", name: "Tags" },
  { id: "actions", name: "Actions" },
];


const SearchDiv = styled("div")(({theme}) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginRight:"10px",
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
  "& button":{
    backgroundColor: theme.palette.primary.light,
    border: "none",
    position: "absolute",
    right:"7px",
    transition: "0.3s",
    padding: "4px",
    cursor:"pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  }
}))

const GuestAccounts = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedID, setSelectedID] = useState("");

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [currentColumn, setCurrentColumn] = useState("");
  const [direction, setDirection] = useState("asc" || "desc");

  const [rows, setRows] = useState([]);

  
const options = [
  { id: "edit", name: "Edit", action: "handleEdit" },
  // { id: "enable", name: "Enable", action: "handleEnable" },
  { id: "force_expire", name: "Force Expire", action: "handleForceExpire" },
  { id: "delete", name: "Delete", action: "handleDelete" },
];


  useEffect(() => {
    // setRows(rowsData);
    getAllGuests();
  }, []);

  const getAllGuests = () => {
    httpclient.get("guest_accounts").then(({data}) => {
      if(data.success){
        setRows(data.data);
      }
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAdd = () => {
    navigate(`/resources/add_guest`);
  };

  const handleEdit = (row) => {
    navigate(`/resources/add_guest/${row._id}`, {state: {row: row }});
  }

  const handleForceExpire = (row) => {
    console.log('row', row)
    httpclient.put(`guest_accounts/${row._id}`, {
      account: row.account === "active" ? "expired" : "active"
    }).then(({data}) => {
      if(data.success){
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setTimeout(() => {
          getAllGuests();
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
    // navigate(`/resources/add_guests/${row.id}`, {state: {row: row }});
  }


  const handleDelete = (row) => {
      setOpenDeleteDialog(true);
    setSelectedID(row._id);
  }

    const sendToDelete = (call) => {
    if(call.delete === true){
      handleDeleteFinal();
    }
    if(call.open === false){
      setOpenDeleteDialog(false)
      setSelectedID("")
    }
  }

  const handleDeleteFinal = () => {
    httpclient.delete(`guest_accounts/${selectedID}`).then(({data}) => {
      if(data.success){
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setOpenDeleteDialog(false)
        setSelectedID("")
        getAllGuests()
      }else{
        setOpen(true);
        setSnackStatus("error");
        setSnackMessage(data.message);
      }
    })
  }


  const currentChange = (value, row) => {
    console.log('value', value);
    if (value === "Edit") {
      handleEdit(row);
    }
    if (value === "Force Expire") {
      handleForceExpire(row);
    }
    if (value === "Delete") {
      handleDelete(row);
    }
  };

  const handleSort = (col) => {
    setDirection(prev => prev === "asc" ? "desc" : "asc");
    setCurrentColumn(col);

    direction === "asc" ?
    rows && rows.sort((a, b) => (a[col] > b[col] ? 1 : -1))
    :
    rows && rows.sort((a, b) => (a[col] < b[col] ? 1 : -1));
  }

    const handleKeyEnter = (e) => {
    if(e.key == "Enter"){
      handleSearch();
    }
  }

  const handleSearch = e => {
    // e.preventDefault();
    httpclient.post("guest_accounts/search",{
      search: searchText
    }).then(({data}) => {
      if(data.success){
        setRows(data.data);
      }
    })
  }


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <h1>Guest Accounts</h1>
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
            <input type="text" placeholder="Search"  value={searchText} onKeyDown={handleKeyEnter} onChange={(e) => setSearchText(e.target.value)}  />
            <button onClick={handleSearch}>
              <Search fontSize="small" />
            </button>
          </SearchDiv>

          <Button color="primary" variant="outlined" onClick={handleAdd}>
            + Add New
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableComponent
            multiAction={true}
            columns={columns}
            rows={rows}
            currentChange={currentChange}
            options={options}
            sort={true}
            handleSort={handleSort}
            currentColumn={currentColumn}
            direction={direction}
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

export default GuestAccounts;
