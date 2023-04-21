import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './appSlide';

export const store = configureStore({
  reducer: {
    appReducer: appSlice
  },
});
