import { Dispatch } from "redux";
import { profileAPI } from "../api/api";

// import { ProfileType } from "./profile-reducer";
export type AddPostActionType = ReturnType<typeof addPostAC>;
type SetProfileActionType = ReturnType<typeof setProfileAC>;
type ActionType = AddPostActionType | SetProfileActionType;
export type ProfilePageType = typeof initialState;
export type PostType = {
  text: string;
  id: number;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    small: string | null;
    large: string | null;
  };
};

// =========================================================================

let initialState = {
  posts: [
    { id: 1, text: "Hello!" },
    { id: 2, text: "How are you" },
    { id: 3, text: "This is my first post" },
  ] as Array<PostType>,
  profile: {} as ProfileType,
};
export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case "ADD_POST": {
      return {
        ...state,
        posts: [...state.posts, { id: 4, text: action.title }],
      };
    }
    case "ADD_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }

    default:
      return { ...state };
  }
};
export const addPostAC = (title: string) => {
  return { type: "ADD_POST", title } as const;
};
export const setProfileAC = (profile: any) => {
  return { type: "ADD_PROFILE", profile } as const;
};

// --------------------------------------------------------------------

export const getUserProfile = (userId: string) => {
  return async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setProfileAC(response.data));
  };
};
// export const getStatus = (userId) => async (dispatch) => {
//   let response = await profileAPI.getStatus(userId);
//   dispatch(setStatus(response.data));
// };
// export const updateStatus = (status) => async (dispatch) => {
//   try {
//     let response = await profileAPI.updateStatus(status);
//     if (response.data.resultCode === 0) {
//       dispatch(setStatus(status));
//     }
//   } catch (error) {
//     alert("Some error occured");
//   }
// };
// export const savePhoto = (file) => async (dispatch) => {
//   let response = await profileAPI.savePhoto(file);
//   if (response.data.resultCode === 0) {
//     dispatch(savePhotoSucces(response.data.data.photos));
//   }
// };
// export const saveProfile = (profile) => async (dispatch, getState) => {
//   const userId = getState().auth.userId;
//   let response = await profileAPI.saveProfile(profile);
//   if (response.data.resultCode === 0) {
//     if (userId != null) {
//       dispatch(getUserProfile(userId));
//     } else {
//       throw new Error("userId can't be null");
//     }
//   } else {
//     dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
//     return Promise.reject(response.data.messages[0]);
//   }
// };
