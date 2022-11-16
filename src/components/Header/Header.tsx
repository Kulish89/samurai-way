import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";
import headerLogo from "../../assets/images/social-network-logo.png";
import {
  AuthStateType,
  getAuthUserData,
  setUserDataAC,
} from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import style from "./Header.module.css";
import userPhoto from "../../assets/images/user.png";
import { headerAPI, profileAPI } from "../../api/api";
const Header = () => {
  const authData = useSelector<AppStateType, AuthStateType>(
    (state) => state.authReducer
  );

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAuthUserData());
  }, []);
  return (
    <header className={style.header}>
      <img src={headerLogo} />
      <div className={style.loginBlock}>
        {authData.isAuth ? (
          <div className={style.login_userData}>
            <img
              src={authData.avatar ? authData.avatar : userPhoto}
              alt="user icon"
            />
            <div>
              <div>{authData.login}</div>
              <div>
                <button onClick={() => {}}>Log out</button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
