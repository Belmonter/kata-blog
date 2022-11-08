import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import avatar from '../../assets/img/avatar.png';
import ApiService from '../../assets/js/apiService';
import { updateArticles } from '../../store/slices/blogSlice';

import s from './Article.module.scss';

function Article({ slug, title, favorited, description, tagList, favoritesCount, author, createdAt, articlePage, body }) {
	const date = new Date(createdAt);
	const { login, user } = useSelector((state) => state.blog);
	const month = date.toLocaleString('en', { month: 'long' });
	const year = date.getFullYear();
	const day = date.getDate();
	const navigate = useNavigate();
	const apiService = new ApiService();
	const dispatch = useDispatch();

	function onEditClick() {
		navigate(`/articles/${slug}/edit`, { state: { title, description, body, tagList } });
	}

	function onDeleteClick() {
		apiService.deleteArticle(user.token, slug).then(() => navigate('/'));
	}

	function onLike() {
		if (favorited) {
			apiService.unFavotitesArticle(user.token, slug).then((res) => {
				dispatch(updateArticles(res.article));
			});
		} else {
			apiService.favotitesArticle(user.token, slug).then((res) => {
				dispatch(updateArticles(res.article));
			});
		}
	}

	return (
		<div className={articlePage ? `${s.article} mt26` : s.article}>
			<div className={s.article__head}>
				<div className={s.head__info}>
					<div className={s.info__wrapper}>
						<Link to={`/articles/${slug}`} className={s.head__title}>
							{title ? title : 'No title'}
						</Link>
						<div className={s.head__likes} onClick={onLike}>
							<div className={favorited ? '_icon-redHeart' : '_icon-heart'}></div>
							<div className={s.head__counter}>{favoritesCount}</div>
						</div>
					</div>
					<div className={s.head__tags}>
						{tagList &&
							tagList.map((tag, i) => {
								if (tag && tag.length) return <div key={tag + i} className={s.tag}>{tag}</div>;
							})}
					</div>
				</div>
				<div className={s.article__user}>
					<div className={s.user}>
						<div className={s.user__info}>
							<div className={s.user__name}>{author.username}</div>
							<div className={s.user__date}>
								{month} {day}, {year}
							</div>
						</div>
						<div className={`${s.user__avatar} -ibg`}>
							<img src={author.image ? author.image : avatar} alt="avatar" />
						</div>
					</div>
				</div>
			</div>
			<div className={s.article__desc}>
				<p>{description ? description : 'No description'}</p>
				{login && articlePage && (
					<div className={s.article__btns}>
						<div className={s.article__del} onClick={onDeleteClick}>
							Delete
						</div>
						<div className={s.article__edit} onClick={onEditClick}>
							Edit
						</div>
					</div>
				)}
			</div>
			{articlePage && (
				<div className={s.article__content}>
					<ReactMarkdown children={body} />
				</div>
			)}
		</div>
	);
}

export default Article;
