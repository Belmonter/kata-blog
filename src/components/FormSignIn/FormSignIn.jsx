import React from 'react';
import s from './FormSignIn.module.scss'

function FormSignIn({children, props}) {
	return (
		<form className={s.formIn} noValidate {...props}>{children}</form>
	);
}

export default FormSignIn;