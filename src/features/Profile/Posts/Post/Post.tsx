import userAva from "../../../../assets/images/user.svg";
import { useAppSelector } from "../../../../common/hooks/customHooks";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Badge } from "@mui/material";

const Post = (props: { text: string }) => {
  const [isLike, setIsLike] = useState<boolean>(false);

  const userPhoto = useAppSelector(
    (state) => state.profileReducer.profile.photos.small
  );

  return (
    <Box
      sx={{ mt: "20px", display: "flex", gap: "10px", alignItems: "center" }}
    >
      <Avatar
        alt="user photo"
        src={userPhoto ? userPhoto : userAva}
        sx={{ width: "20px", height: "20px", alignSelf: "flex-start" }}
      />
      <Typography component={"p"} variant={"caption"}>
        {props.text}
      </Typography>
      <IconButton
        onClick={() => {
          setIsLike(!isLike);
        }}
      >
        {isLike ? (
          <Badge badgeContent={57} color="primary">
            <FavoriteIcon color={"secondary"} />
          </Badge>
        ) : (
          <Badge badgeContent={56} color="primary">
            <FavoriteBorderIcon />
          </Badge>
        )}
      </IconButton>
    </Box>
  );
};
export default Post;
