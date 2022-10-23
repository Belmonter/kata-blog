import React, { useState } from 'react';
import FormSign from '../../components/FormSign/FormSign';
import s from './SignIn.module.scss';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import ApiService from '../../assets/js/apiService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/blogSlice';

function SignIn(props) {
	const apiService = new ApiService();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [userError, setUserError] = useState(false);

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const formSubmit = ({ email, password }) => {
		const user = { user: { email: email.toLowerCase(), password } };
		apiService.loginUser(user).then(res => {
			console.log(res);
			if (res.errors) {
				setUserError(true)
			} else if (res.user) {
				dispatch(setUser(res.user))
				navigate('/')
			}
		});
	};

	return (
		<div className={s.formIn}>
			<div className={s.formIn__title}>Sign In</div>
			<FormSign onSubmit={handleSubmit(formSubmit)}>
				<label htmlFor='email'> Email address
					<input {...register('email')} className={errors.email?.message ? `input error` : 'input'} id={'email'} type='text'
								 placeholder={'Email' +
									 ' address'} />
					<p>{errors.email?.message}</p>
				</label>
				<label htmlFor='password'> Password
					<input {...register('password')} className={errors.password?.message ? `input error` : 'input'} id={'password'} type='password'
								 placeholder={'Password'} />
					<p>{errors.password?.message}</p>
				</label>
				<Button>Login</Button>
				<p>{userError ? 'Incorrect email or password' : null}</p>
			</FormSign>
			<div className={s.formIn__signin}>
				<Link to={'/sign-up'}>Don’t have an account? <span>Sign Up.</span></Link>
			</div>
		</div>
	);
}

export default SignIn;