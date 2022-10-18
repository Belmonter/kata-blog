import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './slices/blogSlice';

export default configureStore({
  reducer: {
    blog: blogReducer,
  },
});
