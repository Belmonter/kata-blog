import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import spinner from '../../assets/img/gif/spinner.gif';
import ApiService from '../../assets/js/apiService';
import Article from '../../components/Article/Article';
import PaginationArticles from '../../components/Pagination/PaginationArticles';
import { setArticles, setLoader, setTotalArticles } from '../../store/slices/blogSlice';

import s from './ArticlesPage.module.scss';

function ArticlesPage() {
	const dispatch = useDispatch();
	const { articles, loading } = useSelector((state) => state.blog);

	const apiService = new ApiService();

	useEffect(() => {
		apiService.getArticles(5, 0).then((res) => {
			dispatch(setArticles(res));
			dispatch(setTotalArticles(res.articlesCount));
			dispatch(setLoader(false));
		});
	}, []);

	return (
		<div className={s.articlePage}>
			{loading ? (
				<div className="loader -ibg_contain">
					<img src={spinner} alt="spinner" />
				</div>
			) : (
				<div className="articlePage__container">
					<div className={s.articlePage__wrapper}>
						{articles.map(({ slug, title, description, tagList, favorited, favoritesCount, author, createdAt }, i) => {
							return (
								<Article
									key={i + slug}
									slug={slug}
									title={title}
									description={description}
									tagList={tagList}
									favorited={favorited}
									favoritesCount={favoritesCount}
									author={author}
									createdAt={createdAt}
								/>
							);
						})}
						<PaginationArticles />
					</div>
				</div>
			)}
		</div>
	);
}

export default ArticlesPage;
