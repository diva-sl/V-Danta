import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface StepLog {
  id: number;
  userId: number;
  steps: number;
  date: string;
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
      query: (body) => ({
        url: "/tracking/add",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Steps"],
    }),

    getSummary: builder.query<
      any[],
      { type: "day" | "week" | "month" | "year"; date: string }
    >({
      query: ({ type, date }) => ({
        url: "/tracking/summary",
        method: "GET",
        params: { type, date },
      }),
    }),
  }),
});

export const {
  useGetTodayStepsQuery,
  useAddStepsMutation,
  useGetSummaryQuery,
} = stepsApi;
