import React from 'react';
import s from './Article.module.scss';
import avatar from '../../assets/img/avatar.png'

function Article({ slug, title, favorited, description, tagList, favoritesCount, author, createdAt }) {
	const date = new Date(createdAt);
	const month = date.toLocaleString('en', { month: 'long' });
	const year = date.getFullYear();
	const day = date.getDate();
	return (
		<div className={s.article} data-slug={slug}>
			<div className={s.article__head}>
				<div className={s.head__info}>
					<div className={s.info__wrapper}>
						<a className={s.head__title}>{title ? title : "Oops lazy developer"}</a>
						<div className={s.head__likes}>
							<div className="_icon-heart"></div>
							<div className={s.head__counter}>{favoritesCount}</div>
						</div>
					</div>
					<div className={s.head__tags}>
						{tagList.map((tag) => {
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
							<img src={author.image ? author.image : avatar} alt="avatar" />
						</div>
					</div>
				</div>
			</div>
			<div className={s.article__content}>{description ? description : 'Oops lazy developer'}</div>
		</div>
	);
}

export default Article;
