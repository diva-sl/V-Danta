import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi } from "@reduxjs/toolkit/query/react";
import { clearToken, setToken } from "../slices/authSlice";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        data: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        await AsyncStorage.setItem("authToken", data.token);
        dispatch(setToken(data.token));
      },
    }),

    logout: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        await AsyncStorage.removeItem("authToken");
        dispatch(clearToken());
        return { data: true };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = userApi;
