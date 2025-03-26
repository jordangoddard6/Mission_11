import WelcomeBand from '../components/WelcomeBand';

function BuyPage() {
  return (
    <>
      <WelcomeBand />
      <h2>Buy</h2>
      <div>
        <input type="number" placeholder="Enter quantity" />
        <button>Add To Cart</button>
      </div>
    </>
  );
}

export default BuyPage;
