import { createSlice } from "@reduxjs/toolkit";


const initialState = {isFormFilled: false}
const contactFormSlice = createSlice({
  name: 'contactFormSlice',
  initialState,
  reducers: {
    setFormIsFilled: (_, action) => action.payload.bool,
    resetContactForm: () => initialState
  }
})

export const { setFormIsFilled, resetContactForm} = contactFormSlice.actions;

export default contactFormSlice.reducer;