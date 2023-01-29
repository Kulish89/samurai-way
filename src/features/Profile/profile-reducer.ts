import { handleServerAppError } from "./../../common/utils/error-utils";
import { AxiosError } from "axios";
import { profileAPI } from "../../api/api";
import { setAppStatusAC } from "../../app/app-reducer";
import { handleServerNetworkAppError } from "../../common/utils/error-utils";
import {
  AppStateType,
  AppThunk,
  AppThunkDispatch,
} from "./../../app/redux-store";
import { setUserPhotoAC } from "../Login/auth-reducer";

// ==============================================================

export type ProfileActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof updateUserPhotoAC>;

export type ProfilePageType = typeof initialState;

export type PostType = {
  text: string;
  id: number;
};

export type ProfileType = {
  aboutMe: string;
  userId: number | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string | null;
    vk: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    website: string | null;
    youtube: string | null;
    mainLink: string | null;
  };
  photos: {
    small: string | null;
    large: string | null;
  };
};

// =========================================================================

let initialState = {
  posts: [
    {
      id: 1,
      text: "ChatGPT (Generative Pre-trained Transformer) is a chatbot launched by OpenAI in November 2022. It is built on top of OpenAI's GPT-3 family of large language models, and is fine-tuned (an approach to transfer learning) with both supervised and reinforcement learning techniques.",
    },
    {
      id: 2,
      text: 'Web3 is an idea for a new iteration of the World Wide Web which incorporates concepts such as decentralization, blockchain technologies, and token-based economics. Some technologists and journalists have contrasted it with Web 2.0, wherein they say data and content are centralized in a small group of companies sometimes referred to as "Big Tech". The term "Web3" was coined in 2014 by Ethereum co-founder Gavin Wood, and the idea gained interest in 2021 from cryptocurrency enthusiasts, large technology companies, and venture capital firms.',
    },
    {
      id: 3,
      text: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality",
    },
  ] as Array<PostType>,
  profile: {
    aboutMe: "",
    userId: null,
    lookingForAJob: false,
    lookingForAJobDescription: "",
    fullName: "",
    contacts: {
      github: null,
      vk: null,
      facebook: null,
      instagram: null,
      twitter: null,
      website: null,
      youtube: null,
      mainLink: null,
    },
    photos: {
      small: null,
      large: null,
    },
  } as ProfileType,
  status: "" as string,
};

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ProfileActionsType
): ProfilePageType => {
  switch (action.type) {
    case "PROFILE/ADD_POST": {
      return {
        ...state,
        posts: [...state.posts, { id: 4, text: action.title }],
      };
    }
    case "PROFILE/SET_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case "PROFILE/SET_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "PROFILE/UPDATE_PHOTO": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    default:
      return { ...state };
  }
};
export const addPostAC = (title: string) =>
  ({ type: "PROFILE/ADD_POST", title } as const);

export const setProfileAC = (profile: ProfileType) =>
  ({ type: "PROFILE/SET_PROFILE", profile } as const);

export const setStatus = (status: string) =>
  ({ type: "PROFILE/SET_STATUS", status } as const);

export const updateUserPhotoAC = (photos: { small: string; large: string }) =>
  ({ type: "PROFILE/UPDATE_PHOTO", photos } as const);

// --------------------------------------------------------------------

export const getUserProfile =
  (userId: number): AppThunk =>
  async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      let response = await profileAPI.getProfile(+userId);
      dispatch(setProfileAC(response.data));
      dispatch(setAppStatusAC("succeeded"));
    } catch (e: any) {
      const error: AxiosError<{ error: string }> = e.response
        ? e.response.data.error
        : e;
      handleServerNetworkAppError(error, dispatch);
    }
  };

export const getStatus =
  (userId: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      let response = await profileAPI.getStatus(userId);
      dispatch(setStatus(response.data));
      dispatch(setAppStatusAC("succeeded"));
    } catch (e: any) {
      const error: AxiosError<{ error: string }> = e.response
        ? e.response.data.error
        : e;
      handleServerNetworkAppError(error, dispatch);
    }
  };

export const updateStatus =
  (status: string): AppThunk =>
  async (dispatch: AppThunkDispatch) => {
    try {
      let response = await profileAPI.updateStatus(status);
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    } catch (e: any) {
      const error: AxiosError<{ error: string }> = e.response
        ? e.response.data.error
        : e;
      handleServerNetworkAppError(error, dispatch);
    }
  };

export const updateUserPhoto =
  (file: string): AppThunk =>
  async (dispatch: AppThunkDispatch) => {
    try {
      let response = await profileAPI.savePhoto(file);
      if (response.data.resultCode === 0) {
        dispatch(updateUserPhotoAC(response.data.data.photos));
        dispatch(setUserPhotoAC(response.data.data.photos.small));
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

export const updateProfileInfo =
  (profile: Omit<ProfileType, "photos">) =>
  async (dispatch: AppThunkDispatch, getState: () => AppStateType) => {
    const userId = getState().authReducer.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
    }
  };
