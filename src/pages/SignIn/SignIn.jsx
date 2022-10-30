import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ApiService from '../../assets/js/apiService';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import UserForm from '../../components/UserForm/UserForm';
import { setUser } from '../../store/slices/blogSlice';

import s from './SignIn.module.scss';

function SignIn() {
	const apiService = new ApiService();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [userError, setUserError] = useState(false);

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const formSubmit = ({ email, password }) => {
		const user = { user: { email: email.toLowerCase(), password } };
		apiService.loginUser(user).then((res) => {
			if (res.errors) {
				setUserError(true);
			} else if (res.user) {
				dispatch(setUser(res.user));
				navigate('/');
			}
		});
	};

	return (
		<div className={s.formIn}>
			<div className={s.formIn__title}>Sign In</div>
			<UserForm onSubmit={handleSubmit(formSubmit)}>
				<Input
					label={'Email address'}
					id={'email'}
					type={'text'}
					placeholder={'Email address'}
					register={register}
					errorMessage={errors.email?.message}
					classField={errors.email?.message ? `input error` : 'input'}
				/>
				<Input
					label={'Password'}
					id={'password'}
					type="password"
					placeholder={'Password'}
					register={register}
					errorMessage={errors.password?.message}
					classField={errors.password?.message ? `input error` : 'input'}
				/>
				<Button>Login</Button>
				<p>{userError ? 'Incorrect email or password' : null}</p>
			</UserForm>
			<div className={s.formIn__signin}>
				<Link to={'/sign-up'}>
					Don’t have an account? <span>Sign Up.</span>
				</Link>
			</div>
		</div>
	);
}

export default SignIn;
