import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	totalArticles: 150,
	loading: true,
	currentPage: 1,
	article: {},
	user: {},
	login: false,
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
		},
		setArticle(state, action) {
			state.article = action.payload;
		},
		setUser(state, action) {
			state.user = action.payload;
			state.login = true;
		},
		logOut(state) {
			state.login = false;
		},
		updateArticles(state, action) {
			if (action.payload) {
				const { slug, favoritesCount, favorited } = action.payload;
				state.articles.forEach((article) => {
					if (article.slug === slug) {
						article.favoritesCount = favoritesCount;
						article.favorited = favorited;
					}
				});
			}
		},
	},
});

export const { setArticles, setTotalArticles, setLoader, setPage, setArticle, setUser, logOut, updateArticles } = blog.actions;
export default blog.reducer;
