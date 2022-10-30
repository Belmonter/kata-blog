import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ApiService from '../../assets/js/apiService';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';
import UserForm from '../../components/UserForm/UserForm';
import { setUser } from '../../store/slices/blogSlice';

import s from './SignUp.module.scss';

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
		repeat_password: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords don`t match')
			.required('Passwords must match'),
		check: yup.boolean().oneOf([true]).required('You must agree'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const submitForm = ({ name, email, password }) => {
		const user = { user: { username: name, email, password } };
		apiService.registerUser(user).then((res) => {
			if (res.errors) {
				setFormError((state) => {
					if (res.errors.username && res.errors.email) return { email: true, username: true };
					if (res.errors.username) return { ...state, username: true };
					if (res.errors.email) return { ...state, username: true };
				});
			} else if (res.user) {
				dispatch(setUser(res.user));
				navigate('/');
			}
		});
	};

	return (
		<div className={s.formIn}>
			<div className={s.formIn__title}>Create new account</div>
			<UserForm onSubmit={handleSubmit(submitForm)}>
				<Input
					id={'name'}
					placeholder={'Username'}
					label={'Username'}
					type={'text'}
					register={register}
					classField={errors.name?.message ? `input error` : inputNameClass}
					errorMessage={errors.name?.message}
					commonError={formError.username ? 'Name already exist' : null}
				/>
				<Input
					id={'email'}
					placeholder={'Email address'}
					label={'Email address'}
					type={'text'}
					register={register}
					classField={errors.email?.message ? `input error` : inputEmailClass}
					errorMessage={errors.email?.message}
					commonError={formError.email ? 'Email already exist' : null}
				/>
				<Input
					id={'password'}
					register={register}
					type={'password'}
					placeholder={'Password'}
					label={'Password'}
					classField={errors.password?.message ? `input error` : 'input'}
					errorMessage={errors.password?.message}
				/>
				<Input
					id={'repeat_password'}
					type={'password'}
					placeholder={'Password'}
					label={'Repeat Password'}
					register={register}
					classField={errors.repeat_password?.message ? `input error` : 'input'}
					errorMessage={errors.repeat_password?.message}
				/>
				<Checkbox name={'check'} register={register} errors={errors} />
				<Button>Create</Button>
			</UserForm>
			<div className={s.formIn__signin}>
				<Link to={'/sign-in'}>
					Already have an account? <span>Sign In.</span>
				</Link>
			</div>
		</div>
	);
}

export default SignUp;
