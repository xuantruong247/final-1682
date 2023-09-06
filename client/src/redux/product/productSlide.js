import { createSlice } from "@reduxjs/toolkit"
import { getNewProducts } from "./asyncActions"



export const productSlide = createSlice({
    name: 'product',
    initialState: {
        newProduct: null,
        errorMessage: ''
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.newProduct = action.payload
        })
        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.messages
        })
    }
})

// export const { } = productSlide.actions

export default productSlide.reducer