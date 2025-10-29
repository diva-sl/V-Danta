import { createSlice } from "@reduxjs/toolkit";

const stepsSlice = createSlice({
  name: "steps",
  initialState: { manualAddPending: false },
  reducers: {
    setManualAddPending: (s, a) => {
      s.manualAddPending = a.payload;
    },
  },
});

export const { setManualAddPending } = stepsSlice.actions;
export default stepsSlice.reducer;
