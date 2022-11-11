import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import arrow from '../../assets/img/icons/arrow_del.svg';
import exclamation from '../../assets/img/icons/exclamation.svg';
import ApiService from '../../assets/js/apiService';

import s from './DeletePopup.module.scss';

const DeletePopup = ({ slug, onNoClick }) => {
	const apiService = new ApiService();
	const { user } = useSelector((state) => state.blog);
	const navigate = useNavigate();

	function onYesClick(e) {
		e.stopPropagation();
		apiService.deleteArticle(user.token, slug).then(() => navigate('/'));
	}

	return (
		<div className={s.popup}>
			<div className={s.popup__head}>
				<div className={s.popup__icon}>
					<img src={exclamation} alt="exclamation" />
				</div>
				<div className={s.popup__text}>Are you sure to delete this article?</div>
			</div>
			<div className={s.popup__btns}>
				<div className={s.popup__no} onClick={onNoClick}>
					No
				</div>
				<div className={s.popup__yes} onClick={onYesClick}>
					Yes
				</div>
			</div>
			<div className={s.popup__arrow}>
				<img src={arrow} alt="arrow" />
			</div>
		</div>
	);
};

export default DeletePopup;
