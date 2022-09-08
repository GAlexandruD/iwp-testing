import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  tryingToLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserGlobal: (state, action) => {
      state.value = action.payload;
    },
    setTryingToLogin: (state, action) => {
      state.tryingToLogin = action.payload;
    },
  },
});

export const { setUserGlobal, setTryingToLogin } = userSlice.actions;

export default userSlice.reducer;
