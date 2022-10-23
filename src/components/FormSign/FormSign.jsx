import React from 'react';
import s from './FormSign.module.scss'

function FormSign({children, onSubmit}) {
	return (
		<form onSubmit={onSubmit} className={s.formIn}>{children}</form>
	);
}

export default FormSign;