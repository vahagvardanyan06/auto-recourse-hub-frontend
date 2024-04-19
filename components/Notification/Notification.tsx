import useNotification from "@/hooks/useNotification";
import { selectNotification } from "@/redux/selectors";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { open, timeout, type, message } = useSelector(selectNotification);
  const { removeNotification } = useNotification();

  const handleClose = useCallback(
    (_: unknown, reason?: SnackbarCloseReason) => {
      reason !== "clickaway" && removeNotification();
    },
    []
  );

  return (
    <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
