import Post from "./Post/Post";
import style from "./Posts.module.css";
const Posts = () => {
  return (
    <div className={style.posts}>
      <h2 className={style.posts_title}>My posts</h2>
      <div>
        <input type="text" className={style.posts_input} />
        <button className={style.posts_button}>Add post</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};
export default Posts;
