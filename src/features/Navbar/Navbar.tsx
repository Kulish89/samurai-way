import Button from "@mui/material/Button";
import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../common/components/Routing/Routers";

import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <Button>
        <NavLink
          to={PATH.PROFILE}
          className={({ isActive }) =>
            isActive ? `${style.active_link} ${style.nav_link}` : style.nav_link
          }
        >
          Profile
        </NavLink>
      </Button>

      <Button>
        <NavLink
          to={PATH.USERS}
          className={({ isActive }) =>
            isActive ? `${style.active_link} ${style.nav_link}` : style.nav_link
          }
        >
          Users
        </NavLink>
      </Button>
      <Button>
        <NavLink
          to={PATH.DIALOGS}
          className={({ isActive }) =>
            isActive ? `${style.active_link} ${style.nav_link}` : style.nav_link
          }
        >
          Messages
        </NavLink>
      </Button>
      <Button>
        <NavLink
          to={PATH.NEWS}
          className={({ isActive }) =>
            isActive ? `${style.active_link} ${style.nav_link}` : style.nav_link
          }
        >
          News
        </NavLink>
      </Button>
      <Button>
        <NavLink
          to={PATH.MUSIC}
          className={({ isActive }) =>
            isActive ? `${style.active_link} ${style.nav_link}` : style.nav_link
          }
        >
          Mucis
        </NavLink>
      </Button>
    </nav>
  );
};
export default Navbar;
