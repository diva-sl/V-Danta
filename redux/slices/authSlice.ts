import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token?: string | null;
}

const initialState: AuthState = { token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (s, a) => {
      s.token = a.payload;
    },
    clearToken: (s) => {
      s.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
