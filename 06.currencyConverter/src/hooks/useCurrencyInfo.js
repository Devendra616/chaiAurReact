import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and return currency information.
 *
 * @param {string} currency - The currency code to fetch information for.
 * @returns {Object} - The currency information.
 */
function useCurrencyInfo(currency) {
  // State to store the fetched currency data
  const [data, setData] = useState({});

  // Effect to fetch currency data when the currency code changes
  useEffect(() => {
    // Fetch currency data from the API
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json()) // Parse the JSON response
      .then((res) => setData(res[currency])); // Update the state with the fetched data
  }, [currency]); // Dependency array to re-run the effect when the currency code changes

  return data;
}

export default useCurrencyInfo;
