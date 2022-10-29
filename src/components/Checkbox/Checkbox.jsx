import React from 'react';

const Checkbox = ({ register, name, errors }) => {
	return (
		<label className="checkbox">
			<input {...register(name)} className={errors.check?.message ? 'checkbox__input checkError' : 'checkbox__input'} type="checkbox" value="1" />
			<span className={errors.check?.message ? 'checkbox__label checkError' : 'checkbox__label'}>
				<span className={'checkbox__text'}>I agree to the processing of my personal information</span>
			</span>
		</label>
	);
};

export default Checkbox;
