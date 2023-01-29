import React, { ChangeEvent } from "react";

import { IconButton } from "@mui/material";

import photoIcon from "../../../assets/icons/photo-icon.svg";
import { useAppDispatch } from "../../hooks/customHooks";
import { handleServerNetworkAppError } from "../../utils/error-utils";

type InputTypeFilePT = {
  changeUserPhoto: (photo: any) => void;
};

export const InputTypeFile = ({ changeUserPhoto }: InputTypeFilePT) => {
  const dispatch = useAppDispatch();

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.type.includes("image")) {
        changeUserPhoto(file);
      } else if (!file.type.includes("image")) {
        const error = new Error(
          "It is not an image. PLease choose another file"
        );
        handleServerNetworkAppError(error, dispatch);
      }
    }
  };

  return (
    <div>
      <label>
        <input
          type="file"
          onChange={uploadHandler}
          style={{ display: "none" }}
        />
        <IconButton
          component="span"
          size="small"
          sx={{
            backgroundColor: "#11c5a7",
            position: "absolute",
            bottom: "15px",
            right: "15px",
            border: "1px solid #FFFFFF",
          }}
        >
          <img src={photoIcon} alt="" />
        </IconButton>
      </label>
    </div>
  );
};
