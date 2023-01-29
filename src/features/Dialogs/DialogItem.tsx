import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Dialogs.module.css";

type DialogItemType = {
  name: string;
  id: number;
};

export const DialogItem = (props: DialogItemType) => {
  return (
    <li className={style.list_item}>
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </li>
  );
};
