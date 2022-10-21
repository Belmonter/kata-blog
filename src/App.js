import Header from './components/Header/Header';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import { Routes, Route } from 'react-router-dom';
import ArticlePage from "./pages/ArticlePage/ArticlePage";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<ArticlesPage />} />
				<Route path="/articles" element={<ArticlesPage />} />
				<Route path="/articles/:articleSlug" element={<ArticlePage/>} />
			</Routes>
		</div>
	);
}

export default App;
