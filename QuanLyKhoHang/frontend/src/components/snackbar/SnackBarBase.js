import React from "react";
import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

function SnackBarBase(
  {
    open,
    handleClose,
    type = "error", // success
    message,
    vertical = "top",
    horizontal = "right",
    duration = 3000,
  },
  ref
) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={duration}
    >
      <Alert severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}

SnackBarBase.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  duration: PropTypes.number,
};

export default SnackBarBase;
