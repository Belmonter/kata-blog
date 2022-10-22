import React, { forwardRef } from 'react';
import s from './Input.module.scss';

const Input = forwardRef(({options, label}, ref) => {
	return (
		<label htmlFor={options.id}> {label}
			<input className={s.input} {...options} />
		</label>
	);
});

export default Input;