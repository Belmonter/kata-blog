import React from 'react';

function CheckBox(props) {
	return (
		<label className='checkbox'>
			<input data-error='Ошибка' className='checkbox__input' type='checkbox' value='1' name='form[]' />
			<span className='checkbox__label'>
					<span className={'checkbox__text'}>I agree to the processing of my personal information</span>
			</span>
		</label>
	);
}

export default CheckBox;