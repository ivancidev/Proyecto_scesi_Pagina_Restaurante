import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
    
  };

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        addUser: (state, action) =>{
            const {email, password} = action.payload;
            state.email = email
            state.password = password;
        },
        
    }
})

export const {addUser} = userSlice.actions
export default userSlice.reducer