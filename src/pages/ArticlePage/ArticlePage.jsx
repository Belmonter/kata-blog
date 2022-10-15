import React from 'react';
import s from './ArticlePage.module.scss'
import Article from "../../components/Article/Article";

function ArticlePage(props) {
  return (
    <div className={s.articlePage}>
      <div className='articlePage__container'>
        <Article/>
      </div>
    </div>
  );
}

export default ArticlePage;