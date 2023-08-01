import { Add, AddPhotoAlternateOutlined, Clear } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Tooltip,
  Snackbar,
  Chip
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import MuiAlert from "@mui/material/Alert";
import httpclient from "../../../utils/httpClient";
import moment from "moment";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
  [theme.breakpoints.down("md")]: {
    padding:"20px"
  },
}));

const DropzoneDiv = styled("div")({
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  });
  
  const UploadDiv = styled("div")({
    cursor: "pointer",
    textAlign: "center",
    padding: "40px 0",
    border: `1px solid #999`,
    borderRadius: "5px",
    "&:hover": {
      border: `1px solid #333`,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "45px",
    },
  });

  
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddAnnouncement = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  // const[tags, setTags] = useState([]);
  // const[allTags, setAllTags] = useState([]);
  // const[allMembers, setAllMembers] = useState([]);
  // const[allGroups, setAllGroups] = useState([]);
  const [announcement, setAnnouncement] = useState({
    title: "",
    text: "",
    image: "",
    date: null,
    // members: [""],
    // membersID: [""],
    // tags: [""],
    // groups: [""],
    // groupsID: [""],
  });
  
  // useEffect(() => {
  //   getAllMembers();
  //   getAllTags();
  //   getAllGroups();
  // },[])


  // const getAllTags = () => {
  //   httpclient.get("tags").then(({data}) => {
  //     if(data.success){
  //       setAllTags(data.data)
  //     }
  //   })
  // }

  // const getAllMembers = () => {
  //   httpclient.get("guest_accounts").then(({data}) => {
  //     if(data.success){
  //       setAllMembers(data.data)
  //     }
  //   })
  // }

  // const getAllGroups = () => {
  //   httpclient.get("groups").then(({data}) => {
  //     if(data.success){
  //       setAllGroups(data.data)
  //     }
  //   })
  // }
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useMemo(() => {
    if (location.state) {
      setAnnouncement({
        title: location.state.row.title,
        text: location.state.row.text,
        date: moment(location.state.row.date).format("YYYY-MM-DD"),
        image: location.state.row.image,
        // members: location.state.row.members.map((mem) => mem.name),
        // membersID: location.state.row.members.map((mem) => mem._id),
        // tags: location.state.row.tags.map((tag) => tag.name),
        // groups: location.state.row.groups.map((grp) => grp.name),
        // groupsID: location.state.row.groups.map((grp) => grp._id),
      });
      // setTags(location.state.row.tags);
      setId(location.state.row._id);
    }
  }, []);


  const handleEditorChange = (e, editor) => {
    // console.log('editor', editor)
    const data = editor.getData();
    setAnnouncement({
      ...announcement,
      description: data,
    });
  };

  //Normal handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAnnouncement({
      ...announcement,
      [name]: value,
    });
  };

  //handling changes for members
  // const handleChangeMemberValue = (index, value) => {
  //   if (value === null) {
  //     announcement.members[index] = "";
  //     announcement.membersID[index] = "";
  //   } else {
  //     announcement.members[index] = value.name;
  //     announcement.membersID[index] = value._id;
  //   }
  //   setAnnouncement({
  //     ...announcement,
  //     members: announcement.members,
  //     membersID: announcement.membersID,
  //   });
  // };

  // const handleChangeName = (e, index, value) => {
  //   announcement.members[index] = e.target.value;
  //   setAnnouncement({
  //     ...announcement,
  //     members: announcement.members,
  //   });
  // };

  // const handleAddMore = () => {
  //   setAnnouncement({
  //     ...announcement,
  //     members: [...announcement.members, ""],
  //     membersID: [...announcement.membersID, ""],
  //   });
  // };

  // const handleCancel = (e, index) => {
  //   var array = announcement.members;
  //   var cancel = array.splice(index, 1);
  //   var array1 = announcement.membersID;
  //   var cancel1 = array1.splice(index, 1);
  //   setAnnouncement({
  //     ...announcement,
  //     members: array,
  //     membersID: array1,
  //   });
  // };
  //handling changes for members

  //handling changes for groups
  // const handleChangeGroupsValue = (index, value) => {
  //   if (value === null) {
  //     announcement.groups[index] = "";
  //     announcement.groupsID[index] = "";

  //   } else {
  //     announcement.groups[index] = value.name;
  //     announcement.groupsID[index] = value._id;
  //   }
  //   setAnnouncement({
  //     ...announcement,
  //     groups: announcement.groups,
  //     groupsID: announcement.groupsID,
  //   });
  // };

  // const handleChangeGroup = (e, index) => {
  //   announcement.groups[index] = e.target.value;
  //   setAnnouncement({
  //     ...announcement,
  //     groups: announcement.groups,
  //   });
  // };

  // const handleAddMoreGroup = () => {
  //   setAnnouncement({
  //     ...announcement,
  //     groups: [...announcement.groups, ""],
  //     groupsID: [...announcement.groupsID, ""],
  //   });
  // };

  // const handleCancelGroup = (e, index) => {
  //   var array = announcement.groups;
  //   var cancel = array.splice(index, 1);
  //   var array1 = announcement.groupsID;
  //   var cancel1 = array1.splice(index, 1);
  //   setAnnouncement({
  //     ...announcement,
  //     groups: array,
  //     groupsID: array1
  //   });
  // };
  //handling changes for groups

  
  const handleBack = () => {
    navigate(-1);
  };

  
  // const handleDeleteTag = (data) => {
  //   // console.log("data", data);
  //   let res = tags.filter(tag => tag._id !== data._id);
  //   setTags(res);
  // };


  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("title", announcement.title);
    formData.append("text", announcement.text);
    formData.append("deliveryDate", announcement.date);
    // announcement.membersID.map(mem => {
    //   formData.append("members", mem);
    // })
    // announcement.groupsID.map(grp => {
    //   formData.append("groups", grp);
    // })
    // tags.map(tag => {
    //   formData.append("tags", tag._id);
    // })
    formData.append("image", announcement.image);

    !id.length
    ? httpclient
        .post("announcements", formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/announcements");
            }, 1000);
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        })
        .catch((err) => {
          setOpen(true);
          setSnackStatus("error");
          setSnackMessage(err.response.data.msg);
        })
    : httpclient
        .put(`announcements/${id}`,formData)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/announcements");
            }, 1000);
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        })
        .catch((err) => {
          setOpen(true);
          setSnackStatus("error");
          setSnackMessage(err.response.data.msg);
        });

  };

  const handleDrop = (file) => {
    console.log("file", file);
    setAnnouncement({
      ...announcement,
      image: file[0],
    });
  };

  const handleResetImage = () => {
    setAnnouncement({
      ...announcement,
      image: "",
    });
  };


  // console.log('loca',location.state)
  console.log("group", announcement);

  return (
    <div>
      <h1>Add Announcement</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={announcement.title}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              multiline
              rows={5}
              variant="outlined"
              name="text"
              type="text"
              label="text"
              value={announcement.text}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="date"
              type="date"
              label="Date"
              value={announcement.date}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
          <DropzoneDiv>
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
                      {announcement.image ? (
                        announcement.image.type ? (
                          <img
                            src={URL.createObjectURL(announcement.image)}
                            //   className={classes.imgClass}
                            alt={announcement.image.name}
                          />
                        ) : (
                          <img
                            src={announcement.image}
                            //   className={classes.imgClass}
                            alt={announcement.name}
                          />
                        )
                      ) : (
                        <UploadDiv {...getRootProps()}>
                          <input {...getInputProps()} />
                          <AddPhotoAlternateOutlined color="primary" />
                          <p>Upload Image here</p>
                        </UploadDiv>
                      )}
                      <div style={{ textAlign: "center", marginTop: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setAnnouncement({
                              ...announcement,
                              image: "",
                            })
                          }
                        >
                          {" "}
                          Reset Image
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </Dropzone>
            </DropzoneDiv>
          </Grid>
          {/* 
          <Grid item xs={12}>   
              <h3>Sent To :</h3>
          </Grid> */}

          {/* ADD MORE Groups */}
          {/* <Grid item xs={12}>
            <Card
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "30px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item md={2} xs={2}>
                  <h4 style={{ marginBottom: "0px" }}>S.No.</h4>
                </Grid>
                <Grid item md={6} xs={8}>
                  <h4 style={{ marginBottom: "0px", textAlign:"center" }}>Group</h4>
                </Grid>
                <Grid item md={2} xs={2}>
                  <h4 style={{ marginBottom: "0px", textAlign:"center" }}>Action</h4>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Divider />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid
                  item
                  md={2}
                  xs={2}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="baseline"
                  justifyContent={"space-around"}
                >
                  {announcement.groups.map((group, index) => (
                    <div style={{ marginTop: "20px" }}>{index + 1}</div>
                  ))}
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={8}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="center"
                  justifyContent={"space-around"}
                >
                  {announcement.groups.map(
                    (group, index1) => (
                      (
                        <Autocomplete
                            // key={Math.random()}
                          //  {...defaultProps}
                          sx={{ width: "100%", marginTop: "20px" }}
                        //   id="clear-on-escape"
                          clearOnEscape
                          inputValue={group}
                          options={allGroups}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) => {
                            handleChangeGroupsValue(index1, newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="groups"
                              label="Group"
                              variant="outlined"
                              // inputProps={{
                              //   ...params.inputProps
                              // }}
                              onChange={(e) =>
                                handleChangeGroup(e, index1)
                              }
                              value={group}
                            />
                          )}
                        />
                      )
                    )
                  )}
                </Grid>

                <Grid
                  item
                  md={2}
                  xs={2}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="center"
                  justifyContent={"space-around"}
                >
                  {announcement.groups.map((group, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {announcement.groups.length > 1 && (
                        <Tooltip title="Cancel Group">
                          <IconButton onClick={(e) => handleCancelGroup(e, index1)}>
                            <Clear color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Add Group">
                        <IconButton onClick={(e) => handleAddMoreGroup(e)}>
                          <Add color="Primary" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Card>
          </Grid> */}
          {/* ADD MORE Group */}


          {/* ADD MORE MEMBERS */}
          {/* <Grid item xs={12}>
            <Card
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "30px",
                marginTop: "30px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item md={2} xs={2}>
                  <h4 style={{ marginBottom: "0px" }}>S.No.</h4>
                </Grid>
                <Grid item md={6} xs={8}>
                  <h4 style={{ marginBottom: "0px", textAlign: "center" }}>Member</h4>
                </Grid>
                <Grid item md={2} xs={2}>
                  <h4 style={{ marginBottom: "0px", textAlign:"center" }}>Action</h4>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Divider />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid
                  item
                  md={2}
                  xs={2}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="baseline"
                  justifyContent={"space-around"}
                >
                  {announcement.members.map((member, index) => (
                    <div  style={{ marginTop: "20px" }}>{index + 1}</div>
                  ))}
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={8}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="center"
                  justifyContent={"space-around"}
                >
                  {announcement.members.map(
                    (member, index1) => (
                      (
                        <Autocomplete
                          //  {...defaultProps}
                          sx={{ width: "100%", marginTop: "20px" }}
                        //   id="clear-on-escape"
                          clearOnEscape
                          // value={member}
                          inputValue={member}
                          options={allMembers}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) => {
                            handleChangeMemberValue(index1, newValue);
                          }}
                          // onInputChange={(e, inputValue) => handleChangeMember(e, index1, inputValue)}

                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="members"
                              label="Member"
                              variant="outlined"
                              // inputProps={{
                              //   ...params.inputProps
                              // }}
                              onChange={(e) =>
                                handleChangeName(e, index1, member)
                              }
                              value={member}
                            />
                          )}
                        />
                      )
                    )
                  )}
                </Grid>

                <Grid
                  item
                  md={2}
                  xs={2}
                  display="flex"
                  flexDirection={"column"}
                  alignItems="center"
                  justifyContent={"space-around"}
                >
                  {announcement.members.map((member, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {announcement.members.length > 1 && (
                        <Tooltip title="Cancel Member">
                          <IconButton onClick={(e) => handleCancel(e, index1)}>
                            <Clear color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Add Member">
                        <IconButton onClick={(e) => handleAddMore(e)}>
                          <Add color="Primary" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Card>
          </Grid> */}
          {/* ADD MORE MEMBERS */}

          {/* <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              options={allTags}
              // defaultValue={[top100Films[13]]}
              getOptionLabel={(option) => option.name}
              value={tags}
              onChange={(e, tags) => setTags(tags)}
              renderTags={() => null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Tags"
                />
              )}
            />
            <Box
              mt={1}
              sx={{
                "& > :not(:last-child)": { marginRight: 1 },
                "& > *": { marginBottom: 1 },
              }}
            >
              {tags.map((tag) => (
                <Chip
                  // icon={<Close fontSize="small" style={{ color:"#fff" }} />}
                  key={tag.name}
                  label={tag.name}
                  onDelete={() => handleDeleteTag(tag)}
                  style={{ background: tag.color, color:"#fff", cursor:"pointer" }}
                />
              ))}
            </Box>
          </Grid> */}

          
          <Grid item xs={12}>
            <Box textAlign={"right"} mt={2}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button color="primary" variant="outlined" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </RootCard>

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

export default AddAnnouncement;
