import React from 'react';
import s from './SignIn.module.scss';
import Input from '../../components/Input/Input';
import FormSignIn from '../../components/FormSignIn/FormSignIn';
import { useForm } from 'react-hook-form';
import CheckBox from '../../components/CheckBox/CheckBox';
import Button from '../../components/Button/Button';

function SignIn() {
	const { register, handleSubmit, erros } = useForm({
		mode: 'onBlur',
	});

	return (
		<div className={s.formIn}>
			<div className={s.formIn__title}>Create new account</div>
			<FormSignIn>
				<Input ref={register} options={{ type: 'text', id: 'name', name: 'name', placeholder: 'Username' }} label={'Username'} />
				<Input ref={register} options={{ type: 'text', id: 'email', name: 'email', placeholder: 'Email address' }} label={'Email address'} />
				<Input ref={register} options={{ type: 'text', id: 'repeat_password', name: 'repeat_password', placeholder: 'Password' }} label={'Repeat' +
					' Password'} />
				<Input ref={register} options={{ type: 'text', id: 'password', name: 'password', placeholder: 'Password' }} label={'Password'} />
				<CheckBox />
				<Button>Create</Button>
			</FormSignIn>
		</div>
	);
}

export default SignIn;