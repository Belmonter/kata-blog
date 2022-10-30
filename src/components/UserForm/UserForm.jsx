import React from 'react';

import s from './UserForm.module.scss';

function UserForm({ children, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className={s.formIn}>
			{children}
		</form>
	);
}

export default UserForm;
