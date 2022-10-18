class ApiService {
  url = "https://blog.kata.academy/api/"

  fetchBlog = async (method, type, options) => {
    if (type === 'articles') {
      const {limit, offset} = options;
      const result = await fetch(`${this.url}/${type}?limit=${limit}&offset=${offset}`, {method: method})
        .then(res => res.json())
      return result
    }
  }

  getArticles(limit, offset) {
    const options = {limit, offset}
    return this.fetchBlog("GET", "articles", options)
  }
}

export default ApiService;