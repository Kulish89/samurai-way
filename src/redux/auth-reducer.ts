import { Dispatch } from "redux";
import { headerAPI, profileAPI } from "../api/api";

export type AuthStateType = {
  userId: null | string;
  email: null | string;
  login: null | string;
  isAuth: boolean;
  avatar: string | null;
};
type SetUserDataActionType = ReturnType<typeof setUserDataAC>;
type ActionsType = SetUserDataActionType;
let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  avatar: null,
};
export const authReducer = (
  state: AuthStateType = initialState,
  action: ActionsType
): AuthStateType => {
  switch (action.type) {
    case "SET-USER-DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

// =--------------------------------------------------------------------------

export const setUserDataAC = (
  userId: any,
  email: any,
  login: any,
  isAuth: boolean,
  avatar: string
) => {
  return {
    type: "SET-USER-DATA",
    payload: { userId, email, login, isAuth, avatar },
  } as const;
};

// --------------------------------------------------------------------------------

export const getAuthUserData = () => (dispatch: Dispatch) => {
  return headerAPI.authMe().then((response) => {
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      profileAPI.getProfile(id).then((res) => {
        dispatch(setUserDataAC(id, email, login, true, res.data.photos.small));
      });
    }
  });
};

// export const getCaptchaUrlSucces = (captchaUrl) => {
//   return { type: GET_CAPTCHA_URL_SUCCES, payload: { captchaUrl } };
// };
