import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "35e9e887-e3d6-4312-8e2a-34df7e5725be",
  },
});
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id: number) {
    return instance.post(`follow/${id}`);
  },
  unfollow(id: number) {
    return instance.delete(`follow/${id}`);
  },
};
export const headerAPI = {
  authMe() {
    return instance.get(`auth/me`);
  },
  login(
    email: null | string,
    password: null | string,
    rememberMe = false,
    captcha = null
  ) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
export const profileAPI = {
  getProfile(userId: string) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/` + userId);
  },
  // updateStatus(status) {
  //   return instance.put(`profile/status/`, { status: status });
  // },
  // savePhoto(file) {
  //   // высылаем файл фотку, там особая форма запроса
  //   let formData = new FormData();
  //   formData.append("image", file);
  //   return instance.put(`profile/photo/`, formData, {
  //     headers: {
  //       "Content-type": "multipart/form-data",
  //     },
  //   });
  // },
  // saveProfile(profile) {
  //   return instance.put(`profile/`, profile);
  // },
};
export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
