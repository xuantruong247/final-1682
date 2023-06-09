import { createSlice } from "@reduxjs/toolkit"
import * as actions from "./asyncActions"



export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false
        }
    },
    // Code logic xử lý async action
    extraReducers: (builder) => {
        // bắt đầu thực hiện action login (Promise pending)
        // builder.addCase(login.pending, (state) => {
        //     state.isLoading = true
        // })

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false
            state.categories = action.payload
        })

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.messages
        })
    }
})

export const { } = appSlice.actions

export default appSlice.reducer