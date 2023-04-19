import * as React from "react";
import Modal from "@mui/material/Modal";

export default function ModalBase({ children, open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {children}
      </Modal>
    </div>
  );
}
