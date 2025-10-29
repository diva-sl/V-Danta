import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../services/axiosBaseQuery";

const BASE_URL = "http://localhost:4000/api";

export interface StepLog {
  id: number;
  userId: number;
  steps: number;
  date: string; // ISO
}

export const stepsApi = createApi({
  reducerPath: "stepsApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Steps"],
  endpoints: (builder) => ({
    getTodaySteps: builder.query<{ steps: number; target: number }, void>({
      query: () => ({ url: "/steps/today", method: "GET" }),
      providesTags: ["Steps"],
    }),
    addSteps: builder.mutation<StepLog, { steps: number }>({
      query: (body) => ({ url: "/steps", method: "POST", data: body }),
      invalidatesTags: ["Steps"],
    }),
    getHistory: builder.query<StepLog[], { from?: string; to?: string } | void>(
      {
        query: (params) => ({ url: "/steps", method: "GET", params }),
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
