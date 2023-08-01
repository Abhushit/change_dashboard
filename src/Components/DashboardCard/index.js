import { ArrowDownward, ArrowUpward, Info } from "@mui/icons-material";
import { Card, styled } from "@mui/material";
import React from "react";

const CardDiv = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: theme.palette.primary.shadow,
  background: theme.palette.primary.lighter,
  borderRadius: "5px",
  height:"100%",
  "& h2": {
    margin: "0",
    fontSize: "38px",
  },
}));

const InfoDiv = styled("div")(({ theme }) => ({
  padding: "5px 0",
  "& svg": {
    fontSize: "16px",
    position: "relative",
    top: "3px",
  },
}));

const StatusDiv = styled("div")(({ theme }) => ({
  background: theme.palette.primary.light,
  borderRadius: "2px",
  padding: "1px 7px",
  fontSize: "15px",
  display: "inline-block",
  "& svg": {
    fontSize: "18px",
    position: "relative",
    top: "3px",
  },
}));

const DashboardCard = (props) => {
  const TopIcon = styled("div")(({ theme }) => ({
    "& svg": {
      background: props.color,
      padding: "12px",
      borderRadius: "50%",
      fontSize: "47px",
    },
  }));

  return (
    <CardDiv>
      <TopIcon>{props.icon}</TopIcon>
      <InfoDiv>
        {props.cardName} <Info />
      </InfoDiv>
      <h2>{props.value}</h2>
      <StatusDiv>
        {props.increase && (
          <span style={{ color: "green" }}>
            <ArrowUpward /> {props.percent}
          </span>
        )}
        {props.decrease && (
          <span style={{ color: "red" }}>
            <ArrowDownward /> {props.percent}
          </span>
        )}
        <span> this {props.time}</span>
      </StatusDiv>
    </CardDiv>
  );
};

export default DashboardCard;
