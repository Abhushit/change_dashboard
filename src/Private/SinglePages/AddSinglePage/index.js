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
  Chip,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import MuiAlert from "@mui/material/Alert";
import httpclient from "../../../utils/httpClient";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
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

const UploadIconDiv = styled("div")({
  display: "inline-block",
  cursor: "pointer",
  textAlign: "center",
  padding: "40px",
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

const AddSinglePage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  // const [allMembers, setAllMembers] = useState([]);
  // const [allTags, setAllTags] = useState([]);
  // const [allGroups, setAllGroups] = useState([])
  // const [tags, setTags] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    icon: "",
    title: "",
    description: "",
    image: "",
    enabled: "",
    pageVisible: false,
    // members: [""],
    // membersID: [""],
    // groups: [""],
    // groupsID: [""],
  });

  useMemo(() => {
    if (location.state) {
      setPageDetails({
        icon: location.state.row.icon,
        title: location.state.row.title,
        description: location.state.row.description,
        image: location.state.row.image,
        enabled: location.state.row.enabled,
        pageVisible: location.state.row.pageVisible,
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

  const handleEditorChange = (e, editor) => {
    // console.log('editor', editor)
    const data = editor.getData();
    setPageDetails({
      ...pageDetails,
      description: data,
    });
  };

  //Normal handling changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPageDetails({
      ...pageDetails,
      [name]: value,
    });
  };

  const handleCheck = (e) => {
    const {name, checked} = e.target;
    setPageDetails({
      ...pageDetails,
      pageVisible: checked
    })
  }

  //handling changes for members
  // const handleChangeMemberValue = (index, value) => {
  //   if (value === null) {
  //     pageDetails.members[index] = "";
  //     pageDetails.membersID[index] = "";
  //   } else {
  //     pageDetails.members[index] = value.name;
  //     pageDetails.membersID[index] = value._id;
  //   }
  //   setPageDetails({
  //     ...pageDetails,
  //     members: pageDetails.members,
  //     membersID: pageDetails.membersID,
  //   });
  // };

  // const handleChangeName = (e, index, value) => {
  //   pageDetails.members[index] = e.target.value;
  //   setPageDetails({
  //     ...pageDetails,
  //     members: pageDetails.members,
  //   });
  // };

  // const handleAddMore = () => {
  //   setPageDetails({
  //     ...pageDetails,
  //     members: [...pageDetails.members, ""],
  //     membersID: [...pageDetails.membersID, ""],
  //   });
  // };

  // const handleCancel = (e, index) => {
  //   var array = pageDetails.members;
  //   var cancel = array.splice(index, 1);
  //   var array1 = pageDetails.membersID;
  //   var cancel1 = array1.splice(index, 1);
  //   setPageDetails({
  //     ...pageDetails,
  //     members: array,
  //     membersID: array1
  //   });
  // };
  //handling changes for members

  //handling changes for groups
  // const handleChangeGroupsValue = (index, value) => {
  //   if (value === null) {
  //     pageDetails.groups[index] = "";
  //     pageDetails.groupsID[index] = "";
  //   } else {
  //     pageDetails.groups[index] = value.name;
  //     pageDetails.groupsID[index] = value._id;
  //   }
  //   setPageDetails({
  //     ...pageDetails,
  //     groups: pageDetails.groups,
  //     groupsID: pageDetails.groupsID,
  //   });
  // };

  // const handleChangeGroup = (e, index) => {
  //   pageDetails.groups[index] = e.target.value;
  //   setPageDetails({
  //     ...pageDetails,
  //     groups: pageDetails.groups,
  //   });
  // };

  // const handleAddMoreGroup = (e) => {
  //   setPageDetails({
  //     ...pageDetails,
  //     groups: [...pageDetails.groups, ""],
  //     groupsID: [...pageDetails.groupsID, ""],
  //   });
  // };

  // const handleCancelGroup = (e, index) => {
  //   var array = pageDetails.groups;
  //   var cancel = array.splice(index, 1);

  //   var array1 = pageDetails.groupsID;
  //   var cancel1 = array1.splice(index, 1);

  //   setPageDetails({
  //     ...pageDetails,
  //     groups: array,
  //     groupsID: array1,
  //   });
  // };
  //handling changes for groups

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("title", pageDetails.title);
    formData.append("description", pageDetails.description);
    formData.append("icon", pageDetails.icon);
    formData.append("enabled", pageDetails.enabled);
    formData.append("pageVisible", pageDetails.pageVisible);
    pageDetails.image.map((imgs) => {
      formData.append("image", imgs);
    });
    // pageDetails.groupsID.map(grp => {
    //   formData.append("groups", grp);
    // })
    // pageDetails.membersID.map(mem => {
    //   formData.append("members", mem);
    // })
    // tags.map(tag => {
    //   formData.append("tags", tag._id);
    // })

    !id.length
      ? httpclient
          .post("single_pages", formData)
          .then(({ data }) => {
            if (data.success) {
              setOpen(true);
              setSnackStatus("success");
              setSnackMessage(data.message);
              setTimeout(() => {
                navigate("/single_pages");
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
          .put(`single_pages/${id}`, formData)
          .then(({ data }) => {
            if (data.success) {
              setOpen(true);
              setSnackStatus("success");
              setSnackMessage(data.message);
              setTimeout(() => {
                navigate("/single_pages");
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

  const handleDropIcon = (file) => {
    setPageDetails({
      ...pageDetails,
      icon: file[0],
    });
  };

  const handleDrop = (file) => {
    if (file.length > 3) {
      window.alert("Max number of file to be uploaded is 3");
    } else {
      setPageDetails({
        ...pageDetails,
        image: file,
      });
    }
  };

  // const handleDeleteTag = (data) => {
  //   // console.log("data", data);
  //   let res = tags.filter(tag => tag._id !== data._id);
  //   setTags(res);
  // };

  // console.log('loca',location.state)
  console.log("group", pageDetails);

  return (
    <div>
      <h1>Add Single Page</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleCheck}
                    value={pageDetails.pageVisible}
                    checked={pageDetails.pageVisible}
                  />
                }
                label="Page Visible in App"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={12}>
            <DropzoneDiv>
              <Dropzone
                onDrop={handleDropIcon}
                maxFiles={3}
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
                      {pageDetails.icon ? (
                        pageDetails.icon.type ? (
                          <img
                            src={URL.createObjectURL(pageDetails.icon)}
                            //   className={classes.imgClass}
                            className="img_class"
                            alt={pageDetails.icon.name}
                          />
                        ) : (
                          <img
                            src={pageDetails.icon}
                            className="img_class"
                            //   className={classes.imgClass}
                            alt={pageDetails.name}
                          />
                        )
                      ) : (
                        <UploadIconDiv {...getRootProps()}>
                          <input {...getInputProps()} />
                          <AddPhotoAlternateOutlined color="primary" />
                          <p>Upload Icon here</p>
                        </UploadIconDiv>
                      )}
                      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setPageDetails({
                              ...pageDetails,
                              icon: "",
                            })
                          }
                        >
                          {" "}
                          Reset Icon
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </Dropzone>
            </DropzoneDiv>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="title"
              type="text"
              label="title"
              value={pageDetails.title}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              multiline
              rows={5}
              variant="outlined"
              name="description"
              type="text"
              label="Description"
              value={pageDetails.description}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Enabled</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageDetails.enabled}
                name="enabled"
                label="Enabled"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="Enabled">Yes</MenuItem>
                <MenuItem value="Disabled">No</MenuItem>
              </Select>
            </FormControl>
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
                      {pageDetails.image ? (
                        pageDetails.image[0].type ? (
                          pageDetails.image.map((imgs) => (
                            <img
                              src={URL.createObjectURL(imgs)}
                              alt={imgs.name}
                              style={{
                                height: "250px",
                                width: "250px",
                                objectFit: "cover",
                                marginRight: "20px",
                              }}
                            />
                          ))
                        ) : (
                          pageDetails.image.map((imgs) => (
                            <img
                              src={imgs}
                              alt={imgs.name}
                              style={{
                                height: "250px",
                                width: "250px",
                                objectFit: "cover",
                                marginRight: "20px",
                              }}
                            />
                          ))
                        )
                      ) : (
                        <UploadDiv {...getRootProps()}>
                          <input {...getInputProps()} />
                          <AddPhotoAlternateOutlined color="primary" />
                          <p>{"Upload Image here ( max 3 )"}</p>
                        </UploadDiv>
                      )}
                      <div style={{ textAlign: "center", marginTop: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setPageDetails({
                              ...pageDetails,
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

          {/* <Grid item xs={12}>   
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
                  {pageDetails.groups.map((group, index) => (
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
                  {pageDetails.groups.map(
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
                  {pageDetails.groups.map((group, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {pageDetails.groups.length > 1 && (
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
                  {pageDetails.members.map((member, index) => (
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
                  {pageDetails.members.map(
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
                  {pageDetails.members.map((member, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {pageDetails.members.length > 1 && (
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

export default AddSinglePage;
