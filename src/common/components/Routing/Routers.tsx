import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Dialogs } from "../../../features/Dialogs/Dialogs";
import { Login } from "../../../features/Login/Login";
import { Music } from "../../../features/Music/Music";
import { News } from "../../../features/News/News";
import { Profile } from "../../../features/Profile/Profile";
import { Users } from "../../../features/Users/Users";
import { useAppSelector } from "../../hooks/customHooks";
import { NotFound } from "../NotFound/NotFound";

export const PATH = {
  MAIN: "/",
  USERS: "/users",
  LOGIN: "/login",
  PROFILE: "/profile",
  DIALOGS: "/dialogs",
  NEWS: "/news",
  MUSIC: "/music",
  NOT_FOUND: "/404",
};

const RequireAuth = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isLoggedIn);

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path={`${PATH.PROFILE}/:userId?`} element={<Profile />} />
        <Route path={PATH.DIALOGS} element={<Dialogs />} />
      </Route>
      <Route path={PATH.USERS} element={<Users />} />
      <Route path={PATH.MAIN} element={<Navigate to={PATH.USERS} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.NEWS} element={<News />} />
      <Route path={PATH.MUSIC} element={<Music />} />
      <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      <Route path={"*"} element={<Navigate to="/404" />} />
    </Routes>
  );
};
