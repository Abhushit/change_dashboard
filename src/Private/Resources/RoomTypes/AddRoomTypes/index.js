import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Dropzone from "react-dropzone";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { useMemo } from "react";
import httpclient from "../../../../utils/httpClient";
import MuiAlert from "@mui/material/Alert";

const RootCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.lighter,
  padding: "40px",
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

const AddRoomTypes = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [id, setId] = useState("");
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [roomTypes, setRoomTypes] = useState({
    name: "",
    image: "",
    description: "",
    tags: "",
  });

  // console.log('loc', location)

  useEffect(() =>{
    getAllTags();
  },[])

  useMemo(() => {
    if (location.state) {
      setRoomTypes({
        name: location.state.row.name,
        image: location.state.row.image,
        description: location.state.row.description,
        // tags: location.state.row.tags.map((tag,index) => tag.name),
      });
      setTags(location.state.row.tags);
      setId(location.state.row._id);
    }
  }, []);

  const getAllTags = () => {
    httpclient.get("tags").then(({ data }) => {
      if (data.success) {
        setAllTags(data.data);
      }
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoomTypes({
      ...roomTypes,
      [name]: value,
    });
  };

  const handleEditorChange = (e, editor) => {
    // console.log('editor', editor)
    const data = editor.getData();
    setRoomTypes({
      ...roomTypes,
      description: data,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    var formData = new FormData();
    formData.append("name",roomTypes.name);
    formData.append("description",roomTypes.description);
    tags.map(tag => {
      formData.append("tags",tag._id);
    })
    formData.append("image", roomTypes.image);
    
    console.log('formdata', formData);

    !id.length
      ? httpclient
          .post("room_types", formData)
          .then(({ data }) => {
            if (data.success) {
              setOpen(true);
              setSnackStatus("success");
              setSnackMessage(data.message);
              setTimeout(() => {
                navigate("/resources/room_types");
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
          .put(`room_types/${id}`, formData)
          .then(({ data }) => {
            if (data.success) {
              setOpen(true);
              setSnackStatus("success");
              setSnackMessage(data.message);
              setTimeout(() => {
                navigate("/resources/room_types");
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
    setRoomTypes({
      ...roomTypes,
      image: file[0],
    });
  };

  const handleResetImage = () => {
    setRoomTypes({
      ...roomTypes,
      image: "",
    });
  };

  const handleDeleteTag = (data) => {
    // console.log("data", data);
    let res = tags.filter((tag) => tag._id !== data._id);
    setTags(res);
  };

  console.log("room", roomTypes);

  return (
    <div>
      <h1>Add Room Types</h1>
      <RootCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              name="name"
              type="text"
              label="Name"
              value={roomTypes.name}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CKEditor
              editor={ClassicEditor}
              data={roomTypes.description}
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
                <TextField {...params} variant="outlined" placeholder="Tags" />
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
                  style={{
                    background: tag.color,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
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
                      {roomTypes.image ? (
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
                      )}
                      <div style={{ textAlign: "center", marginTop: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setRoomTypes({
                              ...roomTypes,
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

export default AddRoomTypes;
