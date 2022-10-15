import React from 'react';
import s from './header.module.scss';

function Header(props) {
	return (
		<div className={s.header}>
			<div className="header__container">
				<div className={s.header__wrapper}>
					<a href='#' className={s.header__logo}>Realworld Blog</a>
          <div className={s.header__login}>
            <div className={s.signIn}>Sign In</div>
            <div className={s.signUp}>Sign Up</div>
          </div>
				</div>
			</div>
		</div>
	);
}

export default Header;