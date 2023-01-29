import style from "../Profile.module.css";
import background from "../../../assets/images/social-network-background.jpg";
import ProfileStatus from "./ProfileStatus";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../../../common/hooks/customHooks";
import { ProfileName } from "./ProfileName";
import { ProfilePhoto } from "./ProfilePhoto";
import { ProfileContacts } from "./ProfileContacts";
import { SettingsModal } from "../../../common/components/SettingsModal/SettingsModal";
import { ProfileDescription } from "./ProfileDescription";

const ProfileInfo = () => {
  const profile = useAppSelector((state) => state.profileReducer.profile);
  const appStatus = useAppSelector((state) => state.appReducer.status);
  const authId = useAppSelector((state) => state.authReducer.userId);

  return appStatus === "loading" ? (
    <CircularProgress />
  ) : (
    <div>
      <div className={style.content_background}>
        <img src={background} alt="background"></img>
      </div>
      <div className={style.content_description}>
        <Box>
          <ProfilePhoto />
        </Box>
        <Box
          sx={{
            pt: "85px",
            flexGrow: 1,
            maxWidth: "600px",
            wordWrap: "break-word",
          }}
        >
          <ProfileName />
          <ProfileStatus />
          <ProfileDescription />
          <ProfileContacts />
        </Box>
        {profile.userId === authId && (
          <Box sx={{ pt: "90px" }}>
            <SettingsModal />
          </Box>
        )}
      </div>
    </div>
  );
};
export default ProfileInfo;
