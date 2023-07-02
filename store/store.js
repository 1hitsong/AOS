import { configureStore } from '@reduxjs/toolkit';
import timelineReducer from './timelineSlice';
import appReducer from './appSlice';
import siteReducer from './siteSlice';
import postSliceReducer from './postSlice';

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    app: appReducer,
    site: siteReducer,
    post: postSliceReducer
  }
});