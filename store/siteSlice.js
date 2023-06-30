import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSiteData } from './lemmyAPI';

const initialState = {
  siteData: {}
};

export const getSiteData = createAsyncThunk(
  'site/fetchSite',
  async (props) => {
    const response = await fetchSiteData();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
      builder
        .addCase(getSiteData.fulfilled, (state, action) => {
          state.siteData = action.payload
        })
    },
  });

export const selectSiteData = (state) => state.site.siteData;

export default siteSlice.reducer;