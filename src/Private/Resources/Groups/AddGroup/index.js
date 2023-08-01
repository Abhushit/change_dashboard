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
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import httpclient from "../../../../utils/httpClient";
import MuiAlert from "@mui/material/Alert";

// const memberList = [
//   { id: "1", name: "Henry" },
//   { id: "2", name: "Kate" },
//   { id: "3", name: "Brayn" },
//   { id: "4", name: "Alex" },
//   { id: "5", name: "Arons" },
//   { id: "6", name: "Philip" },
//   { id: "7", name: "Andrew" },
//   { id: "8", name: "Rob" },
//   { id: "9", name: "Sara" },
//   { id: "10", name: "Samantha" },
//   { id: "11", name: "Erik" },
// ];

// const allTags = [
//   { id: "1", name: "bug", color: "#2d9bf0" },
//   { id: "2", name: "duplicate", color: "#3c3cf1" },
//   { id: "3", name: "enhancement", color: "yellow" },
//   { id: "4", name: "help wanted", color: "#00af00" },
//   { id: "5", name: "question", color: "purple" },
//   { id: "6", name: "invalid", color: "#ef3a3a" },
//   { id: "7", name: "fix needed", color: "#00af00" },
// ];

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


const AddGroup = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [tags, setTags] = useState([])
  const [allTags, setAllTags] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [groupDetail, setGroupDetail] = useState({
    name: "",
    description: "",
    members: [""],
    membersID: [""]
    // tags: "",
  });

  useEffect(() => {
    getAllMembers();
    getAllTags();
  },[])

  useMemo(() => {
    if (location.state) {
      setGroupDetail({
        name: location.state.row.name,
        description: location.state.row.description,
        members: location.state.row.member.map(mem => mem.name),
        membersID: location.state.row.member.map(mem=> mem._id),
      });
      setTags(location.state.row.tags)
      setId(location.state.row._id)
    }
  }, []);

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleEditorChange = (e, editor) => {
    // console.log('editor', editor)
    const data = editor.getData();
    setGroupDetail({
      ...groupDetail,
      description: data,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGroupDetail({
      ...groupDetail,
      [name]: value,
    });
  };

  const handleDeleteTag = (data) => {
    // console.log("data", data);
    let res = tags.filter(tag => tag._id !== data._id);
    setTags(res);
  };

  const handleChangeMemberValue = (index,value) => {
    console.log('input', value)
    if(value === null){
      groupDetail.members[index] ="";
      groupDetail.membersID[index] ="";
    }else{
      groupDetail.members[index] = value.name;
      groupDetail.membersID[index] = value._id;
    }
    setGroupDetail({
      ...groupDetail,
      members: groupDetail.members,
      membersID:groupDetail.membersID
    });
  }

  const handleChangeName = (e,index, value) => {
    groupDetail.members[index] = e.target.value;
    setGroupDetail({
      ...groupDetail,
      members: groupDetail.members,
    });
  }

  const handleAddMore = () => {
    setGroupDetail({
      ...groupDetail,
      members: [...groupDetail.members, ""],
      membersID: [...groupDetail.membersID, ""],
    });
  };

  const handleCancel = (e, index) => {
    var array = groupDetail.members
    var cancel  = array.splice(index, 1);

    var array1 = groupDetail.membersID
    var cancel1 = array1.splice(index, 1);

    setGroupDetail({
      ...groupDetail,
      members: array,
      membersID: array1
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    !id.length
    ? httpclient
        .post("groups", {
          name: groupDetail.name,
          description: groupDetail.description,
          member: groupDetail.membersID,
          tags: tags.map(tag => tag._id)
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/resources/groups");
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
        .put(`groups/${id}`, {
          name: groupDetail.name,
          description: groupDetail.description,
          member: groupDetail.membersID,
          tags: tags.map(tag => tag._id)
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setTimeout(() => {
              navigate("/resources/groups");
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
  console.log("group", groupDetail);

  return (
    <div>
      <h1>Add Group</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} xs={12}>
            <TextField
              variant="outlined"
              name="name"
              type="text"
              label="Name"
              value={groupDetail.name}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} xs={12}>
            <CKEditor
              editor={ClassicEditor}
              data={groupDetail.description}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              // onChange={(event, editor) => {
              //   const data = editor.getData()
              //   console.log({event, editor, data})
              // }}
              onChange={(event, editor) => handleEditorChange(event, editor)}
              onBlur={(event, editor) => {
                // console.log('Blur.', editor)
              }}
              onFocus={(event, editor) => {
                // console.log('Focus.', editor)
              }}
            />
          </Grid>

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
                <Grid item xs={2} md={2}>
                  <h4 style={{ marginBottom:"0px" }}>S.NO</h4>
                </Grid>
                <Grid item xs={8} md={6}>
                  <h4 style={{ marginBottom:"0px", textAlign:"center" }}>Member</h4>
                </Grid>
                <Grid item xs={2} md={2}>
                  <h4 style={{ marginBottom:"0px", textAlign:"center" }}>Action</h4>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Divider />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid
                  item
                  xs={2}
                  md={2}
                  style={{ display:"flex", flexDirection:"column", alignItems:"baseline", justifyContent:"space-around" }}
                  
                >
                  {groupDetail.members.map((member, index) => (
                    <div style={{ marginTop: "20px" }}>{index + 1}</div>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={6}
                  style={{ display:"flex", flexDirection:"column", alignItems:"baseline", justifyContent:"space-around" }}

                >
                  {groupDetail.members.map((member, index1) => (
                    // console.log('member', member),
                    <Autocomplete
                      //  {...defaultProps}
                      sx={{ width: "100%", marginTop:"20px" }}
                      id="clear-on-escape"
                      clearOnEscape
                      // value={member}
                      inputValue={member}

                      options={allMembers}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {handleChangeMemberValue(index1,newValue)}}
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
                          onChange={(e) => handleChangeName(e,index1, member)}
                          value={member}
                        />
                      )}
                    />
                  ))}
                </Grid>

                <Grid
                  item
                  xs={2}
                  md={2}
                  style={{ display:"flex", flexDirection:"column", alignItems:"baseline", justifyContent:"space-around" }}

                >
                  {groupDetail.members.map((member, index1) => (
                    <div style={{ marginTop: "20px" }}>
                      {groupDetail.members.length > 1 && (
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
                  style={{ background: tag.color || tag.backgroundColor, color:"#fff", cursor:"pointer" }}
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

export default AddGroup;
