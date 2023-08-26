import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchComment, upvoteComment, downvoteComment, commentOnComment, saveComment } from './lemmyAPI';

const initialState = {
    comment: null,
};


// Async Thunks for API calls
export const getComment = createAsyncThunk('comment/fetchComment', async (commentId) => {
  const response = await fetchComment(commentId);
  return response.comment_view;
});

export const upvote = createAsyncThunk('comment/upvoteComment', async (commentId) => {
  const response = await upvoteComment(commentId);
  return response.data;
});

export const downvote = createAsyncThunk('comment/downvoteComment', async (commentId) => {
  const response = await downvoteComment(commentId);
  return response.data;
});

export const zerovote = createAsyncThunk('comment/zerovoteComment', async (commentId) => {
    const response = await zerovoteComment(commentId);
    return response.data;
});

export const createComment = createAsyncThunk('comment/commentOnComment', async (commentData) => {
  const response = await commentOnComment(commentData);
  return response.data;
});

export const save = createAsyncThunk('comment/saveComment', async (commentId) => {
  const response = await saveComment(commentId);
  return response.data;
});
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentValue: (state, action) => {
      state.comment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComment.fulfilled, (state, action) => {
        //state.comment = action.payload;
      })
      .addCase(upvote.fulfilled, (state, action) => {
        //state.comment = action.payload;
      })
      .addCase(downvote.fulfilled, (state, action) => {
        //state.comment = action.payload;
      })
      .addCase(zerovote.fulfilled, (state, action) => {
        //state.comment = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        //state.comment = action.payload;
      })
      .addCase(save.fulfilled, (state, action) => {
        //state.comment = action.payload;
      });
  },
});

export const { setCommentValue } = commentSlice.actions;
export default commentSlice.reducer;
