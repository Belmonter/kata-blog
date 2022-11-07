import React, { useState } from 'react';

import s from './TagItem.module.scss';

const TagItem = ({ addTag, deleteTag, id, add, addTagToData, value }) => {
	const [inpValue, setInpValue] = useState(value ? value : '');

	function inputHandler(e) {
		setInpValue(e.target.value);
	}

	return (
		<div className={s.tag__item}>
			<input type="text" className={`input ${s.tag__input}`} value={inpValue} onChange={inputHandler} onInput={(e) => addTagToData(e, id)} />
			<div className={s.tag__delete} onClick={() => deleteTag(id)}>
				Delete
			</div>
			{add && (
				<div className={s.tag__add} onClick={addTag}>
					Add tag
				</div>
			)}
		</div>
	);
};

export default TagItem;
