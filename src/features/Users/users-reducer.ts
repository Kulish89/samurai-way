import { setAppStatusAC } from "./../../app/app-reducer";
import { AppThunkDispatch } from "./../../app/redux-store";
import { usersAPI } from "../../api/api";
import { handleServerNetworkAppError } from "../../common/utils/error-utils";
import { AxiosError } from "axios";

// ======================================================

export type UserReduserActionsType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof setPagesizeAC>;

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null | string;
  photos: { small: string | null; large: string | null };
  status: string | null;
  followed: boolean;
};
export type PaginationType = {
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
};
export type UsersPageStateType = typeof initialState;

// ================================================

let initialState = {
  users: [] as Array<UserType>,
  pagination: {
    totalUsersCount: 1,
    currentPage: 1,
    pageSize: 10,
  } as PaginationType,
  term: "" as string,
};

const usersReducer = (
  state: UsersPageStateType = initialState,
  action: UserReduserActionsType
): UsersPageStateType => {
  switch (action.type) {
    case "USERS/FOLLOW": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: true } : user
        ),
      };
    }
    case "USERS/UNFOLLOW": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: false } : user
        ),
      };
    }
    case "USERS/SET-USERS": {
      return {
        ...state,
        users: action.usersArray,
      };
    }
    case "USERS/SET-CURRENT-PAGE": {
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.page },
      };
    }
    case "USERS/SET-PAGE-SIZE": {
      return {
        ...state,
        pagination: { ...state.pagination, pageSize: action.size },
      };
    }
    case "USERS/SET-TOTAL-USERS-COUNT": {
      return {
        ...state,
        pagination: { ...state.pagination, totalUsersCount: action.totalCount },
      };
    }
    default:
      return state;
  }
};

// ==========================================================================

export const followAC = (userId: number) => {
  return { type: "USERS/FOLLOW", userId } as const;
};
export const unfollowAC = (userId: number) =>
  ({ type: "USERS/UNFOLLOW", userId } as const);

export const setUsersAC = (usersArray: Array<UserType>) =>
  ({ type: "USERS/SET-USERS", usersArray } as const);

export const setCurrentPageAC = (page: number) =>
  ({ type: "USERS/SET-CURRENT-PAGE", page } as const);

export const setPagesizeAC = (size: number) =>
  ({ type: "USERS/SET-PAGE-SIZE", size } as const);

export const setTotalUsersCountAC = (totalCount: number) =>
  ({ type: "USERS/SET-TOTAL-USERS-COUNT", totalCount } as const);

// ------------------------------------------------------------------------------

export const requestUsers =
  ({ page, pageSize, term, friend }: any) =>
  async (dispatch: AppThunkDispatch) => {
    setAppStatusAC("loading");

    try {
      let data = await usersAPI.getUsers({
        page: Number(page),
        count: Number(pageSize),
        term,
        friend,
      });
      dispatch(setUsersAC(data.items));
      dispatch(setTotalUsersCountAC(data.totalCount));
      setAppStatusAC("succeeded");
    } catch (e: any) {
      const error: AxiosError<{ error: string }> = e.response
        ? e.response.data.error
        : e;
      handleServerNetworkAppError(error, dispatch);
    }
  };

export const unfollowThunk =
  (userId: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      let response = await usersAPI.unfollow(userId);
      if (response.data.resultCode === 0) {
        dispatch(unfollowAC(userId));
        dispatch(setAppStatusAC("succeeded"));
      }
    } catch (e: any) {
      const error: AxiosError<{ error: string }> = e.response
        ? e.response.data.error
        : e;
      handleServerNetworkAppError(error, dispatch);
    }
  };

export const followThunk =
  (userId: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      let response = await usersAPI.follow(userId);
      if (response.data.resultCode === 0) {
        dispatch(followAC(userId));
        dispatch(setAppStatusAC("succeeded"));
      }
    } catch (e: any) {
      const error: AxiosError<{ error: string }> = e.response
        ? e.response.data.error
        : e;
      handleServerNetworkAppError(error, dispatch);
    }
  };
export default usersReducer;
