import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Dialogs.module.css";

type DialogItemType = {
  name: string;
  id: number;
};
function DialogItem(props: DialogItemType) {
  return (
    <li className={style.list_item}>
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </li>
  );
}
function Dialogs() {
  return (
    <div className={style.dialogs}>
      <div>
        <ul className={style.dialogs_list}>
          <DialogItem name="Andrey" id={1} />
          <DialogItem name="Alex" id={2} />
          <DialogItem name="Elena" id={3} />
          <DialogItem name="Olga" id={4} />
          <DialogItem name="Dimych" id={5} />
        </ul>
      </div>
      <div className={style.dialogs_messages}>
        <div>
          <p>Hey! Hello! How are you?</p>
        </div>
        <div>
          <p>Why do you keep silent?</p>
        </div>
        <div>
          <p>Don't ignore me!</p>
        </div>
      </div>
    </div>
  );
}
export default Dialogs;
