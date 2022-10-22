import React from 'react';
import s from './Button.module.scss'

function Button({ children, props }) {
	return (
		<button className={s.button}>{children}</button>
	);
}

export default Button;