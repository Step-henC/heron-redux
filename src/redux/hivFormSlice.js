import { createSlice } from "@reduxjs/toolkit";


const initialState = {isFormFilled: false, fileData: []}

const hivFormSlice = createSlice({
  initialState: initialState,
  name: "hivFormSlice",
  reducers: {
    resetHivForm: () => initialState,
    setIsFormFilled: (state, action) => ({...state, isFormFilled: action.payload.bool}),
    setFileData: (state, action) => ({...state, fileData: action.payload})
  }
})

export const {setFileData, resetHivForm, setIsFormFilled} = hivFormSlice.actions;

export default hivFormSlice.reducer;