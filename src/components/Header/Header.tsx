import React from "react";
import headerLogo from "../../assets/images/social-network-logo.png";
import style from "./Header.module.css";
const Header = () => {
  return (
    <header className={style.header}>
      <img src={headerLogo} />
    </header>
  );
};
export default Header;
