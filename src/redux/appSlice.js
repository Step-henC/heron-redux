import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


// this exists to purge the store/sessionStorage
export const appSlice = createSlice({
  initialState: null,
  name: 'appSlice',
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(PURGE, () => {
        sessionStorage.removeItem('persist:heron-file');
      })
  }
})

export default appSlice.reducer;