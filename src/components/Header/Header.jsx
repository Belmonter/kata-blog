import React from 'react';
import s from './header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className={s.header}>
			<div className="header__container">
				<div className={s.header__wrapper}>
					<Link to={'/'} className={s.header__logo}>Realworld Blog</Link>
          <div className={s.header__login}>
            <Link to={'/sign-in'} className={s.signIn}>Sign In</Link>
            <div className={s.signUp}>Sign Up</div>
          </div>
				</div>
			</div>
		</div>
	);
}

export default Header;