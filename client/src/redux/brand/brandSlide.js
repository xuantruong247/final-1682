import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncAction'

export const brandSlide = createSlice({
    name: "brand",
    initialState: {
        brands: null,
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getBrands.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(actions.getBrands.fulfilled, (state, action) => {
            state.isLoading = false
            state.brands = action.payload
        })
        builder.addCase(actions.getBrands.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.messages
        })
    }

})
// export const { } = brandSlide.actions

export default brandSlide.reducer