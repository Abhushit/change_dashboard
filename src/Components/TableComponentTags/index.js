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
import moment from "moment/moment";
import { Sell } from "@mui/icons-material";
import OptionMenu from "../TableComponentTags/OptionMenu";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  "& svg": {
    fontSize: "14px",
    position: "relative",
    top: "3px",
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

export default function TableComponentTags(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("props", props);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.columns.map((col, index) =>
                index === 0 ? (
                  <StyledTableCell>{col.name}</StyledTableCell>
                ) : (
                  <StyledTableCell align="right">{col.name}</StyledTableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={Math.random()}>
                  {props.columns.map((col, index) =>
                    col.id === "image" ? (
                      index === 0 ? (
                        <StyledTableCell component="th" scope="row">
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
                        {/* {row[col.id]} */}
                        <span
                          style={{
                            backgroundColor: row["color"],
                            color: "#fff",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
                        >
                          {" "}
                          <Sell fontSize="small" /> {row[col.id]}{" "}
                        </span>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="right">
                        {col.id === "actions" && 
                        (props.multiAction ? (
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
