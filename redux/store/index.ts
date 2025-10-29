import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { videosApi } from "../services/skillsApi";
import { stepsApi } from "../services/trackingSteps";
import { userApi } from "../services/userApi";
import authReducer from "../slices/authSlice";
import stepsReducer from "../slices/stepsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    steps: stepsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [stepsApi.reducerPath]: stepsApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(userApi.middleware, stepsApi.middleware, videosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
