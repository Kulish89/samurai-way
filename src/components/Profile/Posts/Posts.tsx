import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { addPostAC, PostType } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import Post from "./Post/Post";
import style from "./Posts.module.css";

const Posts = () => {
  const postsData = useSelector<AppStateType, Array<PostType>>(
    (state) => state.profileReducer.posts
  );
  const dispatch: Dispatch = useDispatch();
  const [postTitle, setPostTitle] = useState("");
  return (
    <div className={style.posts}>
      <h2 className={style.posts_title}>My posts</h2>
      <div>
        <input
          value={postTitle}
          type="text"
          className={style.posts_input}
          onChange={(e) => {
            setPostTitle(e.currentTarget.value);
          }}
        />
        <button
          className={style.posts_button}
          onClick={() => {
            dispatch(addPostAC(postTitle));
            setPostTitle("");
          }}
        >
          Add post
        </button>
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
