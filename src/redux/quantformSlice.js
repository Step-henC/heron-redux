import { createSlice } from "@reduxjs/toolkit";

const initialState = {isFormFilled: false, fileData: [], replicateNumber: 0, outlierInput: [[]]}
const quantformSlice = createSlice({
  name: 'quantformSlice',
  initialState: initialState,
  reducers: {
    setQuantFormFilled: (state, action) => ({...state, isFormFilled: action.payload.bool}),
    setFileData: (state, action) => ({...state, fileData: action.payload}),
    setReplicateNumber: (state, action) => ({...state, replicateNumber: action.payload.number}),
    setOutlierSamples: (state, action) => ({...state, outlierInput: action.payload}),
    setQuantForm: (_, action) => action.payload,
    resetQuantForm: () => (initialState)
  }
})

export const {setQuantFormFilled, setFileData, setReplicateNumber, setOutlierSamples, setQuantForm, resetQuantForm} = quantformSlice.actions;

export default quantformSlice.reducer;