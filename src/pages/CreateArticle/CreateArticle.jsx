import React from 'react';

import ArticleForm from '../../components/ArticleForm/ArticleForm';

import s from './CreateArticle.module.scss';

const CreateArticle = () => {
	return (
		<div className={s.article__wrapper}>
			<div className={s.article__title}>Create new article</div>
			<ArticleForm />
		</div>
	);
};

export default CreateArticle;
