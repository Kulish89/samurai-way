import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Paginator from "../../common/components/Paginator/Paginator";
import { useAppDispatch } from "../../common/hooks/customHooks";
import { UserList } from "./UserList";
import { requestUsers } from "./users-reducer";
import styles from "./Users.module.css";

export const Users = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  useEffect(() => {
    if (Object.keys(params).length !== 0) {
      dispatch(requestUsers(params));
    }
  }, [searchParams, dispatch]);

  return (
    <div className={styles.user_page}>
      <Paginator />
      <div className={styles.usersList_wrapper}>
        <UserList />
      </div>
    </div>
  );
};
