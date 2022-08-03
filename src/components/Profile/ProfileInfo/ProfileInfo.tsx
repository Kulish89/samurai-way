import style from "../Profile.module.css";
import background from "../../../assets/images/social-network-background.jpg";
const ProfileInfo = () => {
  return (
    <div>
      <div className={style.content_background}>
        <img src={background}></img>
      </div>
      <div className={style.content_description}>Ava+description</div>
    </div>
  );
};
export default ProfileInfo;
