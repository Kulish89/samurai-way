import userPhoto from "../../assets/images/user.svg";
import { NavLink } from "react-router-dom";
import { followThunk, unfollowThunk, UserType } from "./users-reducer";
import { useAppDispatch, useAppSelector } from "../../common/hooks/customHooks";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

type UserPropsType = {
  user: UserType;
};

// -----------------------------------------------------------------------------
export const User = ({ user }: UserPropsType) => {
  const appStatus = useAppSelector((state) => state.appReducer.status);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);

  const follow = () => {
    dispatch(followThunk(user.id));
  };

  const unfollow = () => {
    dispatch(unfollowThunk(user.id));
  };

  return (
    <Card
      sx={[
        { width: "100%", borderRadius: "5px", transition: "all 0.5s" },
        () => ({
          "&:hover": {
            transform: "scale(1.03)",
          },
        }),
      ]}
    >
      <NavLink to={"/profile/" + user.id}>
        <CardMedia
          sx={{ height: 120, padding: 5 }}
          image={user.photos?.large ? user.photos.large : userPhoto}
          title="user photo"
        />
      </NavLink>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            component="h4"
            sx={{ wordWrap: "wrap" }}
          >
            {user.name}
          </Typography>
        </CardContent>
        <CardActions>
          {user.followed ? (
            <Button
              size="small"
              onClick={unfollow}
              disabled={appStatus === "loading" || !isLoggedIn}
            >
              <PersonRemoveAlt1Icon />
            </Button>
          ) : (
            <Button
              size="small"
              onClick={follow}
              disabled={appStatus === "loading" || !isLoggedIn}
            >
              <PersonAddAlt1Icon />
            </Button>
          )}
        </CardActions>
      </Box>
    </Card>
  );
};
