import React from 'react';
import s from './Article.module.scss';

function Article() {
	return (
		<div className={s.article}>
			<div className={s.article__head}>
        <div className={s.head__info}>
          <div className={s.info__wrapper}>
            <div className={s.head__title}>Some article title</div>
            <div className={s.head__likes}>
              <div className='_icon-heart'></div>
              <div className={s.head__counter}>12</div>
            </div>
          </div>
          <div className={s.head__tags}>
            <div className={s.tag}>Tag1</div>
          </div>
        </div>
        <div className={s.article__user}>
          <div className={s.user}>
            <div className={s.user__info}>
              <div className={s.user__name}>John Doe</div>
              <div className={s.user__date}>March 5, 2020</div>
            </div>
            <div className={`${s.user__avatar} -ibg`}><img src="img/institute_3.png" alt="avatar"/></div>
          </div>
        </div>
      </div>
		</div>
	);
}

export default Article;
