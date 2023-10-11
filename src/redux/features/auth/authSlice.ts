import { createSlice } from "@reduxjs/toolkit";

// set the initial path from the browser window object
const initialState = {
  pathName: "/",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPathName: (state, action) => {
      state.pathName = action.payload;
    },
  },
});

export const { setPathName } = authSlice.actions;
export default authSlice.reducer;
