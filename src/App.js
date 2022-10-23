import Header from './components/Header/Header';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import { Routes, Route } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import SignUp from './pages/SignUp/SignUp';
import { useSelector } from 'react-redux';
import SignIn from './pages/SignIn/SignIn';

function App() {
	return (
		<div className={'App'}>
			<Header />
			<Routes>
				<Route path='/' element={<ArticlesPage />} />
				<Route path='/articles' element={<ArticlesPage />} />
				<Route path='/articles/:articleSlug' element={<ArticlePage />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
			</Routes>
		</div>
	);
}

export default App;
