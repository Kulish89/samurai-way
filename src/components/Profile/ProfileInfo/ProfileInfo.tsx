import style from "../Profile.module.css";
import background from "../../../assets/images/social-network-background.jpg";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = ({ profile }: any) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={style.content_background}>
        <img src={background} alt="background"></img>
      </div>
      <div className={style.content_description}>
        <img
          src={profile.photos?.small ? profile.photos.small : userPhoto}
          alt="userphoto"
        />
        <h2>{profile.fullName}</h2>
        <p>{profile.aboutMe}</p>
      </div>
    </div>
  );
};
export default ProfileInfo;
