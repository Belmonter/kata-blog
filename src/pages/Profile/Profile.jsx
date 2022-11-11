import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ApiService from '../../assets/js/apiService';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import UserForm from '../../components/UserForm/UserForm';
import { setUser } from '../../store/slices/blogSlice';
import s from '../SignIn/SignIn.module.scss';

const Profile = () => {
	const apiService = new ApiService();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user: userInfo } = useSelector((state) => state.blog);

	const schema = yup.object().shape({
		username: yup
			.string()
			.nullable()
			.transform((v, o) => (o === '' ? null : v))
			.min(3)
			.required(),
		email: yup
			.string()
			.nullable()
			.transform((v, o) => (o === '' ? null : v))
			.email()
			.required(),
		password: yup
			.string()
			.nullable()
			.transform((v, o) => (o === '' ? null : v))
			.min(6)
			.max(40)
			.required(),
		image: yup
			.string()
			.nullable()
			.transform((v, o) => (o === '' ? null : v))
			.matches(/((https?):\/\/)?(www.)?[a-z\d]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z\d#]+)*\/?(\?[a-zA-Z\d-_]+=[a-zA-Z\d-%]+&?)?$/, 'Enter correct url!'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const submitForm = ({ email, username, password, image }) => {
		const user = { user: { email, username, password, image } };
		apiService.updateUser(user, userInfo.token).then((res) => {
			if (res.user) {
				dispatch(setUser(res.user));
				navigate('/');
			}
		});
	};

	return (
		<div className={s.formIn}>
			<div className={s.formIn__title}>Edit Profile</div>
			<UserForm onSubmit={handleSubmit(submitForm)}>
				<Input
					id={'username'}
					type={'text'}
					register={register}
					label={'Username'}
					placeholder={'Enter user name'}
					errorMessage={errors.username?.message}
					classField={errors.username?.message ? `input error` : 'input'}
				/>
				<Input
					id={'email'}
					type={'text'}
					register={register}
					label={'Email address'}
					placeholder={'Enter Email'}
					errorMessage={errors.email?.message}
					classField={errors.email?.message ? `input error` : 'input'}
				/>
				<Input
					id={'password'}
					type={'password'}
					register={register}
					label={'New password'}
					placeholder={'New password'}
					errorMessage={errors.password?.message}
					classField={errors.password?.message ? `input error` : 'input'}
				/>
				<Input
					id={'image'}
					type={'text'}
					register={register}
					label={'Avatar image (url)'}
					placeholder={'Avatar image'}
					errorMessage={errors.image?.message}
					classField={errors.image?.message ? `input error` : 'input'}
				/>
				<Button>Save</Button>
			</UserForm>
		</div>
	);
};

export default Profile;
