import style from "../Posts.module.css";
import userAva from "../../../../assets/images/user.png";
const Post = () => {
  return (
    <div className={style.postContainer}>
      <img src={userAva} className={style.post_avatar}></img>
      <div className={style.post_text}>Hello World!</div>
    </div>
  );
};
export default Post;
