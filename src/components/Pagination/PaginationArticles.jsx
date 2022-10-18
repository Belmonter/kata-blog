import React, { useState } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.min.css';
import './Pagination.scss';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from '../../assets/js/apiService';
import {setArticles, setLoader, setPage} from '../../store/slices/blogSlice';

function PaginationArticles() {
	const apiService = new ApiService();
	const dispatch = useDispatch();
	const { totalArticles, currentPage } = useSelector((state) => state.blog);

	function onPageChange(page) {
		dispatch(setLoader(true));
    dispatch(setPage(page))
		apiService.getArticles(5, page * 5 - 5).then((res) => {
			dispatch(setArticles(res));
			dispatch(setLoader(false));
		});
	}

	return (
		<div className="paginationArticles__wrapper">
			<Pagination size="small" current={currentPage} pageSize={5} total={totalArticles} showSizeChanger={false} responsive={true} onChange={onPageChange} />
		</div>
	);
}

export default PaginationArticles;
