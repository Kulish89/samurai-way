import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../common/hooks/customHooks";
import { User } from "./User";
import { UserType } from "./users-reducer";
import styles from "./Users.module.css";

export const UserList = () => {
  const users = useAppSelector((state) => state.usersReducer.users);
  return users.length ? (
    <div className={styles.usersList}>
      {users.map((el: UserType) => (
        <User key={el.id} user={el} />
      ))}
    </div>
  ) : (
    <Typography variant="h3">Not found users</Typography>
  );
};
