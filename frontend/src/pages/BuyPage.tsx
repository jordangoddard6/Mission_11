import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function BuyPage() {
  const navigate = useNavigate();
  const { bookTitle, bookId, bookPrice } = useParams();
  const { addToCart } = useCart();
  const [bookQuantity, setBookQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookTitle: bookTitle || 'No Project Found',
      bookQuantity,
      bookPrice: Number(bookPrice),
    };
    addToCart(newItem);
    navigate('/cart');
  };
  return (
    <>
      <div className="container">
        <div className="row mb-3">
          <WelcomeBand />
        </div>
        <h2>Buy {bookTitle}</h2>
        <h4>Price: ${Number(bookPrice).toFixed(2)}</h4>
        <div>
          <input
            type="number"
            placeholder="Enter quantity"
            value={bookQuantity}
            onChange={(x) => setBookQuantity(Number(x.target.value))}
          />
          <button onClick={handleAddToCart}>Add To Cart</button>
        </div>

        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}

export default BuyPage;
