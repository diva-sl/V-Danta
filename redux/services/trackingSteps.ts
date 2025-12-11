import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface StepLog {
  id: number;
  userId: number;
  steps: number;
  date: string; // ISO
}

export const stepsApi = createApi({
  reducerPath: "stepsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Steps"],
  endpoints: (builder) => ({
    getTodaySteps: builder.query<{ steps: number; target: number }, void>({
      query: () => ({ url: "/tracking/today", method: "GET" }),
      providesTags: ["Steps"],
    }),
    addSteps: builder.mutation<StepLog, { steps: number }>({
      query: (body) => ({ url: "/tracking/add", method: "POST", data: body }),
      invalidatesTags: ["Steps"],
    }),
    getHistory: builder.query<StepLog[], { from?: string; to?: string } | void>(
      {
        query: (params) => ({ url: "/tracking/list", method: "GET", params }),
        providesTags: ["Steps"],
      }
    ),
  }),
});

export const {
  useGetTodayStepsQuery,
  useAddStepsMutation,
  useGetHistoryQuery,
} = stepsApi;
