import React from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';
import TagItem from '../TagItem/TagItem';

import s from './ArticleForm.module.scss';

const ArticleForm = () => {
	return (
		<form>
			<Input id={'title'} placeholder={'Title'} type={'text'} label={'Title'} classField={'input'} />
			<Input id={'description'} placeholder={'Title'} type={'text'} label={'Short description'} classField={'input'} />
			<label htmlFor="description">
				Text
				<textarea name="description" id="description"></textarea>
			</label>
			<div className={s.tag__title}>Tags</div>
			<div className={s.tag__wrapper}>
				<TagItem />
			</div>
			<Button>Send</Button>
		</form>
	);
};

export default ArticleForm;
