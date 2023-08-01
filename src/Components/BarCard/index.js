import { Card, styled, Typography } from "@mui/material";
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

// const styles = (theme) => ({
//   root: {
//     borderRadius: "5px",
//     boxShadow: theme.palette.primary.shadow,
//     padding: theme.spacing(3),
//   },
//   header: {
//     marginBottom: theme.spacing(2),
//   },
// });

const RootCard = styled(Card)(({theme}) => ({
  borderRadius:"5px",
  boxShadow: theme.palette.primary.shadow,
  padding: theme.spacing(3),
  background: theme.palette.primary.lighter
}))



const BarCard = () => {
    var state = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        grid: {
          borderColor: "#f1f1f1",
        },
        colors: ["#938cf4", "#fb434f", "#f19e43"],
        markers: {
          show: false,
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    };
    return (
      <RootCard>
        {/* <Typography variant="h5" mb={3}>Profit</Typography> */}
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={400}
        />
      </RootCard>
    );
}

export default BarCard;
