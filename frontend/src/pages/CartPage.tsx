import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.bookPrice * item.bookQuantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="list-unstyled">
            {cart.map((item: CartItem) => (
              <li key={item.bookId} className="card p-3">
                <h4>{item.bookTitle}</h4>
                <ul className="list-unstyled">
                  <li>Quantity: {item.bookQuantity}</li>
                  <li>Price: ${item.bookPrice.toFixed(2)}</li>
                  <li>
                    Subtotal: ${(item.bookQuantity * item.bookPrice).toFixed(2)}
                  </li>
                </ul>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.bookId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
