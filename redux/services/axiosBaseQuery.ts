import AsyncStorage from "@react-native-async-storage/async-storage";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

/**
 * IMPORTANT:
 * - WEB → localhost works
 * - MOBILE → use LAN IP (192.168.x.x)
 */
const API_BASE_URL =
  typeof window !== "undefined"
    ? "http://localhost:5000/api" // web
    : "http://192.168.1.5:5000/api"; // mobile (change IP)

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
    },
    unknown,
    { status?: number; data?: any }
  > =>
  async ({ url, method, data, params }) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      console.log("API →", `${API_BASE_URL}${url}`);
      console.log("TOKEN →", token);

      const result = await axios({
        url: `${API_BASE_URL}${url}`,
        method,
        data,
        params,
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      console.error("API ERROR →", err.message);

      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data ?? { message: err.message },
        },
      };
    }
  };
