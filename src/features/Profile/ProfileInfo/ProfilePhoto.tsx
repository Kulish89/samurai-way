import Avatar from "@mui/material/Avatar";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/customHooks";
import { updateUserPhoto } from "../profile-reducer";
import userPhoto from "../../../assets/images/user.svg";
import { InputTypeFile } from "../../../common/components/InputTypeFile/InputTypeFile";
import Box from "@mui/material/Box";

export const ProfilePhoto = () => {
  const profile = useAppSelector((state) => state.profileReducer.profile);
  const dispatch = useAppDispatch();
  const authId = useAppSelector((state) => state.authReducer.userId);
  const avatarErrorHandler = () => {
    alert("Incorrect image");
  };
  const changeUserAvatar = (photo: any) => {
    dispatch(updateUserPhoto(photo));
  };
  return (
    <Box component="div" sx={{ position: "relative" }}>
      <Avatar
        alt="user photo"
        src={profile.photos?.large ? profile.photos.large : userPhoto}
        onError={avatarErrorHandler}
        sx={{
          width: "180px",
          height: "180px",
          border: "solid 7px #c0efe7",
          backgroundColor: "white",
        }}
      />
      {profile.userId === authId && (
        <InputTypeFile changeUserPhoto={changeUserAvatar} />
      )}
    </Box>
  );
};
