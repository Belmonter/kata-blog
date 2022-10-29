import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import avatar from '../../assets/img/avatar.png';

import s from './header.module.scss';

function Header() {
	const navigate = useNavigate();
	const { login, user } = useSelector((state) => state.blog);

	function profileClickHandler() {
		navigate('/profile');
	}

	return (
		<div className={s.header}>
			<div className={'header__container'}>
				<div className={s.header__wrapper}>
					<Link to={'/'} className={s.header__logo}>
						Realworld Blog
					</Link>
					{login ? (
						<div className={s.header__user}>
							<div className={s.header__create}>Create article</div>
							<div className={s.header__userInfo} onClick={profileClickHandler}>
								<div className={s.userInfo__name}>{user.username}</div>
								<div className={s.userInfo__avatar}>
									<img src={avatar} alt="avatar" />
								</div>
							</div>
							<div className={s.header__logOut}>Log Out</div>
						</div>
					) : (
						<div className={s.header__login}>
							<Link to={'/sign-in'} className={s.signIn}>
								Sign In
							</Link>
							<Link to={'/sign-up'} className={s.signUp}>
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
