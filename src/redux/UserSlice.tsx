import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUser: false,
};


const userSlice = createSlice({
  name: "user", 
  initialState,
  reducers: {
    loginAsUser: (state) => {
      state.isUser = true;
    },
    signOutUser: (state) => {
      state.isUser = false;
    },
  },
});

export const { loginAsUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
