import React, { useState } from "react";
import userPhoto from "../../assets/images/user.png";
import styles from "./Users.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  followThunk,
  unfollowThunk,
  UserType,
} from "../../redux/users-reducer";

type UserPropsType = {
  user: UserType;
};

// -----------------------------------------------------------------------------
const User = ({ user }: UserPropsType) => {
  const [disable, setDisable] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  const follow = () => {
    setDisable(true);
    dispatch(followThunk(user.id));
    setDisable(false);
  };

  const unfollow = () => {
    setDisable(true);
    new Promise(() => {
      dispatch(unfollowThunk(user.id));
    }).then(() => {
      setDisable(false);
    });
  };

  return (
    <div className={styles.person}>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img src={user.photos.small ? user.photos.small : userPhoto}></img>
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button onClick={unfollow} disabled={disable}>
              UnFollow
            </button>
          ) : (
            <button onClick={follow} disabled={disable}>
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          {user.status && (
            <div className={styles.status}>{`"${user.status}"`}</div>
          )}
        </span>
      </span>
    </div>
  );
};

export default User;
