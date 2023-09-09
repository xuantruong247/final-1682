import { createSlice } from "@reduxjs/toolkit"
import * as actions from "./asyncAction"



export const userSlide = createSlice({
    name: 'user',
    initialState: {
        isLogindIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: "",
        currentCart: []

    },
    reducers: {
        login: (state, action) => {
            state.isLogindIn = action.payload.isLogindIn
            state.token = action.payload.token
        },
        logout: (state) => {
            state.isLogindIn = false
            state.current = null
            state.token = null
            state.isLoading = false
        },
        clearMessage: (state) => {
            state.mes = ""
        },
        updateCart: (state, action) => {
            const { pid, quantity } = action.payload
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
            const updatedCart = updatingCart.map(el => {
                if (el.product._id === pid) {
                    return { ...el, quantity }
                } else {
                    return el
                }
            })
            state.currentCart = updatedCart

        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false
            state.current = action.payload
            state.isLogindIn = true
            state.currentCart = action.payload.cart

        })
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false
            state.current = null
            state.isLogindIn = false
            state.token = null
        })
    }
})

export const { login, logout, clearMessage, updateCart } = userSlide.actions

export default userSlide.reducer