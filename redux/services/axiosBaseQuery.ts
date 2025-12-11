import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:5000/api";
// ⚠️ When testing on a physical device/emulator, replace localhost with your LAN IP
// Example: "http://192.168.1.5:5000/api"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { accept: "application/json" },
});

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
      headers?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      // ✅ Get token from AsyncStorage (React Native)
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
      }

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ message?: string }>;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };
