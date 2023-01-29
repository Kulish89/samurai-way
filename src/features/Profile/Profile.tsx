import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../common/hooks/customHooks";
import Posts from "./Posts/Posts";
import { getStatus, getUserProfile } from "./profile-reducer";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export const Profile = () => {
  const authData = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  let { userId = null } = useParams();

  useEffect(() => {
    if (!userId) userId = String(authData.userId);
    dispatch(getUserProfile(Number(userId)));
    dispatch(getStatus(Number(userId)));
  }, [userId]);

  return (
    <div className={style.profilePage}>
      <div className={style.profile_wrapper}>
        <ProfileInfo />
        <Posts />
      </div>
    </div>
  );
};
