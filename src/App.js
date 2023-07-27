import './Coin.css';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './Coin';
function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      setCoins(result.data);
    }

    fetchData();
  }, []);

  const handleOrder = (property) => {
    setIsAscending(!isAscending);
    setOrderBy(property);
  };

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return isAscending ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
  return (
    <div className="App">
      <div className="coin-search">
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input type="text" placeholder='Search' className='coin-input' onChange={handleChange} />
        </form>
        <div className="coin-container">
        <div className="coin-header coin-row">
          <div onClick={() => handleOrder("name")}>
            <p>Name</p>
            {orderBy === "name" && (isAscending ? "↑" : "↓")}
          </div>
          <div onClick={() => handleOrder("price")}>
            <p>Price</p>
            {orderBy === "price" && (isAscending ? "↑" : "↓")}
          </div>
          <div onClick={() => handleOrder("volume")}>
            <p>Volume</p>
            {orderBy === "volume" && (isAscending ? "↑" : "↓")}
          </div>
          <div onClick={() => handleOrder("price_change_percentage_24h")}>
            <p>24h %</p>
            {orderBy === "price_change_percentage_24h" &&
              (isAscending ? "↑" : "↓")}
          </div>
          <div onClick={() => handleOrder("market_cap")}>
            <p>Market Cap</p>
            {orderBy === "market_cap" && (isAscending ? "↑" : "↓")}
          </div>
         </div>
          </div>

        {filteredCoins.map(coin => {
          return (
            <Coin key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
        })}
      </div> </div>
      );
}

      export default App;
