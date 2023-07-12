import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPostComments, fetchPostData } from './lemmyAPI';

const initialState = {
  postData: null,
  comments: null
};

export const getPostData = createAsyncThunk(
  'post/fetchPost',
  async (postId) => {
    const response = await fetchPostData(postId);
    return response;
  }
);

export const getPostComments = createAsyncThunk(
    'post/fetchPostComments',
    async (props) => {
        const response = await fetchPostComments(props);
        return response.comments;
    }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData:(state, action) => {
      state.postData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostData.fulfilled, (state, action) => {
        state.postData = action.payload;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const selectPostData = (state) => state.post.postData;
export const selectPostComments = (state) => state.comments;
export const { setPostData } = postSlice.actions;

export default postSlice.reducer;
