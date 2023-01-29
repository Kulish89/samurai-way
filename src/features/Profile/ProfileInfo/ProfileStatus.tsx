import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/customHooks";
import { updateStatus } from "../profile-reducer";

const ProfileStatus = () => {
  const statusValue = useAppSelector((state) => {
    return state.profileReducer.status;
  });
  const profileId = useAppSelector(
    (state) => state.profileReducer.profile.userId
  );
  const authId = useAppSelector((state) => state.authReducer.userId);

  let [editMode, setEditMode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(statusValue);

  const activateEditMode = () => {
    profileId === authId && setEditMode(true);
  };
  const dispatch = useAppDispatch();

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateStatus(status));
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  useEffect(() => {
    setStatus(statusValue);
  }, [statusValue]);

  return editMode ? (
    <TextField
      variant="standard"
      autoFocus={true}
      onChange={onStatusChange}
      onBlur={deactivateEditMode}
      value={status}
      fullWidth
    />
  ) : (
    <Typography
      component="p"
      variant="body1"
      fontStyle={"italic"}
      sx={{ opacity: "0.8" }}
      onDoubleClick={activateEditMode}
    >
      {status}
    </Typography>
  );
};

export default ProfileStatus;
