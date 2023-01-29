import React from "react";

const Message = (props: { message: string }) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};
export default Message;
