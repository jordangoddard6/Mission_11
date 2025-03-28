import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

// Website only displays the booklist component
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />}></Route>
            <Route
              path="/buy/:bookTitle/:bookId/:bookPrice"
              element={<BuyPage />}
            ></Route>
            <Route path="/books" element={<BooksPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
