import { createSlice } from "@reduxjs/toolkit"
import * as actions from "./asyncAction"



export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: null,
        isLoading: false,
        isShowModal: false,
        modalChildren: null,
    },
    reducers: {
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal
            state.modalChildren = action.payload.modalChildren
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.messages
        })
    }
})

export const { showModal } = categorySlice.actions

export default categorySlice.reducer