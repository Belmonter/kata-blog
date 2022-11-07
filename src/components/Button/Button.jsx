import React from 'react';

import s from './Button.module.scss';

function Button({ children, small }) {
	return (
		<button type={'submit'} className={small ? `${s.button} small-btn` : s.button}>
			{children}
		</button>
	);
}

export default Button;
