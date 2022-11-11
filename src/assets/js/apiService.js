class ApiService {
	url = 'https://blog.kata.academy/api/';

	fetchBlog = async (method, type, options, body, slug) => {
		if (type === 'articles' && method === 'GET') {
			try {
				return await fetch(`${this.url}${type}${options}`, { method }).then((res) => res.json());
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'articles' && method === 'POST') {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${options}`,
				};
				return await fetch(`${this.url}${type}`, { method, headers, body }).then((res) => res.json());
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'articles' && method === 'PUT') {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${options}`,
				};
				return await fetch(`${this.url}${type}/${slug}`, { method, headers, body }).then((res) => res.json());
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'articles' && method === 'DELETE') {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${options}`,
				};
				return await fetch(`${this.url}${type}/${slug}`, { method, headers });
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'users' || type === 'users/login') {
			try {
				const headers = { 'Content-Type': 'application/json' };
				return await fetch(`${this.url}${type}`, { method, headers, body }).then((res) => res.json());
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'user') {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${options}`,
				};
				return await fetch(`${this.url}${type}`, { method, headers, body }).then((res) => {
					return res.json();
				});
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'like') {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${options}`,
				};
				return await fetch(`${this.url}articles/${slug}/favorite`, { method, headers }).then((res) => res.json());
			} catch (error) {
				throw new Error(error);
			}
		}
		if (type === 'unLike') {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${options}`,
				};
				return await fetch(`${this.url}articles/${slug}/favorite`, { method, headers }).then((res) => res.json());
			} catch (error) {
				throw new Error(error);
			}
		}
	};

	getArticles(limit, offset) {
		const options = `?limit=${limit}&offset=${offset}`;
		return this.fetchBlog('GET', 'articles', options);
	}

	getArticle(slug) {
		const options = `/${slug}`;
		return this.fetchBlog('GET', 'articles', options);
	}

	registerUser(user) {
		return this.fetchBlog('POST', 'users', '', JSON.stringify(user));
	}

	loginUser(user) {
		return this.fetchBlog('POST', 'users/login', '', JSON.stringify(user));
	}

	updateUser(user, token) {
		return this.fetchBlog('PUT', 'user', token, JSON.stringify(user));
	}

	createArticle(article, token) {
		return this.fetchBlog('POST', 'articles', token, JSON.stringify(article));
	}

	updateArticle(article, token, slug) {
		return this.fetchBlog('PUT', 'articles', token, JSON.stringify(article), slug);
	}

	deleteArticle(token, slug) {
		return this.fetchBlog('DELETE', 'articles', token, '', slug);
	}

	favoritesArticle(token, slug) {
		return this.fetchBlog('POST', 'like', token, '', slug);
	}

	unFavoritesArticle(token, slug) {
		return this.fetchBlog('DELETE', 'unLike', token, '', slug);
	}
}

export default ApiService;
