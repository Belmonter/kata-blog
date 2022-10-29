import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../components/Button/Button';
import FormSign from '../../components/FormSign/FormSign';
import Input from '../../components/Input/Input';
import s from '../SignIn/SignIn.module.scss';

const Profile = () => {
	const schema = yup.object().shape({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(40),
		image: yup.string().url(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const submitForm = (data) => {};

	return (
		<div className={s.formIn}>
			<div className={s.formIn__title}>Edit Profile</div>
			<FormSign onSubmit={handleSubmit(submitForm)}>
				<Input
					id={'name'}
					type={'text'}
					register={register}
					label={'Username'}
					placeholder={'Enter user name'}
					errorMessage={errors.name?.message}
					classField={errors.name?.message ? `input error` : 'input'}
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
					errorMessage={errors.avatar?.message}
					classField={errors.avatar?.message ? `input error` : 'input'}
				/>
				<Button>Save</Button>
			</FormSign>
		</div>
	);
};

export default Profile;
