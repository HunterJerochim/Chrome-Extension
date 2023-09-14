import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./crypto.css";

export default function CryptoApp() {
  const [crypto, setCrypto] = useState(null);
  const [currentCrypto, setCurrentCrypto] = useState("ethereum");
  const [cryptoInput, setCryptoInput] = useState("");

  const handleCryptoInput = (event) => {
    setCryptoInput(event.target.value);
    console.log(cryptoInput);
  };

  const handleSelectCryptoInput = () => {
    setCurrentCrypto(cryptoInput);
  };

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${currentCrypto}`)
      .then((response) => response.json())
      .then((data) => {
        setCrypto(data);
        console.log(crypto);
      });
  }, [currentCrypto]);

  /* useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum')

      const responseJson = await response.json()

      setCrypto(responseJson);
    }

    fetchData()
  }, []); */

  return (
    <Draggable>
      <div className="crypto-container">
        <div className="input-container">
          <input
            placeholder="Select crypto name"
            onChange={handleCryptoInput}
            className="crypto-input"
          />
          <button
            onClick={handleSelectCryptoInput}
            className="crypto-search-button"
          >
            Search
          </button>
        </div>
        {crypto && (
          <div>
            <div>
              <h1 className="crypto-name">
                <img src={crypto?.image?.small} alt="Crypto Icon" />
                {crypto?.name}
              </h1>
            </div>
            <div className="crypto-stats">
              <p className="crypto-price">
                Current: {crypto.market_data?.current_price?.usd}
              </p>
              <p className="crypto-price">
                High: {crypto.market_data?.high_24h?.usd}
              </p>
              <p className="crypto-price">
                Low: {crypto.market_data?.low_24h?.usd}
              </p>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}
