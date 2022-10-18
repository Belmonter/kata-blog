import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	totalArticles: 150,
	loading: true,
  currentPage: 1,
};

const blog = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		setArticles(state, action) {
			state.articles = action.payload.articles;
		},
		setTotalArticles(state, action) {
			state.totalArticles = action.payload;
		},
		setLoader(state, action) {
			state.loading = action.payload;
		},
    setPage(state, action) {
      state.currentPage = action.payload;
    }
	},
});

export const { setArticles, setTotalArticles, setLoader, setPage } = blog.actions;
export default blog.reducer;
