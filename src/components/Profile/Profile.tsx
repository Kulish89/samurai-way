import React from "react";
import style from "./Profile.module.css";
import background from "../../assets/images/social-network-background.jpg";
import Posts from "./Posts/Posts";
const Profile = () => {
  return (
    <div className={style.content}>
      <div className={style.content_background}>
        <img src={background}></img>
      </div>
      <div>Ava+description</div>
      <Posts />
    </div>
  );
};
export default Profile;
