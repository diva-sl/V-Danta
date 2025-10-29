import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const BASE_URL = "http://localhost:4000/api"; // change if device/emulator needs LAN IP

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: any },
      { email: string; password: string }
    >({
      query: (body) => ({ url: "/auth/login", method: "POST", data: body }),
    }),
    me: builder.query<any, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = userApi;
