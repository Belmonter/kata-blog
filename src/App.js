import Header from "./components/Header/Header";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<ArticlesPage/>}/>
        <Route path='/articles' element={<ArticlesPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
