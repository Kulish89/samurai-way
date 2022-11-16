import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getUserProfile, ProfileType } from "../../redux/profile-reducer";
import { AppStateType } from "../../redux/redux-store";
import Posts from "./Posts/Posts";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
type PathParamsType = {
  userId: string;
};
type PropsType = RouteComponentProps<PathParamsType>;
const Profile = (props: PropsType) => {
  const profile = useSelector<AppStateType, ProfileType>(
    (state) => state.profileReducer.profile
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    let userId = props.match.params.userId;
    if (!userId) userId = "16707";
    dispatch(getUserProfile(userId));
  }, []);
  return (
    <div className={style.content}>
      <ProfileInfo profile={profile} />
      <Posts />
    </div>
  );
};

export default Profile;
