import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { PaginationType, requestUsers } from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css";

const Users = () => {
  let users = useSelector((state: AppStateType) => state.usersReducer.users);
  const pagination: PaginationType = useSelector(
    (state: AppStateType) => state.usersReducer.pagination
  );
  let dispatch: any = useDispatch();
  const setCurrentPage = (p: number) => {
    dispatch(requestUsers(p, pagination.pageSize));
  };
  useEffect(() => {
    dispatch(requestUsers(pagination.currentPage, pagination.pageSize));
  }, []);
  return (
    <div>
      <Paginator
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        setCurrentPage={setCurrentPage}
        totalItemsCount={pagination.totalUsersCount}
      />
      <div className={styles.usersList}>
        {users.map((el: any) => (
          <User key={el.id} user={el} />
        ))}
      </div>
    </div>
  );
};

export default Users;
