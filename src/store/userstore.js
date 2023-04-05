import { createSlice } from "@reduxjs/toolkit";

const initialState={data:[],pass:""}

const userslice=createSlice({
    name:"user",
    initialState,
    reducers: {
        userData(state, action){
            state.data=action.payload;
        },
        userPass(state,action){
            state.pass=action.payload;
        }
    }
})

export default userslice.reducer

export const {userData,userPass}= userslice.actions;