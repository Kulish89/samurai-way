import axios, { AxiosResponse } from "axios";
import { ProfileType } from "../features/Profile/profile-reducer";
import { UserType } from "../features/Users/users-reducer";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "35e9e887-e3d6-4312-8e2a-34df7e5725be",
  },
});
export const usersAPI = {
  getUsers({ page, count, term, friend }: GetUsersPoyloadType) {
    return instance
      .get<"", AxiosResponse<UsersResponseType>, GetUsersPoyloadType>(`users`, {
        params: { page, count, term, friend },
      })
      .then((response) => response.data);
  },
  follow(id: number) {
    return instance.post<"", AxiosResponse<ResponseType<{}>>, number>(
      `follow/${id}`
    );
  },
  unfollow(id: number) {
    return instance.delete<"", AxiosResponse<ResponseType<{}>>, number>(
      `follow/${id}`
    );
  },
};
export const authAPI = {
  authMe() {
    return instance.get<
      ResponseType<{
        id: number;
        email: string;
        login: string;
      }>
    >(`auth/me`);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string = ""
  ) {
    return instance
      .post<
        "",
        AxiosResponse<
          ResponseType<{
            userId: number;
          }>
        >,
        LoginPayloadType
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete<ResponseType<{}>>(`auth/login`);
  },
};
export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<"", AxiosResponse<ProfileType>, number>(
      `profile/` + userId
    );
  },
  getStatus(userId: number) {
    return instance.get<"", AxiosResponse<string>, number>(
      "profile/status/" + userId
    );
  },
  updateStatus(status: string) {
    return instance.put<
      "",
      AxiosResponse<ResponseType<{}>>,
      { status: string }
    >(`profile/status/`, { status });
  },
  savePhoto(file: string) {
    let formData = new FormData();
    formData.append("image", file);
    return instance.put<
      "",
      AxiosResponse<ResponseType<{ photos: { large: string; small: string } }>>,
      FormData
    >(`profile/photo/`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: UpdateProfilePayloadType) {
    return instance.put<
      "",
      AxiosResponse<ResponseType<{}>>,
      Partial<ProfileType>
    >(`profile/`, profile);
  },
};
export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};

// ===============================================

type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type GetUsersPoyloadType = {
  page: string | number;
  count: number;
  term: string;
  friend: boolean;
};

type UpdateProfilePayloadType = Partial<ProfileType>;

type ResponseType<T = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: T;
};

type UsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: null | string;
};
