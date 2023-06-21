import { configureStore } from '@reduxjs/toolkit';
import timelineReducer from './timelineSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    app: appReducer,
  }
});