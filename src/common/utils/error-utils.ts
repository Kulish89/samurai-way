// import { ResponseType } from "../api/todolists-api";

import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { AppThunkDispatch } from "../../app/redux-store";

export const handleServerAppError = (data: any, dispatch: AppThunkDispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("some error occurred"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkAppError = (
  error: any,
  dispatch: AppThunkDispatch
) => {
  dispatch(
    setAppErrorAC(error.message ? error.message : "some error occurred")
  );
  dispatch(setAppStatusAC("failed"));
};
