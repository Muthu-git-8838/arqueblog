import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Header from "../../components/Header/";
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { Avatar, Divider, FormControl } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import apiRequest from "../../services/auth";
import { Validate } from "../../helpers/functions";
import "./index.css";
import Modal from "@mui/material/Modal";
import Select from "../../common/Select";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import { useParams } from "react-router-dom";
import UserAvatar from "../../common/UserAvatar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPost } from "../../store/posts/postActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let postSchema = yup.object().shape({
  title: yup.string().label("Title").required(),
  description: yup.string().label("Content").required(),
  category: yup.string().label("Category").required(),
});
let questionSchema = yup.object().shape({
  title: yup.string().label("Title").required(),
  category: yup.string().label("Category").required(),
});

function BlogCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.common.categories);
  const profile = useSelector((state) => state.user.profile);
  const postType = useSelector((state) => state.postType.postTypes);
  const [show, setShow] = React.useState(true);
  const [shows, setShows] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openblogmodel, setOpenblogmodel] = React.useState(true);
  const handleCloseblogmodel = () => setOpenblogmodel(false);
  const { quill, quillRef } = useQuill({ placeholder: "Write your story..." });
  const params = useParams();
  useEffect(() => {
    if (params.title) {
      dispatch(getPost({ post_id: params.title }));
    }
  }, [params.title]);
  const [data, setData] = useState({
    title: "",
    description: "",
    descriptionHTML: "",
    category: "",
    post_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ path: null });

  const onPost = async () => {
    let error = await Validate(postSchema, data);
    setError(error);
    if (error) return;
    setLoading(true);
    const response = await apiRequest({
      url: "post/create",
      method: "POST",
      data,
    });
    setLoading(false);
    if (response.success) {
      setData({
        ...data,
        title: "",
        description: "",
        descriptionHTML: "",
        post_type:"",
      });
      handleClose();
      navigate("/");
    }
  };
  const onSubmit = async () => {
    let error = await Validate(questionSchema, data);
    setError(error);
    if (error) return;
    setLoading(true);
    const { descriptionHTML, description, ...restData } = data;
    const response = await apiRequest({
      url: "post/create",
      method: "POST",
      data: restData,
    });
    setLoading(false);
    if (response.success) {
      setData({
        ...data,
        title: "",
        post_type:"",
      });
      handleClose();
      navigate("/");
    }
  };
  const callDouble = (qus) => {
    setShow(false);
    setData({
      ...data,
      post_type: qus,
    });
    handleCloseblogmodel();
  };
  const callDouble1 = (blo) => {
    setShows(false);
    setData({
      ...data,
      post_type: blo,
    });
    handleCloseblogmodel();
  };
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setData({
          ...data,
          description: quill.getText(),
          descriptionHTML: quillRef.current.firstChild.innerHTML,
        });
      });
    }
  }, [quill, data]);

  return (
    <>
      <Modal
        open={openblogmodel}
        // onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: "text.primary",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Choose your post type!
            </Typography>
            <Button
              variant="contained"
              onClick={() => callDouble(postType[0].type)}
            >
              {postType[0].description}
            </Button>
            <Button
              variant="contained"
              onClick={() => callDouble1(postType[1].type)}
            >
              {postType[1].description}
            </Button>
          </Stack>
        </Box>
      </Modal>
      {shows ? (
        <Box sx={{ bgcolor: "background.primary" }} minHeight={"100vh"}>
          <Header hideControlls={true} />
          <Container maxWidth="xl">
            <Grid container>
              
              <Grid item xs={12}>
                <Grid container pt={5}>
                  <TextField
                    placeholder="What's your question?"
                    type={"text"}
                    variant="standard"
                    fullWidth
                    size="medium"
                    sx={{
                      bgcolor: "background.success",
                      borderRadius: 2,
                      py: "20px",
                      px: 2,
                    }}
                    multiline={true}
                    onChange={(e) => {
                      if ((e.target.value || "").length > 250) return;
                      setData({
                        ...data,
                        title: e.target.value,
                      });
                    }}
                    value={data.title}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserAvatar
                            src={
                              profile.user_attachments.length > 0 &&
                              profile.user_attachments[0].filename
                            }
                            userId={profile._id}
                            text={profile.first_name}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} pt={5}>
                <Stack direction={"row"} justifyContent={"flex-end"}>
                  <Button
                    disabled={!data.title}
                    variant="contained"
                    // onClick={onPost}
                    size="large"
                    // sx={{
                    //   fontWeight: 600,
                    //   textTransform: "none",
                    //   maxWidth: "120px",
                    // }}
                    endIcon={<SendIcon />}
                    onClick={handleOpen}
                  >
                    Post
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack spacing={2}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "text.primary" }}
                  >
                    Choose your blog category!
                  </Typography>
                  <Select
                    label={""}
                    onChange={(e) => {
                      setData({
                        ...data,
                        category: e.target.value,
                      });
                    }}
                    value={data.category}
                    values={categories.map((category) => {
                      return {
                        name: category.name,
                        id: category._id,
                      };
                    })}
                  />
                  <Stack justifyContent={"flex-end"}>
                    <Button
                      disabled={!data.title}
                      variant="contained"
                      onClick={onSubmit}
                      size="large"
                      // sx={{
                      //   fontWeight: 600,
                      //   textTransform: "none",
                      //   maxWidth: "120px",
                      // }}
                      endIcon={<SendIcon />}
                      // onClick={onPost}
                    >
                      Post
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Modal>
          </Container>
        </Box>
      ) : null}

      {show ? (
        <Box sx={{ bgcolor: "background.primary" }} minHeight={"100vh"}>
          <Header hideControlls={true} />
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12} pt={5}>
                <Stack direction={"row"} justifyContent={"flex-end"}>                
                    <Button
                      disabled={!data.description || !data.title}
                      variant="contained"
                      // onClick={onPost}
                      size="large"
                      // sx={{
                      //   fontWeight: 600,
                      //   textTransform: "none",
                      //   maxWidth: "120px",
                      // }}
                      endIcon={<SendIcon />}
                      onClick={handleOpen}
                    >
                      Post
                    </Button>               
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Grid container pt={5}>
                  <TextField
                    placeholder="What's your blog title?"
                    type={"text"}
                    variant="standard"
                    fullWidth
                    size="medium"
                    sx={{
                      bgcolor: "background.success",
                      borderRadius: 2,
                      py: "20px",
                      px: 2,
                    }}
                    multiline={true}
                    onChange={(e) => {
                      if ((e.target.value || "").length > 250) return;
                      setData({
                        ...data,
                        title: e.target.value,
                      });
                    }}
                    value={data.title}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserAvatar
                            src={
                              profile.user_attachments.length > 0 &&
                              profile.user_attachments[0].filename
                            }
                            userId={profile._id}
                            text={profile.first_name}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} pt={5}>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    minHeight: "60vh",
                    border: "none",
                  }}
                >
                  <div ref={quillRef} />
                </div>
              </Grid>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack spacing={2}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "text.primary" }}
                  >
                    Choose your blog category!
                  </Typography>
                  <Select
                    label={""}
                    onChange={(e) => {
                      setData({
                        ...data,
                        category: e.target.value,
                      });
                    }}
                    value={data.category}
                    values={categories.map((category) => {
                      return {
                        name: category.name,
                        id: category._id,
                      };
                    })}
                  />
                  <Stack justifyContent={"flex-end"}>
                    <Button
                      disabled={!data.description || !data.title}
                      variant="contained"
                      // onClick={onPost}
                      size="large"
                      // sx={{
                      //   fontWeight: 600,
                      //   textTransform: "none",
                      //   maxWidth: "120px",
                      // }}
                      endIcon={<SendIcon />}
                      onClick={onPost}
                    >
                      Post
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Modal>
          </Container>
        </Box>
      ) : null}
    </>
  );
}
export default BlogCreate;
