import React, { useState, useEffect } from "react";
import "./App.css";
import Maserati from "./maserati.png";

function App() {
  const [snxPriceUSD, setSNXPriceUSD] = useState(null);

  const initialUSDAmount = 14344;
  const maseratiCost = 43000;
  const initialSNXPrice = 0.8;
  const initialSNXAmount = initialUSDAmount / 0.8;
  const pl =
    snxPriceUSD === null
      ? null
      : initialSNXAmount * (snxPriceUSD - initialSNXPrice);

  // Assume 1 maserati = 60k AUD = 43k USD
  // Asumme initial investment = 14,344.60 USD

  const getSNXPrice = async () => {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=havven&vs_currencies=usd",
      {
        headers: {
          accept: "application/json",
          "accept-language":
            "en-AU,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh;q=0.5,en-GB;q=0.4,en-US;q=0.3",
          "if-none-match": 'W/"b152af8a86daf39dd04e1140e3bb6543"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
        referrer: "https://www.coingecko.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );

    const data = await resp.json();

    const { havven } = data;

    setSNXPriceUSD(havven.usd);
  };

  useEffect(() => {
    if (snxPriceUSD === null) {
      getSNXPrice();
    }
  }, [snxPriceUSD]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={Maserati} className="App-logo" alt="logo" />
        <br />
        <br />

        <table style={{ width: "60%" }}>
          <tr>
            <td style={{ textAlign: "left" }}>Start</td>
            <td style={{ textAlign: "right" }}>
              {initialUSDAmount.toFixed(2).toString()} USD
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>Today</td>
            <td style={{ textAlign: "right" }}>
              {snxPriceUSD === null
                ? "..."
                : (initialUSDAmount + pl).toFixed(2).toString()}{" "}
              USD
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>Initial SNX Price</td>
            <td style={{ textAlign: "right" }}>
              {initialSNXPrice.toString()} USD
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>Current SNX Price</td>
            <td style={{ textAlign: "right" }}>
              {snxPriceUSD === null ? "..." : snxPriceUSD.toString()} USD
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>P/L</td>
            <td style={{ textAlign: "right" }}>
              {snxPriceUSD === null ? "..." : pl.toFixed(2).toString()} USD
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>Maserati Count</td>
            <td style={{ textAlign: "right" }}>
              {snxPriceUSD === null
                ? "..."
                : (pl / maseratiCost).toFixed(2).toString()}
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default App;
