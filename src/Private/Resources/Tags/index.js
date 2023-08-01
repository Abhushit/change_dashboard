import { Box, Button, Grid, Snackbar, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Search } from "@mui/icons-material";
import TableComponentTags from "../../../Components/TableComponentTags";
import httpclient from "../../../utils/httpClient";
import DeleteDialog from "./DeleteDialog";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  // { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  // { id: "color", name: "Color" },
  { id: "actions", name: "Actions" },
];

const options = [
  { id: "edit", name: "Edit", action: "handleEdit" },
  { id: "delete", name: "Delete", action: "handleDelete" },
];

const rows = [
  {id: "1", name: "bug", color: "#2d9bf0" },
  {id: "2", name: "duplicate", color: "#3c3cf1",},
  {id: "3", name: "enhancement", color: "yellow"},
  {id: "4", name: "help wanted", color: "#00af00",},
  {id: "5", name: "question", color: "purple"},
  {id: "6", name: "invalid", color: "#ef3a3a",},
  {id: "7", name: "fix needed", color: "#00af00",},

]


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
    backgroundColor: theme.palette.primary.lighter,
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

const Tags = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedID, setSelectedID] = useState("");

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = () => {
    httpclient.get("tags").then(({data}) => {
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
    navigate(`/resources/add_tag`);
  };

  const handleEdit = (row) => {
    navigate(`/resources/add_tag/${row._id}`, {state: {row: row }});
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
    httpclient.delete(`tags/${selectedID}`).then(({data}) => {
      if(data.success){
        setOpen(true);
        setSnackStatus("success");
        setSnackMessage(data.message);
        setOpenDeleteDialog(false)
        setSelectedID("")
        getAllTags()
      }else{
        setOpen(true);
        setSnackStatus("error");
        setSnackMessage(data.message);
      }
    })
  }

  const currentChange = (value, row) => {
    if (value === "Edit") {
      handleEdit(row);
    }
    if (value === "Delete") {
      handleDelete(row);
    }
    
  };

  const handleKeyEnter = (e) => {
    if(e.key == "Enter"){
      handleSearch();
    }
  }

  const handleSearch = e => {
    httpclient.post("tags/search",{
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
          <h1>Tags</h1>
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
            <input type="text" placeholder="Search"
            value={searchText} onKeyDown={handleKeyEnter} onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>
              <Search fontSize="small" />
            </button>
          </SearchDiv>

          <Button color="primary" variant="outlined" onClick={handleAdd}>
            + Add New
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableComponentTags
            multiAction={true}
            columns={columns}
            rows={rows}
            currentChange={currentChange}
            options={options}
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

export default Tags;
