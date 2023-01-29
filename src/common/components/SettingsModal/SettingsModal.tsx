import { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingsForm } from "./SettingsForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "85vh",
  overflow: "auto",
  bgcolor: "#d9f9f4",
  border: "2px solid #11c5a7",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export const SettingsModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        size={"small"}
        endIcon={<SettingsIcon />}
        onClick={handleOpen}
      >
        Edit profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SettingsForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
