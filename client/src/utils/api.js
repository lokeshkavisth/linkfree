"use client";

import axios from "axios";
import { BASE_URL } from "@/constants/constants";
import { jwtDecode } from "jwt-decode";

export const refreshToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  console.log("refresh-token", refreshToken);

  try {
    const url = `${BASE_URL}/refresh`;
    const { data } = await axios.post(url, { refreshToken });

    if (data.success) {
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    console.log("accessToken", accessToken);
    const currentDate = new Date();
    const decodedToken = jwtDecode(accessToken);
    console.log("decodedTokoen", decodedToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["Authorization"] = "Bearer " + data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function LinkFreeAPI(options) {
  const baseURL = BASE_URL;

  try {
    const res = await axiosJWT({ baseURL, ...options });
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
