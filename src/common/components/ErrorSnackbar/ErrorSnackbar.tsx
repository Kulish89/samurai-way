import React from "react";
import { AlertProps, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/customHooks";
import { setAppErrorAC } from "../../../app/app-reducer";
import MuiAlert from "@mui/material/Alert";

// ==============================================

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function ErrorSnackbar() {
  const error = useAppSelector((state) => state.appReducer.error);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent<any> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
