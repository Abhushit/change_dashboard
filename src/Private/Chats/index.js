import { Add, AttachFile, Delete, Search, Send } from "@mui/icons-material";
import { Avatar, Card, Grid, IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { ThemeConsumer } from "styled-components";
import MemberSingle from "./MemberSingle";

const MainDiv = styled("div")(({ theme }) => ({
  // background: theme.palette.primary.main,
  // height:"670px",
  width: "100%",
}));

const MainCard = styled(Card)(({ theme }) => ({
  margin: "10px",
  borderRadius: "10px",
}));

const LeftCard = styled("div")(({ theme }) => ({
  background: theme.palette.primary.dark,
  height: "86vh",
  padding: "10px",
  overflowY: "auto",
}));

const RightCard = styled("div")(({ theme }) => ({
  background: theme.palette.primary.lighter,
  height: "86vh",
}));

const SearchDiv = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
  "& input": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "5px",
    padding: "10px 10px",
    border: `1px solid ${theme.palette.primary.dark}`,
    width: "100%",
    outline: "none",
    boxShadow: "none",
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  "& button": {
    backgroundColor: theme.palette.primary.lighter,
    border: "none",
    position: "absolute",
    right: "7px",
    transition: "0.3s",
    padding: "4px",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const ChatBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const ChatHead = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.darker,
  color: theme.palette.primary.light,
  padding: "10px",
  "& h3": {
    margin: "0",
  },
}));

const ChatBody = styled("div")(({ theme }) => ({
  flex: "1 1",
  overFlowY: "auto",
  padding: "30px",
}));

const ChatReceiver = styled("div")(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  padding: "10px",
  borderRadius: "10px",
  fontSize: "16px",
  marginLeft: "auto",
  width: "fit-content",
  wordBreak: "beak-all",
  marginBottom: "20px",
  position: "relative",
  "& strong": {
    color: theme.palette.primary.dark,
    position: "absolute",
    top: "-22px",
    left: "0",
  },
  "& p": {
    color: theme.palette.primary.dark,
    position: "absolute",
    bottom: "-35px",
    right: "0",
    fontSize: "14px",
  },
}));

const ChatSender = styled("div")(({ theme }) => ({
  fontSize: "16px",
  marginRight: "auto",
  width: "fit-content",
  wordBreak: "beak-all",
  marginBottom: "20px",
  marginTop: "60px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  "& span": {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    padding: "10px",
    borderRadius: "10px",
    marginLeft: "10px",
  },
  "& strong": {
    color: theme.palette.primary.dark,
    position: "absolute",
    top: "-22px",
    right: "0",
  },
  "& p": {
    color: theme.palette.primary.dark,
    position: "absolute",
    bottom: "-35px",
    right: "0",
    fontSize: "14px",
  },
}));

const ChatFooter = styled("div")(({ theme }) => ({
  background: theme.palette.primary.darker,
  color: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  padding: "10px",
}));

const FooterInput = styled("div")(({ theme }) => ({
  width: "100%",
  position: "relative",
  "& input": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "5px",
    padding: "10px 10px",
    border: `1px solid ${theme.palette.primary.dark}`,
    width: "100%",
    outline: "none",
    boxShadow: "none",
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  "& button": {
    position: "absolute",
    right: "0",
  },
}));

const AddMemberButton = styled("div")(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
  bottom: "40px",
  "& svg": {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    borderRadius: "50%",
    padding: "5px",
    fontSize:"38px"
  },
}));

const memberList = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Sara",
    message: "Please give me a call",
    time: "1 day ago",
  },
  {
    id: "2",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Kiara",
    message: "The booking is completed",
    time: "10 hours ago",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Jhon Flee",
    message: "task completed, please check",
    time: "25 minutes ago",
  },
  {
    id: "4",

    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Sara",
    message: "Please give me a call",
    time: "1 day ago",
  },
  {
    id: "5",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Kiara",
    message: "The booking is completed",
    time: "10 hours ago",
  },
  {
    id: "6",

    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Sara",
    message: "Please give me a call",
    time: "1 day ago",
  },
];

const Chats = () => {
  const [currentID, setCurrentID] = useState("");
  const [currImage, setCurrImage] = useState("");
  const handleMemberClick = (id) => {
    setCurrentID(id);
  };

  const handleDrop = (file) => {
    console.log("file", file);
    setCurrImage(file[0]);
  };

  return (
    <MainDiv>
      <MainCard>
        <Grid container>
          <Grid item xs={12} md={3}>
            <LeftCard>
              <SearchDiv>
                <input type="text" placeholder="Search" />
                <button>
                  <Search fontSize="small" />
                </button>
              </SearchDiv>
              <div style={{ overflowY: "auto" }}>
                {memberList.map((members, index) => (
                  <MemberSingle
                    key={members.id}
                    currentID={currentID}
                    handleMemberClick={handleMemberClick}
                    members={members}
                  />
                ))}
              </div>
              <AddMemberButton>
                <Add />
              </AddMemberButton>
            </LeftCard>
          </Grid>
          <Grid item xs={12} md={9}>
            <RightCard>
              <ChatBox>
                <ChatHead>
                  <h3>Sara Ginesis</h3>
                  <IconButton>
                    <Delete color="secondary" />
                  </IconButton>
                </ChatHead>
                <ChatBody>
                  <ChatReceiver>
                    <strong>Sara Ginesis</strong>
                    Hey there how are you?
                    <p>10:30 pm</p>
                  </ChatReceiver>
                  <ChatSender>
                    <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                    <strong>John Flee</strong>
                    <span>I am fine, thanks! I hope you are doing well.</span>
                    <p>10:35 pm</p>
                  </ChatSender>

                  <ChatReceiver>
                    <strong>Sara Ginesis</strong>
                    Yes Ofcourse
                    <p>10:40 pm</p>
                  </ChatReceiver>
                  <ChatSender>
                    <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                    <strong>John Flee</strong>
                    <span>
                      So, I want to know about the services you are providing.
                    </span>
                    <p>10:35 pm</p>
                  </ChatSender>
                </ChatBody>
                <ChatFooter>
                  <Dropzone
                    onDrop={handleDrop}
                    // accept="image/png, image/gif image/jpg" //whatever the file type needed
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragReject,
                      rejectedFiles,
                    }) => {
                      return (
                        <div>
                          {/* {roomTypes.image ? (
                        roomTypes.image.type ? (
                          <img
                            src={URL.createObjectURL(roomTypes.image)}
                            //   className={classes.imgClass}
                            alt={roomTypes.image.name}
                          />
                        ) : (
                          <img
                            src={roomTypes.image}
                            //   className={classes.imgClass}
                            alt={roomTypes.name}
                          />
                        )
                      ) : (
                        <UploadDiv {...getRootProps()}>
                          <input {...getInputProps()} />
                          <AddPhotoAlternateOutlined color="primary" />
                          <p>Upload Image here</p>
                        </UploadDiv>
                      )} */}
                          <IconButton {...getRootProps()}>
                            <input {...getInputProps()} />
                            <AttachFile color="secondary" />
                          </IconButton>
                        </div>
                      );
                    }}
                  </Dropzone>

                  <FooterInput>
                    <input type="text" placeholder="Search" />
                    <IconButton>
                      <Send fontSize="small" />
                    </IconButton>
                  </FooterInput>
                </ChatFooter>
              </ChatBox>
            </RightCard>
          </Grid>
        </Grid>
      </MainCard>
    </MainDiv>
  );
};

export default Chats;
