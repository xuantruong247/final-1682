import { configureStore } from '@reduxjs/toolkit';
import categorySlide from './category/categorySlide';
import productSlide from "./product/productSlide"
import brandSlide from './brand/brandSlide'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import userSlice from './user/userSlice';

const commonConfig = ({
    key: "shop/user",
    storage
})


const userConfig = {
    ...commonConfig,
    whilelist: ['isLogindIn', 'token', 'current']
}

export const store = configureStore({
    reducer: {
        category: categorySlide,
        products: productSlide,
        brand: brandSlide,
        user: persistReducer(userConfig, userSlice),
    },
});


export const persistor = persistStore(store)