import React from 'react';
import { useLocation } from 'react-router-dom';

import ArticleForm from '../../components/ArticleForm/ArticleForm';
import s from '../CreateArticle/CreateArticle.module.scss';

const ArticleEdit = () => {
	const { state } = useLocation();
	return (
		<div className={s.article__wrapper}>
			<div className={s.article__title}>Edit article</div>
			<ArticleForm editState={state} />
		</div>
	);
};

export default ArticleEdit;
