import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import Message from "./Message";

type DialogsPropsType = {
  dialogsData: Array<any>;
  messagesData: Array<any>;
};

function Dialogs({ dialogsData, messagesData }: DialogsPropsType) {
  return (
    <div className={style.dialogs}>
      <div>
        <ul className={style.dialogs_list}>
          {dialogsData.map((el) => {
            return <DialogItem key={el.id} name={el.name} id={el.id} />;
          })}
        </ul>
      </div>
      <div className={style.dialogs_messages}>
        {messagesData.map((el) => {
          return <Message key={el.id} message={el.message} />;
        })}
      </div>
    </div>
  );
}
export default Dialogs;
