import { configureStore } from '@reduxjs/toolkit';
import timelineReducer from './timelineSlice';

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
  }
});