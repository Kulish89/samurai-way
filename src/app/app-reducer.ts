import { AppThunkDispatch } from "./redux-store";
import { setAuthDataAC } from "../features/Login/auth-reducer";
import { authAPI, profileAPI } from "../api/api";
import { setProfileAC } from "../features/Profile/profile-reducer";

// ===============================================================

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type AppStateType = typeof initialState;

export type AppReducerActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppInitializedAC>;

//============================================================
let initialState = {
  isInitialized: false as boolean,
  status: "idle" as RequestStatusType,
  error: null as null | string,
};

const appReducer = (
  state: AppStateType = initialState,
  action: AppReducerActionsType
) => {
  switch (action.type) {
    case "APP/SET-INITIALIZED": {
      return {
        ...state,
        isInitialized: action.isInitialized,
      };
    }
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    default:
      return state;
  }
};

// ===============================================================

export const setAppInitializedAC = (value: boolean) =>
  ({ type: "APP/SET-INITIALIZED", isInitialized: value } as const);

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);

export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error } as const);

// ===============================================================

export const initializeApp = () => async (dispatch: AppThunkDispatch) => {
  try {
    let response = await authAPI.authMe();
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      let res = await profileAPI.getProfile(id);
      dispatch(
        setAuthDataAC(id, email, login, true, res.data.photos.small, "")
      );
      dispatch(setProfileAC(res.data));
      dispatch(setAppInitializedAC(true));
    } else {
      dispatch(setAppInitializedAC(true));
    }
  } catch (e) {}
};

export default appReducer;
