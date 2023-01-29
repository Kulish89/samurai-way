import { SvgIcon } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as jobSearch } from "../../../assets/icons/job-search.svg";
import { useAppSelector } from "../../../common/hooks/customHooks";

export const ProfileName = () => {
  const profile = useAppSelector((state) => state.profileReducer.profile);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Typography component="h6" variant="h6">
        {profile.fullName}{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          borderBottom: "1px solid #11c5a7",
          wordBreak: "break-word",
        }}
      >
        {profile.lookingForAJob && (
          <SvgIcon color="primary" component={jobSearch} inheritViewBox />
        )}
        {profile.lookingForAJobDescription && (
          <Typography component="p" variant="body1">
            {profile.lookingForAJobDescription}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
