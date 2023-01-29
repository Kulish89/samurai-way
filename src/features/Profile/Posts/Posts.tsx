import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/customHooks";
import { addPostAC } from "../profile-reducer";
import Post from "./Post/Post";

const Posts = () => {
  const postsData = useAppSelector((state) => state.profileReducer.posts);
  const dispatch = useAppDispatch();
  const [postTitle, setPostTitle] = useState("");

  const addPostHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (postTitle) {
      dispatch(addPostAC(postTitle));
      setPostTitle("");
    }
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <Typography component={"p"} variant={"h6"}>
        Posts
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <TextField
          value={postTitle}
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "600px" }}
          size="small"
          label="Write some text here."
          multiline
          onChange={(e) => {
            setPostTitle(e.currentTarget.value);
          }}
        />
        <Button onClick={addPostHandler} variant={"outlined"}>
          Add post
        </Button>
      </Box>
      <div>
        {postsData.map((post) => {
          return <Post key={post.id} text={post.text} />;
        })}
      </div>
    </Box>
  );
};
export default Posts;
