import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface SkillVideo {
  id: number;
  title: string;
  url: string;
  week: number;
  durationSec?: number;
}

export const skillsApi = createApi({
  reducerPath: "skillsApi",
  baseQuery: axiosBaseQuery(), // ✅ baseURL already set in axiosBaseQuery
  tagTypes: ["Skills"],
  endpoints: (builder) => ({
    listSkills: builder.query<SkillVideo[], void>({
      query: () => ({ url: "/skills", method: "GET" }),
      providesTags: ["Skills"],
    }),
    addSkill: builder.mutation<SkillVideo, Partial<SkillVideo>>({
      query: (body) => ({ url: "/skills", method: "POST", data: body }),
      invalidatesTags: ["Skills"],
    }),
    completeSkill: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/skills/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useListSkillsQuery,
  useAddSkillMutation,
  useCompleteSkillMutation,
} = skillsApi;
