import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  isUser: false,
  profilePhoto: "",
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
      state.profilePhoto = ""; 
    },
    setProfilePhoto: (state, action: PayloadAction<string>) => {
      state.profilePhoto = action.payload;
    },
  },
});

export const { loginAsUser, signOutUser, setProfilePhoto } = userSlice.actions;

export default userSlice.reducer;
