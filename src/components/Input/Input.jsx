import React from 'react';

const Input = ({ label, id, type, register, classField, errorMessage, placeholder, commonError, value }) => {
	return (
		<label htmlFor={id}>
			{label}
			<input
				className={classField}
				id={id}
				type={type}
				value={value ? value : null}
				placeholder={placeholder}
				{...(register ? { ...register(id) } : null)}
			/>
			{commonError && <p>{commonError}</p>}
			<p>{errorMessage}</p>
		</label>
	);
};
export default Input;
