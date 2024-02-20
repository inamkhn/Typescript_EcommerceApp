import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initial } from "../../types/reducer-api";
import { User } from "../../types/types";

const initialState: initial = {
  user: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {userExist,userNotExist,logout} = userSlice.actions;

export default userSlice.reducer;
