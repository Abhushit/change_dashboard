import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import TableComponentSubs from "../../../Components/TableComponentSubs";

// TABS

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
// TABS

//CSS
const MyContent = styled("div")(({ theme }) => ({
  lineHeight: "2",
  padding: "20px",
  "& h2": {
    margin: "0",
    paddingBottom: "20px",
  },
}));
//CSS

const columnsAddOns = [
  // { id: "id", name: "ID" },
  { id: "item", name: "Item" },
  { id: "quantity", name: "Quantity" },
  { id: "unitCost", name: "Unit Cost" },
];

const rowsAddOns = [
  {
    id: "1",
    item: "Web Hosting",
    quantity: "10",
    unitCost: "$22",
  },
];

const columnsInvoice = [
  // { id: "id", name: "ID" },
  { id: "invoice", name: "Invoice" },
  { id: "date", name: "Date" },
  { id: "total", name: "Total" },
  { id: "status", name: "Status" },
];

const rowsInvoice = [
  {
    id: "1",
    invoice: "Inv-213",
    date: "2022-10-23",
    total: "$190",
    status: "Paid",
  },
  {
    id: "2",
    invoice: "Inv-123",
    date: "2022-09-10",
    total: "$210",
    status: "Paid",
  },
  {
    id: "3",
    invoice: "Inv-189",
    date: "2022-7-19",
    total: "$100",
    status: "Paid",
  },
  {
    id: "4",
    invoice: "Inv-222",
    date: "2022-10-10",
    total: "$170",
    status: "Paid",
  },
];

const Billing = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <h1>Billing & Subscription</h1>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Summary" {...a11yProps(0)} />
              <Tab label="History" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card p={2}>
                  <MyContent>
                    <h2>Subscription Details</h2>
                    <div>
                      <span style={{ marginRight: "5px" }}>Customer -</span>{" "}
                      <span style={{ color: "blue" }}>Standard Trading Co</span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Status </span>
                      <span
                        style={{
                          padding: "4px 8px",
                          border: "1px solid green",
                          borderRadius: "5px",
                          color: "green",
                          fontSize: "13px",
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Plan - </span>{" "}
                      <span>
                        <strong> Pro</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Amount - </span>{" "}
                      <span>
                        <strong>$200 every 1 month</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>
                        Current Period -{" "}
                      </span>{" "}
                      <span>
                        <strong>Nov 10 2022 - Dec 10 2022</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Start Date - </span>{" "}
                      <span>
                        <strong>Dec 10 2022</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Quantity - </span>{" "}
                      <span>
                        <strong>1</strong>
                      </span>
                    </div>
                  </MyContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box pb={3}>
                  <h2 style={{ margin:"0" }}>Add Ons</h2>
                  <TableComponentSubs
                    footer={false}
                    columns={columnsAddOns}
                    rows={rowsAddOns}
                  />
                </Box>
                <Box pb={3}>
                  <h2 style={{ margin:"0" }}>Invoices</h2>
                  <TableComponentSubs
                    footer={false}
                    columns={columnsInvoice}
                    rows={rowsInvoice}
                  />
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card p={2}>
                  <MyContent>
                    <h2>Subscription Details</h2>
                    <div>
                      <span style={{ marginRight: "5px" }}>Customer -</span>{" "}
                      <span style={{ color: "blue" }}>Standard Trading Co</span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Status </span>
                      <span
                        style={{
                          padding: "4px 8px",
                          border: "1px solid green",
                          borderRadius: "5px",
                          color: "green",
                          fontSize: "13px",
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Plan - </span>{" "}
                      <span>
                        <strong> Pro</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Amount - </span>{" "}
                      <span>
                        <strong>$200 every 1 month</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>
                        Current Period -{" "}
                      </span>{" "}
                      <span>
                        <strong>Nov 10 2022 - Dec 10 2022</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Start Date - </span>{" "}
                      <span>
                        <strong>Dec 10 2022</strong>
                      </span>
                    </div>
                    <div>
                      <span style={{ marginRight: "5px" }}>Quantity - </span>{" "}
                      <span>
                        <strong>1</strong>
                      </span>
                    </div>
                  </MyContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box pb={3}>
                  <h2 style={{ margin:"0" }}>Add Ons</h2>
                  <TableComponentSubs
                    footer={false}
                    columns={columnsAddOns}
                    rows={rowsAddOns}
                  />
                </Box>
                <Box pb={3}>
                  <h2 style={{ margin:"0" }}>Invoices</h2>
                  <TableComponentSubs
                    footer={false}
                    columns={columnsInvoice}
                    rows={rowsInvoice}
                  />
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Billing;
