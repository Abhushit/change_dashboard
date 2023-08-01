import { Card, styled, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

// const styles = (theme) => ({
//   root: {
//     borderRadius: "5px",
//     boxShadow: theme.palette.primary.shadow,
//     padding: theme.spacing(3),
//   },
//   flex: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   color:{
//     color: theme.palette.primary.dark,    
//   },
//   this:{
//       marginRight: theme.spacing(3),
//   },
//   header:{
//       marginBottom: theme.spacing(2),
//   }
// });

const RootCard = styled(Card)(({ theme }) => ({
  borderRadius: "5px",
  boxShadow: theme.palette.primary.shadow,
  padding: theme.spacing(3),
  background: theme.palette.primary.lighter
}));


const RevenueCard = (props) => {
   const state = {
      series: [
        {
          name: "This Month",
          data: [45, 52, 38, 24, 33, 26, 21, 20],
        },
        {
          name: "Last Month",
          data: [35, 41, 62, 42, 13, 18, 29, 37],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["#fb434f", "f1f1f1"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [4,3],
          curve: "smooth",
          dashArray: [0, 8],
        },
        legend: {
          show: false,
        },
        markers: {
          show: false,
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: false,
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };

    return (
      <div>
        <RootCard>
            {/* <Typography variant="h5" mb={3}>Revenue</Typography> */}
          <div style={{ display:"flex",flexDirection: "row" }}>
            <div style={{ marginRight:'15px' }}>
              <Typography>This Month</Typography>
              <Typography variant="h5" style={{ color:"rgb(78 166 29)" }}><small>$</small>12,450</Typography>
            </div>
            <div>
              <Typography>Last Month</Typography>
              <Typography variant="h5"><small>$</small>9,125</Typography>
            </div>
          </div>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={345}
          />
        </RootCard>
      </div>
    );
}
export default (RevenueCard);
