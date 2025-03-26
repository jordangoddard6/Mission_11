import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function BuyPage() {
  const navigate = useNavigate();
  const { bookTitle } = useParams();
  return (
    <>
      <WelcomeBand />
      <h2>Buy {bookTitle}</h2>
      <div>
        <input type="number" placeholder="Enter quantity" />
        <button>Add To Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;
