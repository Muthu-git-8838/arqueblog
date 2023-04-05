import { Button, Grid, IconButton, Stack } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CameraIcon from "@mui/icons-material/Camera";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import apiRequest from "../../services/auth";

const VideoPlayer = memo(({ selectedFile, uploaded = false }) => (
  <ReactPlayer
    width={"100%"}
    height={"100"}
    controls={uploaded ? true : false}
    url={URL.createObjectURL(selectedFile)}
  />
));

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ImagePreview = memo(
  ({ selectedFile, updateUploaded, removeFile = (id) => {} }) => {
    const uploadedData = useRef();
    const [progress, setProgress] = useState(0);
    const [attachmentId, setAttachmentId] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    useEffect(() => {
      onUpload();
    }, [selectedFile]);

    const onUpload = async () => {
      let formData = new FormData();
      formData.append("attachment", selectedFile);
      const response = await apiRequest({
        url: "attachment/single/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          let progress = Math.round((100 * data.loaded) / data.total);
          setProgress(progress);
          if (progress >= 100) {
            setTimeout(() => {
              setProgress(-1);
            }, 500);
          }
        },
      });
      console.log("s--s>>>>responsee>>>>>>>>>", response);
      if (response.success) {
        updateUploaded(response.data);
        setAttachmentId(response.data.attachment_id);
        setUploaded(true);
      }
    };
    console.log("s--s>>>>responsee>>>>selectedFile>>>>>", selectedFile);

    return (
      <Grid item xs={3} style={{ position: "relative" }}>
        {selectedFile.type.startsWith("image/") ? (
          <img
            width={"100%"}
            height={"150"}
            src={selectedFile ? URL.createObjectURL(selectedFile) : null}
            alt={selectedFile ? selectedFile.name : null}
          />
        ) : (
          <VideoPlayer selectedFile={selectedFile} uploaded={uploaded} />
        )}
        {progress == -1 && (
          <Box
            position={"absolute"}
            //   display={"flex"}
            //   alignItems={"center"}
            //   justifyContent={"center"}
            //   left={0}
            right={5}
            top={20}

            //   bottom={0}
          >
            {/*  @ts-ignore */}
            <IconButton
              onClick={() => removeFile(attachmentId)}
              size="small"
              aria-label="close"
              sx={{ backgroundColor: "#000" }}
              borderRadius={"50%"}
            >
              <CloseIcon sx={{ fontSize: 10, color: "#fff" }} />
            </IconButton>
          </Box>
        )}
        {progress != -1 && (
          <>
            <Box
              position={"absolute"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              left={0}
              right={0}
              top={0}
              bottom={0}
            >
              {" "}
              <CircularProgressWithLabel value={progress} />
            </Box>
          </>
        )}
      </Grid>
    );
  }
);

const FileUpload = ({
  button = null,
  iconBtnStyles = {},
  buttonText = "Photo/Video",
  multiple = false,
  onChange = (e, v) => {},
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const uploadedFls = useRef([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileHandler = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles([]);
      uploadedFls.current = [];
      setSelectedFiles(Object.values(e.target.files));
    }
  };
  useEffect(() => {
    if (uploadedFiles)
      onChange(
        uploadedFls.current.map((a) => a.attachment_id),
        multiple
      );
  }, [uploadedFiles]);
  console.log("s--s>>>>uploadedFiles>>>>>>>>>", uploadedFls);
  console.log("s--s>>>>selectedFielss>>>>>>>>>", selectedFiles);

  return (
    <Grid container>
      {selectedFiles.length > 0 && (
        <Grid item xs={12} pt={2}>
          <Grid container spacing={2}>
            {selectedFiles.map((selectedFile) => {
              return (
                <ImagePreview
                  removeFile={(attachmentId) => {
                    let tmp = [...uploadedFiles];
                    tmp = tmp.filter((f) => f.attachment_id !== attachmentId);
                    uploadedFls.current = uploadedFls.current.filter(
                      (f) => f.attachment_id !== attachmentId
                    );
                    setUploadedFiles(tmp);
                    let selected = [...selectedFiles];
                    selected = selected.filter(
                      (f) => f.name !== selectedFile.name
                    );
                    setSelectedFiles(selected);
                  }}
                  updateUploaded={(file) => {
                    console.log("s-s-s>>>>>>>>filefile>>>>>>>>>>", file);
                    let tmp = [...uploadedFiles];
                    tmp.push(file);
                    uploadedFls.current.push(file);
                    setUploadedFiles(tmp);
                  }}
                  selectedFile={selectedFile}
                />
              );
            })}
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack alignItems={'flex-start'} justifyContent={'flex-start'}>
          <Button
            variant="contained"
            component="label"
            color="secondary"
            sx={{
              color: "#fff",
              backgroundColor: "#9c27b0",
              marginTop: selectedFiles.length > 0 ? "18px" : "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...iconBtnStyles,
            }}
            onChange={fileHandler}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              display={'flex'}
              alignItems={'center'}
              sx={{
                fontSize: 12,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }}
            >
              <CameraIcon /> {buttonText}
            </Typography>
            <input
              onClick={(e) => {
                // @ts-ignore
                e.target.value = null;
              }}
              multiple={multiple}
              accept="video/*,image/*"
              type="file"
              hidden
            />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default memo(FileUpload);
