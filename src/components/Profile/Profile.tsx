import React from "react";
import style from "./Profile.module.css";
import background from "../../assets/images/social-network-background.jpg";
import Posts from "./Posts/Posts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
type ProfilePropsType = {
  postsData: Array<any>;
};
const Profile = ({ postsData }: ProfilePropsType) => {
  return (
    <div className={style.content}>
      <ProfileInfo />

      <Posts postsData={postsData} />
    </div>
  );
};
export default Profile;
