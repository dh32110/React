import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState("true");
  const [coins, setCoins] = useState([]);
  const [myCoin, setMyCoin] = useState(0);
  const [choiceCoin, setChoiceCoin] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const yourMoney = (event) => setMyCoin(event.target.value);
  console.log(myCoin);
  const yourChoiceCoin = (event) => setChoiceCoin(event.target.value);
  console.log(choiceCoin);
  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={yourChoiceCoin}>
          <option>select coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price.toFixed(2)}USD
            </option>
          ))}
        </select>
      )}
      <h1>You can buy coins!</h1>
      <input
        onChange={yourMoney}
        value={myCoin}
        type="number"
        placeholder="How much money do you have?"
      />
      <h2>
        You can buy: {choiceCoin > 0 ? (myCoin / choiceCoin).toFixed(2) : null}
      </h2>
    </div>
  );
}

export default App;
