import React from "react";
import style from "./Dialogs.module.css";

const Message = (props: any) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};
export default Message;
