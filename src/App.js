// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [firstcurrency, setFirstcurrency] = useState("USD");
  const [secondcurrency, setSecondcurrency] = useState("EUR");
  const [rate, setRate] = useState(1);
  const cur = secondcurrency;
  useEffect(() => {
    async function getcurrency() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstcurrency}&to=${secondcurrency}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        setRate(data.rates[secondcurrency]);
        console.log(rate);
      } catch (error) {
        console.error("Failed to fetch currency data:", error);
      }
    }
    getcurrency();
  }, [firstcurrency, secondcurrency, amount]);
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={firstcurrency}
        onChange={(e) => setFirstcurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondcurrency}
        onChange={(e) => setSecondcurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {firstcurrency == secondcurrency ? (
        <p>
          {" "}
          {firstcurrency} = {amount} {firstcurrency}{" "}
        </p>
      ) : (
        <p>
          {firstcurrency} is {rate} {secondcurrency}
        </p>
      )}
    </div>
  );
}
