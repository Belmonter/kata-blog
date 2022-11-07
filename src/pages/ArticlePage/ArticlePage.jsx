import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ApiService from '../../assets/js/apiService';
import Article from '../../components/Article/Article';
import { setArticle } from '../../store/slices/blogSlice';

import s from './ArticlePage.module.scss';

function ArticlePage() {
	const apiService = new ApiService();
	const { slug } = useParams();
	const dispatch = useDispatch();
	const { article } = useSelector((state) => state.blog);

	useEffect(() => {
		apiService.getArticle(slug).then((res) => dispatch(setArticle(res.article)));
	}, []);

	return (
		<div className={s.articlePage}>
			{Object.keys(article).length && (
				<Article
					articlePage={true}
					slug={article.slug}
					title={article.title}
					description={article.description}
					tagList={article.tagList}
					favorited={article.favorited}
					favoritesCount={article.favoritesCount}
					author={article.author}
					createdAt={article.createdAt}
					body={article.body}
				/>
			)}
		</div>
	);
}

export default ArticlePage;
