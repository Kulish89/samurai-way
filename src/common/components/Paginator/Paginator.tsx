import React, { useEffect } from "react";
import { IconButton, Pagination } from "@mui/material";
import { useAppSelector } from "../../hooks/customHooks";
import s from "./Paginator.module.css";
import { useSearchParams } from "react-router-dom";
import { CheckboxInput } from "../Checkbox/CheckboxInput";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { SelectPageSize } from "../SelectPageSize/SelectPageSize";

// ====================================================================

export const Paginator = () => {
  const pagination = useAppSelector((state) => state.usersReducer.pagination);
  const appStatus = useAppSelector((state) => state.appReducer.status);
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoggedin = useAppSelector((state) => state.authReducer.isLoggedIn);

  let pagesCount = Math.ceil(
    pagination.totalUsersCount / (Number(searchParams.get("pageSize")) || 1)
  );

  const setCurrentPage = (e: React.ChangeEvent<unknown>, page: number) => {
    if (page) {
      searchParams.set("page", "" + page);
      setSearchParams(searchParams);
    }
  };
  const resetSearchParams = () => {
    setSearchParams({});
  };

  useEffect(() => {
    if (!searchParams.has("page") || !searchParams.has("pageSize")) {
      searchParams.append("page", "" + pagination.currentPage);
      searchParams.append("pageSize", "" + pagination.pageSize);
    }
    if (Number(searchParams.get("page")) > pagesCount && pagesCount !== 0) {
      searchParams.set("page", "" + pagesCount);
    }
    setSearchParams(searchParams);
  }, [searchParams, pagesCount]);

  return (
    <div className={s.paginator_wrapper}>
      <Pagination
        count={pagesCount}
        defaultPage={1}
        page={Number(searchParams.get("page"))}
        onChange={setCurrentPage}
        boundaryCount={2}
        size={"large"}
        disabled={appStatus === "loading"}
      />
      <SelectPageSize />
      {isLoggedin && (
        <>
          <CheckboxInput />
          <IconButton
            disabled={appStatus === "loading"}
            onClick={resetSearchParams}
          >
            <FilterAltOffIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default Paginator;
