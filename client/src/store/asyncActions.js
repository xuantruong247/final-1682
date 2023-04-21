import { createAsyncThunk } from "@reduxjs/toolkit"
import * as apis from "../apis"


export const getCategories = createAsyncThunk("app/categories", async (data, { rejectWidthValue }) => {
    const response = await apis.apiGetCategories()
    if (!response.success) return rejectWidthValue(response)
    return response.getProductsCategory

}) 