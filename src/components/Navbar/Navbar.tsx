import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={style.nav}>
      <div>
        <NavLink
          to="/dialogs"
          className={style.nav_link}
          activeClassName={style.active_link}
        >
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/profile"
          className={style.nav_link}
          activeClassName={style.active_link}
        >
          Profile
        </NavLink>
      </div>
      <div>
        <a className={style.nav_link}>News</a>
      </div>
      <div>
        <a className={style.nav_link}>Music</a>
      </div>
      <div>
        <a className={style.nav_link}>Settings</a>
      </div>
    </nav>
  );
};
export default Navbar;
