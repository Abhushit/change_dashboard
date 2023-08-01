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
  { id: "userName", name: "Username" },
  { id: "jobTitle", name: "Job Title" },
  { id: "email", name: "Email" },
  { id: "role", name: "Role" },
  { id: "actions", name: "Actions" },
];

const options = [
  { id: "edit", name: "Edit", action: "handleEdit" },
  { id: "delete", name: "Delete", action: "handleDelete" },
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
    backgroundColor: "transparent",
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

const StaffUsers = () => {
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

  useEffect(() => {
    getAllStaffs();
    // setRows(rowsData);
  }, []);

  const getAllStaffs = () => {
    httpclient.get("users").then(({data}) => {
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
    navigate(`/resources/add_staff`);
  };

  const handleEdit = (row) => {
    console.log('row', row)
    navigate(`/resources/add_staff/${row._id}`, {state: {row: row }});
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
    httpclient.delete(`user/${selectedID}`).then(({data}) => {
      if(data.success){
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setOpenDeleteDialog(false)
        setSelectedID("")
        getAllStaffs()
      }else{
        setOpen(true);
        setSnackStatus("error");
        setSnackMessage(data.message);
      }
    })
  }

  const currentChange = (value, row) => {
    // console.log('value', value);
    if (value === "Edit") {
      handleEdit(row);
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
    httpclient.post("users/search",{
      search: searchText
    }).then(({data}) => {
      if(data.success){
        setRows(data.data);
      }
    })
  }
 
  // console.log('direction',direction)
  // console.log('curent col', currentColumn)

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <h1>Staff Users and Roles</h1>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <SearchDiv>
            <input type="text" placeholder="Search" value={searchText} onKeyDown={handleKeyEnter} onChange={(e) => setSearchText(e.target.value)} />
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
            options={options}
            columns={columns}
            rows={rows}
            currentChange={currentChange}
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

export default StaffUsers;
