import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from "../../apis"

export const getBrands = createAsyncThunk("brand/brands", async (data, { rejectWithValue }) => {
    const response = await apis.apiGetBrand()
    if(response.err) return rejectWithValue(response)
    return response.data.getBrandCategory

})