// const SET_USERS = "SET_USERS";
// const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
// const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import photo from "../assets/images/user.png";
type ActionType =
  | FollowActionType
  | UnfollowActionType
  | SetUsersActionType
  | setCurrentPageActionType
  | setTotalUsersCountActionType;
type FollowActionType = ReturnType<typeof followAC>;
type UnfollowActionType = ReturnType<typeof unfollowAC>;
type SetUsersActionType = ReturnType<typeof setUsersAC>;
type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>;
type setTotalUsersCountActionType = ReturnType<typeof setTotalUsersCountAC>;
export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: any;
  photos: { small: string | null; large: string | null };
  status: string | null;
  followed: boolean;
};
export type PaginationType = {
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
};
export type UsersPageType = typeof initialState;
let initialState = {
  users: [] as Array<UserType>,
  pagination: {
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 8,
  } as PaginationType,

  // isFetching: true,
  // followingInProgress: [],
};
const usersReducer = (
  state = initialState,
  action: ActionType
): UsersPageType => {
  switch (action.type) {
    case "FOLLOW": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: true } : user
        ),
      };
    }
    case "UNFOLLOW": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: false } : user
        ),
      };
    }
    case "SET-USERS": {
      return {
        ...state,
        users: action.usersArray,
      };
    }
    case "SET-CURRENT-PAGE": {
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.page },
      };
    }
    case "SET-TOTAL-USERS-COUNT": {
      return {
        ...state,
        pagination: { ...state.pagination, totalUsersCount: action.totalCount },
      };
    }
    default:
      return state;
  }
};
//  if (action.type === TOGGLE_IS_FETCHING) {
//   return {
//     ...state,
//     isFetching: action.isFetching,
//   };
// } else if (action.type === TOGGLE_IS_FOLLOWING_PROGRESS) {
//   return {
//     ...state,
//     followingInProgress: action.isFetching
//       ? [...state.followingInProgress, action.userIid]
//       : state.followingInProgress.filter((id) => id != action.userId),
//   };
// }

export const followAC = (userId: number) => {
  return { type: "FOLLOW", userId } as const;
};
export const unfollowAC = (userId: number) => {
  return { type: "UNFOLLOW", userId } as const;
};
export const setUsersAC = (usersArray: Array<any>) => {
  return { type: "SET-USERS", usersArray } as const;
};

export const setCurrentPageAC = (page: number) => {
  return { type: "SET-CURRENT-PAGE", page } as const;
};
export const setTotalUsersCountAC = (totalCount: number) => {
  return { type: "SET-TOTAL-USERS-COUNT", totalCount } as const;
};
// ------------------------------------------------------------------------------
export const requestUsers = (currentPage: number, pageSize: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setCurrentPageAC(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setUsersAC(data.items));
      dispatch(setTotalUsersCountAC(data.totalCount));
      dispatch(setCurrentPageAC(currentPage));
    });
  };
};

export const unfollowThunk = (userId: number) => {
  return async (dispatch: Dispatch) => {
    let response = await usersAPI.unfollow(userId);
    if (response.data.resultCode == 0) {
      dispatch(unfollowAC(userId));
    }
  };
};
export const followThunk = (userId: number) => {
  return async (dispatch: Dispatch) => {
    let response = await usersAPI.follow(userId);
    if (response.data.resultCode == 0) {
      dispatch(followAC(userId));
    }
  };
};
export default usersReducer;
