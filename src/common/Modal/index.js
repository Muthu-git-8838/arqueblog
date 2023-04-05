import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../helpers/functions";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, Stack } from "@mui/material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height:'80%',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 2,
  p: 4,
  overflow: 'scroll'
};
export default function Modals({
  children,
  title = "",
  show = false,
  okText = "save",
  cancelText = "cancel",
  onClose = () => {},
  onOpen = () => {},
  onSave = () => {},
}) {
  const modalRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const showModal = () => {setOpen(true);onOpen();}

  // const hideModal = () => {setOpen(false);onClose();}
  const showModal = () => {
    setOpen(true);
    onOpen();
  };

  const hideModal = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (show) {
      showModal();
    } else {
      hideModal();
    }
  }, [show]);

  return (
    <>
    {/* <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal> */}
    <Modal
  open={open}

  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  
  <Box sx={style}  >
        <Box className="modal-content">
          
          <Box className="modal-header">
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ position: "fixed", top: 10 }}>{title}</Typography>
            <Box pt={3}> <Divider  /></Box>
          <CloseIcon sx={{ position: "fixed", top: 10, right: 10 }}
            onClick={hideModal}/>
           

          </Box>
          <Box pt={2} className="modal-body">{children}</Box>
          <Box  pt={3} className="modal-footer">
            <Stack justifyContent={"end"} spacing={2} direction={"row"}>

            {cancelText && (
              <Button
              
              sx={{bgcolor:"#ce93d8"}}
                type="button"
                variant="contained"
                className="btn btn-secondary  btn-cancel"
                data-bs-dismiss="modal"
                onClick={hideModal}
              >cancel
              </Button>
            )}
            {okText && (
              <Button
              sx={{bgcolor:"#ce93d8"}}

              variant="contained"
                type="button"
                className="btn btn-primary btn-save"
                onClick={() => {
                  onSave();
                  hideModal();
                }}
              >save
              </Button>
            )}
            </Stack>
          </Box>
        </Box>
      </Box>
</Modal>
    </>
  );
}
