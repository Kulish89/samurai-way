import { NavLink, useSearchParams } from "react-router-dom";
import headerLogo from "../../assets/images/social-network-logo.png";
import { logout } from "../Login/auth-reducer";
import style from "./Header.module.css";
import userPhoto from "../../assets/images/user.svg";
import { useAppDispatch, useAppSelector } from "../../common/hooks/customHooks";
import { PATH } from "../../common/components/Routing/Routers";
import { SearchInput } from "../../common/components/Search/SearchInput";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const authData = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const logOutHandler = () => {
    setSearchParams({});
    dispatch(logout());
  };

  return (
    <header className={style.header}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={headerLogo} alt="logo" />
        <SearchInput />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {authData.isLoggedIn ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <NavLink to={PATH.PROFILE}>
              <Avatar
                src={authData.userAvatar ? authData.userAvatar : userPhoto}
                alt="user icon"
              />
            </NavLink>

            <IconButton onClick={logOutHandler}>
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : (
          <div>
            <Button variant={"contained"} color={"primary"} size="small">
              <NavLink className={style.loginLink} to={PATH.LOGIN}>
                Login
              </NavLink>
            </Button>
          </div>
        )}
      </Box>
    </header>
  );
};
export default Header;
