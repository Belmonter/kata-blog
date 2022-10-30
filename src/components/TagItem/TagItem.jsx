import React from 'react';

import s from './TagItem.module.scss';

const TagItem = () => {
	return (
		<div className={s.tag__item}>
			<input type="text" className={'input'} />
			<div className={s.tag__delete}>Delete</div>
			<div className={s.tag__add}>Add tag</div>
		</div>
	);
};

export default TagItem;
