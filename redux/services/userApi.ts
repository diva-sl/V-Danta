import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<
      { message: string; user?: any },
      { name: string; email: string; password: string }
    >({
      query: (body) => ({ url: "/auth/register", method: "POST", data: body }),
    }),

    login: builder.mutation<
      { token: string; user: any },
      { email: string; password: string }
    >({
      query: (body) => ({ url: "/auth/login", method: "POST", data: body }),
    }),

    profile: builder.query<any, void>({
      query: () => ({ url: "/auth/profile", method: "GET" }),
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery } =
  userApi;
