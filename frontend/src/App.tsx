import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/BuyPage';

// Website only displays the booklist component
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />}></Route>
          <Route path="/buy/:bookTitle" element={<BuyPage />}></Route>
          <Route path="/books" element={<BooksPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
