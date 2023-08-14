import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
      email: '',
      password: '',
    },
  };

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        addUser: (state, action) =>{
            const {email, password} = action.payload;
            state.user.email = email
            state.user.password = password;
        },
        
    }
})

export const {addUser} = userSlice.actions
export default userSlice.reducer