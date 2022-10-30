class ApiService {
	url = 'https://blog.kata.academy/api/';

	fetchBlog = async (method, type, options, body) => {
		if (type === 'articles') {
			try {
				return await fetch(`${this.url}${type}${options}`, { method }).then((res) => res.json());
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
}

export default ApiService;
