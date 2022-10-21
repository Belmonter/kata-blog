class ApiService {
	url = 'https://blog.kata.academy/api/';

	fetchBlog = async (method, type, options) => {
		if (type === 'articles') {
			const result = await fetch(`${this.url}${type}${options}`, { method: method })
				.then(res => res.json());
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
}

export default ApiService;