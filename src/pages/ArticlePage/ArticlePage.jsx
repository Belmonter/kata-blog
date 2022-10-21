import React, { useEffect, useState } from 'react';
import Article from '../../components/Article/Article';
import s from './ArticlePage.module.scss';
import ApiService from '../../assets/js/apiService';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setArticle } from '../../store/slices/blogSlice';

function ArticlePage() {
	const apiService = new ApiService();
	const { articleSlug } = useParams();
	const dispatch = useDispatch();
	const { article } = useSelector(state => state.blog);

	useEffect(() => {
		apiService.getArticle(articleSlug).then((res) => dispatch(setArticle(res.article)))
	}, [])

	return (
		<div className={s.articlePage}>
			{Object.keys(article).length &&
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
			}
		</div>
	);
}

export default ArticlePage;
