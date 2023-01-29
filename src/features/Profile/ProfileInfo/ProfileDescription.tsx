import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../common/hooks/customHooks";

export const ProfileDescription = () => {
  const profile = useAppSelector((state) => state.profileReducer.profile);

  return profile.aboutMe ? (
    <>
      <Typography component="span" variant="body2" color={"primary"}>
        {"About me: "}
      </Typography>
      <Typography component="p" variant="body1">
        {profile.aboutMe}
      </Typography>
    </>
  ) : (
    <></>
  );
};
