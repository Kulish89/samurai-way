import Post from "./Post/Post";
import style from "./Posts.module.css";
type PostsPropsType = {
  postsData: Array<any>;
};
const Posts = ({ postsData }: PostsPropsType) => {
  return (
    <div className={style.posts}>
      <h2 className={style.posts_title}>My posts</h2>
      <div>
        <input type="text" className={style.posts_input} />
        <button className={style.posts_button}>Add post</button>
      </div>
      <div>
        {postsData.map((post) => {
          return <Post key={post.id} text={post.text} />;
        })}
      </div>
    </div>
  );
};
export default Posts;
