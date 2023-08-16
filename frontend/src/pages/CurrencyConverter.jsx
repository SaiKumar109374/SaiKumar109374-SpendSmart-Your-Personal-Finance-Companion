import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    // Fetch list of available currencies
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/currencies.json"
        );
        setCurrencies(Object.keys(response.data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=79899a5c84f545cd9305f9fc668496d7`
      );

      const rates = response.data.rates;
      const convertedAmount = (amount * rates[toCurrency]).toFixed(2);
      setConversionResult(
        `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
      );
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div>
      <Header />
      <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 mb-5"></div>
            <h1 className="text-3xl font-bold mb-10">Currency Converter</h1>
            <hr className="my-10" />
            <form onSubmit={handleConvert}>
              <div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category"
                    >
                      From Currency:
                    </label>
                    <div className="relative">
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-category"
                        name="category"
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category"
                    >
                      To Currency:
                    </label>
                    <div className="relative">
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-category"
                        name="category"
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-amount"
                  >
                    Amount:
                  </label>
                  <input
                    className="appearance-none block w-full bg-green-50 text-gray-700 border border-green-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Income Amount"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <button class="bg-[#63b0b8] hover:bg-[#469a9e] text-white font-bold py-2 px-4 rounded-full">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800 grid place-items-center">
              <div className="font-bold text-2xl leading-none">
                {conversionResult && <p>{conversionResult}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CurrencyConverter;
