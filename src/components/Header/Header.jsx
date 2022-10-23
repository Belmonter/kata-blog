import React from 'react';
import s from './header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatar from '../../assets/img/avatar.png';

function Header() {
	const { login, user } = useSelector(state => state.blog);
	return (
		<div className={s.header}>
			<div className={'header__container'}>
				<div className={s.header__wrapper}>
					<Link to={'/'} className={s.header__logo}>Realworld Blog</Link>
					{login ?
						<div className={s.header__user}>
							<div className={s.header__create}>Create article</div>
							<div className={s.header__userInfo}>
								<div className={s.userInfo__name}>{user.username}</div>
								<div className={s.userInfo__avatar}><img src={avatar} alt='avtar' /></div>
							</div>
							<div className={s.header__logOut}>Log Out</div>
						</div>
						:
						<div className={s.header__login}>
							<Link to={'/sign-in'} className={s.signIn}>Sign In</Link>
							<Link to={'/sign-up'} className={s.signUp}>Sign Up</Link>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default Header;