import React, { useState } from 'react';
import s from './SignUp.module.scss';
import FormSign from '../../components/FormSign/FormSign';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../assets/js/apiService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/blogSlice';

function SignUp() {
	const apiService = new ApiService();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formError, setFormError] = useState({
		username: false,
		email: false,
	});

	const inputNameClass = formError.username ? `input error` : 'input';
	const inputEmailClass = formError.email ? `input error` : 'input';


	const schema = yup.object().shape({
		name: yup.string().min(3).max(20).required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(40).required(),
		repeat_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords don`t match').required('Passwords must match'),
		check: yup.boolean().oneOf([true]).required('You must agree'),
	});

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const submitForm = ({ name, email, password }) => {
		const user = { user: { username: name, email, password } };
		apiService.registerUser(user).then((res) => {
			if (res.errors) {
				setFormError(state => {
					if (res.errors.username && res.errors.email) return { email: true, username: true };
					if (res.errors.username) return { ...state, username: true };
					if (res.errors.email) return { ...state, username: true };
				});
			} else if (res.user) {
				dispatch(setUser(res.user));
				navigate('/')
			}
		});
	};

	return (<div className={s.formIn}>
			<div className={s.formIn__title}>Create new account</div>
			<FormSign onSubmit={handleSubmit(submitForm)}>
				<label htmlFor='name'> Username
					<input
						className={errors.name?.message ? `input error` : inputNameClass}
						{...register('name')}
						type='text'
						id={'name'}
						placeholder={'Username'} />
					<p>{formError.username ? 'Name already exist' : null}</p>
					<p>{errors.name?.message}</p>
				</label>
				<label htmlFor='email'> Email address
					<input
						className={errors.email?.message ? `input error` : inputEmailClass}
						{...register('email')}
						type='text'
						id={'email'}
						placeholder={'Email address'} />
					<p>{formError.email ? 'Email already exist' : null}</p>
					<p>{errors.email?.message}</p>
				</label>
				<label htmlFor='password'> Password
					<input
						className={errors.password?.message ? `input error` : 'input'}
						{...register('password')}
						type='password'
						id={'password'}
						autoComplete={'on'}
						placeholder={'Password'} />
					<p>{errors.password?.message}</p>
				</label>
				<label htmlFor='repeat_password'> Repeat Password
					<input
						className={errors.repeat_password?.message ? `input error` : 'input'}
						{...register('repeat_password')}
						type='password'
						id={'repeat_password'}
						autoComplete={'on'}
						placeholder={'Password'} />
					<p>{errors.repeat_password?.message}</p>
				</label>
				<label className='checkbox'>
					<input {...register('check')} className={errors.check?.message ? 'checkbox__input checkError' : 'checkbox__input'} type='checkbox'
								 value='1' />
					<span className={errors.check?.message ? 'checkbox__label checkError' : 'checkbox__label'}>
					<span className={'checkbox__text'}>I agree to the processing of my personal information</span>
				</span>
				</label>
				<Button>Create</Button>
			</FormSign>
			<div className={s.formIn__signin}>
				<Link to={'/sign-in'}>Already have an account? <span>Sign In.</span></Link>
			</div>
		</div>
	);
}

export default SignUp;