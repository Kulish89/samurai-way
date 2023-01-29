import React, { useState } from "react";
import style from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem";
import Message from "./Message";
import { addMessageAC } from "./dialogs-reducer";
import { useAppDispatch, useAppSelector } from "../../common/hooks/customHooks";

export const Dialogs = () => {
  const dialogs = useAppSelector((state) => state.dialogsReducer.dialogs);
  const messages = useAppSelector((state) => state.dialogsReducer.messages);
  const [messageValue, setMessageValue] = useState<string>("");

  const dispatch = useAppDispatch();

  return (
    <div className={style.dialogs}>
      <div>
        <ul className={style.dialogs_list}>
          {dialogs.map((el) => {
            return <DialogItem key={el.id} name={el.name} id={el.id} />;
          })}
        </ul>
      </div>
      <div className={style.dialogs_messages}>
        <div>
          {messages.map((el) => {
            return <Message key={el.id} message={el.message} />;
          })}
        </div>
        <div>
          <input
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.currentTarget.value);
            }}
            type="text"
            placeholder="Enter your message!"
          />
          <button
            onClick={() => {
              dispatch(addMessageAC(messageValue));
              setMessageValue("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
