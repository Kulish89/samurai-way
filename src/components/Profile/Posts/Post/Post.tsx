import style from "../Posts.module.css";
import userAva from "../../../../assets/images/user.png";
type PostPropsType = {
  text: string;
};
const Post = (props: PostPropsType) => {
  return (
    <div className={style.postContainer}>
      <img src={userAva} className={style.post_avatar}></img>
      <div className={style.post_text}>{props.text}</div>
    </div>
  );
};
export default Post;
