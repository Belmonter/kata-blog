class ApiService {
	url = 'https://blog.kata.academy/api/';

	fetchBlog = async (method, type, options, body) => {
		if (type === 'articles') {
			const result = await fetch(`${this.url}${type}${options}`, { method: method }).then((res) => res.json());
			return result;
		}
		if (type === 'users' || type === 'users/login') {
			const headers = { 'Content-Type': 'application/json' };
			const result = await fetch(`${this.url}${type}`, { method: method, headers, body }).then((res) => res.json());
			return result;
		}
		if (type === 'user') {
			const headers = { 'Content-Type': 'application/json' };
			const result = await fetch(`${this.url}${type}`, { method: method, headers, body }).then((res) => res.json());
			return result;
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

	updateUser(user) {
		return this.fetchBlog('PUT', 'user', '', JSON.stringify(user));
	}
}

export default ApiService;
