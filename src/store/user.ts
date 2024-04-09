import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    session: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.session = action.payload.session;
    },
    logout: (state) => {
      state.session = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;