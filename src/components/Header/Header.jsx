import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import avatar from '../../assets/img/avatar.jpg';
import { logOut, setUser } from '../../store/slices/blogSlice';

import s from './header.module.scss';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { login, user } = useSelector((state) => state.blog);

	useEffect(() => {
		const localUser = localStorage.getItem('loginUser');

		if (localUser) {
			const user = JSON.parse(localUser);
			dispatch(setUser(user));
		}
	}, []);

	function profileClickHandler() {
		navigate('/profile');
	}

	function logOutHandler() {
		dispatch(logOut(false));
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
							<Link to={'/new-article'} className={s.header__create}>
								Create article
							</Link>
							<div className={s.header__userInfo} onClick={profileClickHandler}>
								<div className={s.userInfo__name}>{user.username}</div>
								<div className={s.userInfo__avatar}>
									<img src={user.image ? user.image : avatar} alt="avatar" />
								</div>
							</div>
							<div className={s.header__logOut} onClick={logOutHandler}>
								Log Out
							</div>
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
