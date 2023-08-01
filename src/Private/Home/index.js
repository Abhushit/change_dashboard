import { AccountCircle, Chat, Mouse, Sync } from "@mui/icons-material";
import { Grid, MenuItem, Select, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import BarCard from "../../Components/BarCard";
import DashboardCard from "../../Components/DashboardCard";
import RevenueCard from "../../Components/RevenueCard";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .MuiSelect-select": {
    padding: "10px",
    width: "12a0px",
    background: theme.palette.primary.lighter,
  },
}));

const Home = () => {
  const [selected, setSelected] = useState("Week");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <Header>
        <h2>Dashboard Insights</h2>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={selected}
          // label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"Week"}>Last 1 Week</MenuItem>
          <MenuItem value={"Month"}>Last 1 Month</MenuItem>
          <MenuItem value={"Year"}>Last 1 Year</MenuItem>
        </Select>
      </Header>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <DashboardCard
            icon={<AccountCircle />}
            color="#c9f1bb"
            cardName="People Reached"
            value="256k"
            increase={true}
            percent="37.8%"
            time={selected}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <DashboardCard
            icon={<Sync />}
            color="#f0d5ff"
            cardName="Engagement"
            value="2.5x"
            decrease={true}
            percent="14.3%"
            time={selected}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <DashboardCard
            icon={<Chat />}
            color="#ffdf99"
            cardName="Comments"
            value="125"
            increase={true}
            percent="22%"
            time={selected}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <DashboardCard
            icon={<Mouse />}
            color="#b7f5ff"
            cardName="Links Clicked"
            value="95"
            decrease={true}
            percent="12.6%"
            time={selected}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Profits</h2>
          <BarCard />
        </Grid>
        <Grid item xs={12} md={6}>  
          <h2>Revenue</h2>
          <RevenueCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
