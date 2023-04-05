import { configureStore } from "@reduxjs/toolkit";
import userslice from "./userstore.js"

const store = configureStore({
    reducer: {
        user: userslice
    }
})

export default store