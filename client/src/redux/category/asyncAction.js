import { createAsyncThunk } from "@reduxjs/toolkit"
import * as apis from "../../apis"



export const getCategories = createAsyncThunk('category/categories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategories()
    if (response.err) return rejectWithValue(response)
    return response.data.getProductsCategory
})