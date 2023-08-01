import { Add, Clear } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
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
  Snackbar
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import httpclient from "../../../utils/httpClient";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";


const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
  [theme.breakpoints.down("md")]: {
    padding:"20px"
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPushNotification = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allGroups, setAllGroups] = useState([])
  const [tags, setTags] = useState([]);
  const [notificationDetail, setNotifcationDetail] = useState({
    title: "",
    text: "",
    status: "",
    deliveryDate: null,
    members: [""],
    membersID: [""],
    // tags: [""],
    groups: [""],
    groupsID: [""],
  });

  useMemo(() => {
    if (location.state) {
      setNotifcationDetail({
        title: location.state.row.title,
        text: location.state.row.text,
        deliveryDate: moment(location.state.row.deliveryDate).format("YYYY-MM-DD"),
        status: location.state.row.status,
        members: location.state.row.members.map((mem) => mem.name),
        membersID: location.state.row.members.map((mem) => mem._id),
        // tags: location.state.row.tags.map((tag) => tag.name),
        groups: location.state.row.groups.map((grp) => grp.name),
        groupsID: location.state.row.groups.map((grp) => grp._id),
      });
      setTags(location.state.row.tags);
      setId(location.state.row._id)
    }
  }, []);

  useEffect(() => {
    getAllMembers();
    getAllTags();
    getAllGroups();
  },[])


  const getAllTags = () => {
    httpclient.get("tags").then(({data}) => {
      if(data.success){
        setAllTags(data.data)
      }
    })
  }

  const getAllMembers = () => {
    httpclient.get("guest_accounts").then(({data}) => {
      if(data.success){
        setAllMembers(data.data)
      }
    })
  }

  const getAllGroups = () => {
    httpclient.get("groups").then(({data}) => {
      if(data.success){
        setAllGroups(data.data)
      }
    })
  }

  const handleEditorChange = (e, editor) => {
    // console.log('editor', editor)
    const data = editor.getData();
    setNotifcationDetail({
      ...notificationDetail,
      description: data,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Normal handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNotifcationDetail({
      ...notificationDetail,
      [name]: value,
    });
  };

  //handling changes for members
  const handleChangeMemberValue = (index, value) => {
    if (value === null) {
      notificationDetail.members[index] = "";
      notificationDetail.membersID[index] = "";
    } else {
      notificationDetail.members[index] = value.name;
      notificationDetail.membersID[index] = value._id;
    }
    setNotifcationDetail({
      ...notificationDetail,
      members: notificationDetail.members,
      membersID: notificationDetail.membersID,
    });
  };

  const handleChangeName = (e, index, value) => {
    notificationDetail.members[index] = e.target.value;
    setNotifcationDetail({
      ...notificationDetail,
      members: notificationDetail.members,
    });
  };

  const handleAddMore = () => {
    setNotifcationDetail({
      ...notificationDetail,
      members: [...notificationDetail.members, ""],
      membersID: [...notificationDetail.membersID, ""],
    });
  };

  const handleCancel = (e, index) => {
    var array = notificationDetail.members;
    var cancel = array.splice(index, 1);
    var array1 = notificationDetail.membersID;
    var cancel1 = array1.splice(index, 1);
    setNotifcationDetail({
      ...notificationDetail,
      members: array,
      membersID: array1
    });
  };
  //handling changes for members

  //handling changes for groups
  const handleChangeGroupsValue = (index, value) => {
    if (value === null) {
      notificationDetail.groups[index] = "";
      notificationDetail.groupsID[index] = "";
    } else {
      notificationDetail.groups[index] = value.name;
      notificationDetail.groupsID[index] = value._id;
    }
    setNotifcationDetail({
      ...notificationDetail,
      groups: notificationDetail.groups,
      groupsID: notificationDetail.groupsID,
    });
  };

  const handleChangeGroup = (e, index) => {
    notificationDetail.groups[index] = e.target.value;
    setNotifcationDetail({
      ...notificationDetail,
      groups: notificationDetail.groups,
    });
  };

  const handleAddMoreGroup = (e) => {
    setNotifcationDetail({
      ...notificationDetail,
      groups: [...notificationDetail.groups, ""],
      groupsID: [...notificationDetail.groupsID, ""],
    });
  };

  const handleCancelGroup = (e, index) => {
    var array = notificationDetail.groups;
    var cancel = array.splice(index, 1);

    var array1 = notificationDetail.groupsID;
    var cancel1 = array1.splice(index, 1);

    setNotifcationDetail({
      ...notificationDetail,
      groups: array,
      groupsID: array1,
    });
  };
  //handling changes for groups

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteTag = (data) => {
    // console.log("data", data);
    let res = tags.filter(tag => tag._id !== data._id);
    setTags(res);
  };


  const handleSubmit = () => {
    !id.length
    ? httpclient
        .post("push_notification", {
          title: notificationDetail.title,
          text: notificationDetail.text,
          status: notificationDetail.status,
          date: notificationDetail.deliveryDate,
          members: notificationDetail.membersID,
          groups: notificationDetail.groupsID,
          tags: tags.map(tag => tag._id)
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/send_notification");
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
        .put(`push_notification/${id}`, {
          title: notificationDetail.title,
          text: notificationDetail.text,
          status: notificationDetail.status,
          date: notificationDetail.deliveryDate,
          members: notificationDetail.membersID,
          groups: notificationDetail.groupsID,
          tags: tags.map(tag => tag._id)
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/send_notification");
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

  // console.log('loca',location.state)
  console.log("notification", notificationDetail);

  return (
    <div>
      <h1>Add Push Notification</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={notificationDetail.title}
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
              value={notificationDetail.text}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="deliveryDate"
              type="date"
              label="deliveryDate"
              value={notificationDetail.deliveryDate}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={notificationDetail.status}
                name="status"
                label="Status"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="Delivery Filed">Delivery Filed</MenuItem>
                <MenuItem value="Sent">Sent</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>   
              <h3>Sent To :</h3>
          </Grid>

          {/* ADD MORE Groups */}
          <Grid item xs={12}>
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
                <Grid item sm={12} mb={2}>
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
                  {notificationDetail.groups.map((group, index) => (
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
                  {notificationDetail.groups.map(
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
                  {notificationDetail.groups.map((group, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {notificationDetail.groups.length > 1 && (
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
          </Grid>
          {/* ADD MORE Group */}


          {/* ADD MORE MEMBERS */}
          <Grid item xs={12}>
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
                  <h4 style={{ marginBottom: "0px", textAlign:"center" }}>Member</h4>
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
                  {notificationDetail.members.map((member, index) => (
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
                  {notificationDetail.members.map(
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
                  {notificationDetail.members.map((member, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {notificationDetail.members.length > 1 && (
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
          </Grid>
          {/* ADD MORE MEMBERS */}

          <Grid item xs={12} md={12}>
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
          </Grid>

          
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

export default AddPushNotification;
