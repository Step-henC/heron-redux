import { createSlice } from "@reduxjs/toolkit";


const initialState = {isFormFilled: false, fileData: []}

const glycoFormSlice = createSlice({
  initialState: initialState,
  name: "glycoFormSlice",
  reducers: {
    resetGlycoForm: () => initialState,
    setIsFormFilled: (state, action) => ({...state, isFormFilled: action.payload.bool}),
    setFileData: (state, action) => ({...state, fileData: action.payload})
  }
})

export const {setFileData, resetGlycoForm, setIsFormFilled} = glycoFormSlice.actions;

export default glycoFormSlice.reducer;