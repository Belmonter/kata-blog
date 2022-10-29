import React from 'react';

const Input = ({ label, id, type, register, classField, errorMessage, placeholder, commonError }) => {
	return (
		<label htmlFor={id}>
			{label}
			<input className={classField} id={id} type={type} placeholder={placeholder} {...register(id)} />
			{commonError && <p>{commonError}</p>}
			<p>{errorMessage}</p>
		</label>
	);
};
export default Input;
