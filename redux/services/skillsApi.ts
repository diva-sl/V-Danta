import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../services/axiosBaseQuery";

const BASE_URL = "http://localhost:4000/api";

export interface SkillVideo {
  id: number;
  title: string;
  url: string;
  week: number;
  durationSec?: number;
}

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWeeklyVideos: builder.query<
      { week: number; videos: SkillVideo[] },
      { week?: number } | void
    >({
      query: (params) => ({ url: "/videos/weekly", method: "GET", params }),
    }),
  }),
});

export const { useGetWeeklyVideosQuery } = videosApi;
