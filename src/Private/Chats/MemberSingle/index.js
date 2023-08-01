import { Avatar, styled } from "@mui/material";
import React, { useState } from "react";

const AvatarDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& div": {
    marginLeft: "10px",
  },
  "& h3": {
    margin: "0",
    fontSize: "15px",
  },
  "& p": {
    margin: "0",
    fontSize: "12px",
  },
}));


const MemberSingle = (props) => {
  console.log('currentID',props.currentID);
  const MemberFlex = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "15px 0",
    borderBottom: `1px solid ${theme.palette.primary.darker}`,
    color: theme.palette.primary.lighter,
    background: props.members.id === props.currentID ? theme.palette.primary.darker : theme.palette.primary.dark, 
    cursor:"pointer",
    opacity:"0.8",
    transition:"0.3s",
    "& p": {
      fontSize: "12px",
      margin:"0"
    },
    "&:hover":{
      opacity:"1",
    }
  }));

  return (
    <MemberFlex
      onClick={() => props.handleMemberClick(props.members.id)}
    //   style={{ 
    //     background: (props.members.id === currentID) ? "#19181a" : "#2f2e34",
    //    }}
    >
      <AvatarDiv>
        <Avatar src={props.members.image} alt={props.members.name} />
        <div>
          <h3>{props.members.name}</h3>
          <p>{props.members.message}</p>
        </div>
      </AvatarDiv>
      <div style={{ position:"relative", top:"-10px" }}>
        <p>{props.members.time}</p>
      </div>
    </MemberFlex>
  );
};

export default MemberSingle;
