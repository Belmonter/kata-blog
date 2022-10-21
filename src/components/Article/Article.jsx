import React from 'react';
import s from './Article.module.scss';
import avatar from '../../assets/img/avatar.png';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Article({ slug, title, favorited, description, tagList, favoritesCount, author, createdAt, articlePage, body }) {
	const date = new Date(createdAt);
	const month = date.toLocaleString('en', { month: 'long' });
	const year = date.getFullYear();
	const day = date.getDate();

	return (
		<div className={articlePage ? `${s.article} mt26` : s.article}>
			<div className={s.article__head}>
				<div className={s.head__info}>
					<div className={s.info__wrapper}>
						<Link to={`/articles/${slug}`} className={s.head__title}>{title ? title : 'No title'}</Link>
						<div className={s.head__likes}>
							<div className='_icon-heart'></div>
							<div className={s.head__counter}>{favoritesCount}</div>
						</div>
					</div>
					<div className={s.head__tags}>
						{tagList && tagList.map((tag) => {
							if (tag && tag.length) return (<div className={s.tag}>{tag}</div>);
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
							<img src={author.image ? author.image : avatar} alt='avatar' />
						</div>
					</div>
				</div>
			</div>
			<div className={s.article__desc}>{description ? description : 'No description'}</div>
			{articlePage &&
				<div className={s.article__content}>
					<ReactMarkdown children={body}/>
				</div>
			}
		</div>
	);
}

export default Article;
