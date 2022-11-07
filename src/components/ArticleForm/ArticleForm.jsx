import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import ApiService from '../../assets/js/apiService';
import Button from '../Button/Button';
import Input from '../Input/Input';
import TagItem from '../TagItem/TagItem';

import s from './ArticleForm.module.scss';

const ArticleForm = ({ editState }) => {
	const [tags, setTags] = useState([
		{
			id: Date.now(),
			add: true,
		},
	]);

	useEffect(() => {
		if (editState) {
			setTags(() => {
				const newTags = [];
				editState.tagList.forEach((tag, i) => {
					newTags.push({ id: Date.now() + i, add: i === editState.tagList.length - 1, name: tag });
				});
				return [...newTags];
			});
		}
	}, []);

	const apiService = new ApiService();
	const navigate = useNavigate();
	const { slug } = useParams();
	const { user } = useSelector((state) => state.blog);

	const schema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string().required(),
		body: yup.string().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			title: editState?.title,
			description: editState?.description,
			body: editState?.body,
		},
	});

	function addTag() {
		setTags((tags) => {
			let newTags = tags.map((tag) => {
				tag.add = false;
				return tag;
			});
			return [...newTags, { id: Date.now(), add: true }];
		});
	}

	function deleteTag(id) {
		if (tags.length === 1) {
			return;
		} else {
			setTags((tags) => {
				let newTags = tags.filter((tag) => tag.id !== id);
				newTags.forEach((tag, i) => {
					i === newTags.length - 1 ? (tag.add = true) : (tag.add = false);
				});
				return [...newTags];
			});
		}
	}

	function addTagToData(e, id) {
		setTags((tags) => {
			tags.forEach((tag) => {
				if (tag.id === id) tag.name = e.target.value;
			});
			return tags;
		});
	}

	function formSubmit({ title, description, body }) {
		const article = {
			article: {
				title,
				description,
				body,
				tagList: tags.map((tag) => tag.name),
			},
		};
		if (editState) {
			apiService.updateArticle(article, user.token, slug).then(() => navigate(`/articles/${slug}`));
		} else {
			apiService.createArticle(article, user.token).then(() => navigate('/'));
		}
	}

	return (
		<form onSubmit={handleSubmit(formSubmit)}>
			<Input
				id={'title'}
				placeholder={'Title'}
				type={'text'}
				label={'Title'}
				register={register}
				errorMessage={errors.title?.message}
				classField={errors.title?.message ? `input error` : 'input'}
			/>
			<Input
				id={'description'}
				placeholder={'Description'}
				type={'text'}
				label={'Short description'}
				register={register}
				errorMessage={errors.description?.message}
				classField={errors.description?.message ? `input error` : 'input'}
			/>
			<label htmlFor="body">
				Text
				<textarea className={errors.body?.message ? 'error' : null} {...register('body')} name="body" id="body" placeholder={'Text'}></textarea>
				<p>{errors.body?.message}</p>
			</label>
			<div className={s.tag__title}>Tags</div>
			<div className={s.tag__wrapper}>
				{tags.map(({ id, add, name }) => {
					return <TagItem key={id} id={id} add={add} addTag={addTag} deleteTag={deleteTag} addTagToData={addTagToData} value={name} />;
				})}
			</div>
			<Button small={true}>Send</Button>
		</form>
	);
};

export default ArticleForm;
