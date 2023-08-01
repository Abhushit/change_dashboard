import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";
import OptionMenu from "./OptionMenu";
import moment from "moment/moment";
import { KeyboardArrowDown, KeyboardArrowUp, Sell, UnfoldMore } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  "& svg": {
    position:"relative",
    top:"5px"
  },
  '&:last-child': {
    // paddingRight: 64,
    '& svg': {
      // display: 'none',
      color: theme.palette.primary.dark
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableComponent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    // console.log("props", props);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.columns.map((col, index) =>
                props.sort ?
                index === 0 ? 
                  <StyledTableCell onClick={() => props.handleSort(col.id)}>
                    {props.currentColumn === col.id ? <span style={{ fontWeight:"700" }}>{col.name}</span> : col.name}
                     {props.currentColumn === col.id ? props.direction === "asc" ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" /> : <UnfoldMore fontSize="small" />}  
                  </StyledTableCell>
                 : 
                  <StyledTableCell align="right" onClick={() => props.handleSort(col.id)}>
                    {props.currentColumn === col.id ? <span style={{ fontWeight:"700" }}>{col.name}</span> : col.name}
                     {props.currentColumn === col.id ? props.direction === "asc" ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" /> : <UnfoldMore fontSize="small" />}
                  </StyledTableCell>
                :
                index === 0 ? 
                  <StyledTableCell>
                    {col.name}
                  </StyledTableCell>
                 : 
                  <StyledTableCell align="right">
                    {col.name}
                  </StyledTableCell>
            
                
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={Math.random()}>
                  {props.columns.map((col, index) =>
                    (col.id === "image") ? (
                      index === 0 ? (
                        <StyledTableCell component="th" scope="row">
                          <img
                            src={typeof(row.image) === "string" ? row.image : row.image[0]}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            alt={row.firstname}
                          />
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="right">
                          <img
                            src={row.image}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            alt={row.firstname}
                          />
                        </StyledTableCell>
                      )
                    ) : index === 0 ? (
                      <StyledTableCell component="th" scope="row">
                        {row[col.id]}
                      </StyledTableCell>
                    ) : (
                      (col.id === "description" || col.id === "shortDescription" || col.id === "text") ?
                      <StyledTableCell align="left" sx={{ width:"500px", }}>
                        {(row[col.id].substring(0, 100) + (row[col.id].length > 100 ? "..." : ' ')).replaceAll(/<[^>]+>/g, '')}
                      </StyledTableCell>
                      :
                      (col.id === "status") ?
                      <StyledTableCell align="center">
                        <span
                            style={{
                              borderRadius:"8px",
                              padding:"6px 10px",
                              fontWeight:'600',
                              color:(row[col.id] === "Onsite" || row[col.id] === "Sent") ? "green": row[col.id] === "Checked-out" ? "red" : "#d9d921",
                              background: (row[col.id] === "Onsite" || row[col.id] === "Sent") ? "#c4ffc4" : row[col.id] === "Checked-out" ? "#ffdddd" : "#fff6d7",
                            }}
                          >
                            {row[col.id]}
                          </span>
                      </StyledTableCell>
                      :
                      (col.id === "icon") ?
                      <StyledTableCell align="center">
                          <img
                            src={row.icon}
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                            alt={row.title}
                          />
                        </StyledTableCell>
                      :
                      (col.id === "account") ?
                      <StyledTableCell align="center" >
                        {/* <span
                            style={{
                              borderRadius:"50%",
                              marginRight:"5px",
                              padding:"5px", 
                              display:"inline-block",
                              background: (row[col.id] === "User already logged in") ? "green" : row[col.id] === "Disabled" ? "red" : "yellow",
                            }}
                          >
                          </span> */}
                          <span style={{ background:row[col.id] === "active" ? "#11d400" : "#fa6868",
                          color:"#fff", padding:"5px 8px", borderRadius:"5px"
                        }} >{row[col.id]}</span>
                      </StyledTableCell>
                      :
                      // (col.id === "tags") ?
                      // <StyledTableCell align="right" sx={{ lineHeight:'2' }}>
                      //   {row[col.id].map((tag, index) => (
                      //     <span
                      //     style={{
                      //       backgroundColor: tag["color"],
                      //       color: "#fff",
                      //       padding: "0 5px",
                      //       borderRadius: "3px",
                      //       margin:"2px",
                      //       display:"inline-block"
                      //     }}
                      //   >
                      //     <Sell style={{ fontSize:"15px" }} /> {tag.name}
                      //   </span>
                      //   ))}
                        
                      // </StyledTableCell>
                      // :
                      <StyledTableCell align="right">
                        {col.id === "actions" &&
                          (props.multiAction ? (
                            row.role === "super admin" ?
                            <></>
                            :
                            <OptionMenu
                              row={row}
                              options={props.options}
                              currentChange={props.currentChange}
                            />
                          ) : (
                            <>
                              <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => props.handleEdit(row)}
                              >
                                Edit
                              </Button>
                              <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => props.handleDelete(row)}
                                sx={{ marginLeft: "10px" }}
                              >
                                Delete
                              </Button>
                            </>
                          ))}
                        {col.id === "active" ? (
                          row[col.id] === true ? (
                            "Yes"
                          ) : (
                            "NO"
                          )
                        ) : (col.id === "checkinDate" || col.id === "checkoutDate" || col.id === "deliveryDate" || col.id === "date") ? (
                          moment(row[col.id]).format(
                            "ddd, MMM Do YYYY, h:mm:ss a"
                          )
                        ) : 
                          // col.id === "tags" ? row[col.id].map((tag, index) => (tag.name + (index === row[col.id].length - 1 ? "" :","))) :
                          
                          // (col.id === "groups") ? row[col.id].map((group, index) => (group.name + (index === row[col.id].length - 1 ? "" :","))) :
                          // (col.id === "member") ? row[col.id].map((member, index) => (member.name + (index === row[col.id].length - 1 ? "" :","))) :
                          // (col.id === "members") ? row[col.id].map((member, index) => (member.name + (index === row[col.id].length - 1 ? "" :","))) :
                          col.id === "enabled" ? 
                          <>
                           <span
                            style={{
                              borderRadius:"50%",
                              marginRight:"5px",
                              padding:"5px", 
                              display:"inline-block",
                              background: (row[col.id] === "Enabled") ? "green" : "red",
                            }}
                          >
                          </span> 
                          <span>{row[col.id]}</span>
                          </>
                          :
                          col.id === "pageVisible" ?  
                          <span style={{ background:row[col.id] === true ? "#11d400" : "#fa6868",
                            color:"#fff", padding:"5px 8px", borderRadius:"5px"}} >{row[col.id] === true ? "Yes" : "No"}</span>
                          :
                          row[col.id]
                        }
                      </StyledTableCell>
                    )
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {props.footer !== false && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
