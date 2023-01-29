import { setAppStatusAC } from "./../../app/app-reducer";
import { authAPI, profileAPI, securityAPI } from "../../api/api";
import { AppThunkDispatch } from "../../app/redux-store";
import {
  handleServerAppError,
  handleServerNetworkAppError,
} from "../../common/utils/error-utils";
import { AxiosError } from "axios";

export type AuthStateType = typeof initialState;

export type AuthActionsType =
  | ReturnType<typeof setAuthDataAC>
  | ReturnType<typeof setUserPhotoAC>
  | ReturnType<typeof setCaptchaAC>;

// ===================================================================

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isLoggedIn: false as boolean,
  userAvatar: null as null | string,
  captcha: "" as string,
};

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case "AUTH/SET-AUTH-DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "AUTH/SET-USER-PHOTO": {
      return {
        ...state,
        userAvatar: action.userAvatar,
      };
    }
    case "AUTH/SET-CAPTCHA": {
      return {
        ...state,
        captcha: action.captcha,
      };
    }
    default:
      return state;
  }
};

// =--------------------------------------------------------------------------

export const setAuthDataAC = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isLoggedIn: boolean,
  userAvatar: string | null,
  capctha: string
) => {
  return {
    type: "AUTH/SET-AUTH-DATA",
    payload: { userId, email, login, isLoggedIn, userAvatar, capctha },
  } as const;
};

export const setUserPhotoAC = (userAvatar: string | null) => {
  return {
    type: "AUTH/SET-USER-PHOTO",
    userAvatar,
  } as const;
};

export const setCaptchaAC = (captcha: string) => {
  return {
    type: "AUTH/SET-CAPTCHA",
    captcha,
  } as const;
};

// --------------------------------------------------------------------------------

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string) =>
  (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(email, password, rememberMe, captcha)
      .then((data) => {
        if (data.resultCode === 0) {
          return authAPI.authMe();
        } else {
          if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
          }
          throw new Error(data.messages[0]);
        }
      })
      .then((res) => {
        if (res?.data.resultCode === 0) {
          return res.data.data;
        } else {
          throw new Error(res.data.messages[0]);
        }
      })
      .then(async ({ id, email, login }) => {
        let response = await profileAPI.getProfile(id);
        dispatch(
          setAuthDataAC(id, email, login, true, response.data.photos.small, "")
        );
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response ? e.response.data.error : e;

        handleServerNetworkAppError(error, dispatch);
      });
  };

export const logout = () => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC("loading"));
  try {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthDataAC(null, null, null, false, null, ""));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(response?.data, dispatch);
    }
  } catch (e: any) {
    const error: AxiosError<{ error: string }> = e.response
      ? e.response.data.error
      : e;
    handleServerNetworkAppError(error, dispatch);
  }
};

export const getCaptchaUrl = () => async (dispatch: AppThunkDispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaAC(captchaUrl));
};
