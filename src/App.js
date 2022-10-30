import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function App() {
	return (
		<div className={'App'}>
			<Header />
			<Routes>
				<Route path="/" element={<ArticlesPage />} />
				<Route path="/articles" element={<ArticlesPage />} />
				<Route path="/articles/:articleSlug" element={<ArticlePage />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/new-article" element={<CreateArticle />} />
			</Routes>
		</div>
	);
}

export default App;
