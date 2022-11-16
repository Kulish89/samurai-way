import React, { useState } from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import Message from "./Message";
import { DispatchProp, useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { addMessageAC } from "../../redux/dialogs-reducer";
import { Dispatch } from "redux";
import { Redirect } from "react-router-dom";

function Dialogs() {
  const dialogs = useSelector(
    (state: AppStateType) => state.dialogsReducer.dialogs
  );
  const isAuth = useSelector<AppStateType, boolean>(
    (state) => state.authReducer.isAuth
  );
  const messages = useSelector(
    (state: AppStateType) => state.dialogsReducer.messages
  );
  const [messageValue, setMessageValue] = useState<string>("");
  const dispatch: Dispatch = useDispatch();

  return isAuth ? (
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
  ) : (
    <Redirect to="/login" />
  );
}
export default Dialogs;
