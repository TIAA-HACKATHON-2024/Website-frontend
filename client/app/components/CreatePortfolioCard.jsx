"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

const CreatePortfolioCard = ({ risk_degree }) => {
  const router = useRouter();
  console.log(risk_degree);

  const [numStocks, setNumStocks] = useState(0);
  const [excludedTickers, setExcludedTickers] = useState("");

  const riskArray = [
    "",
    "Conservative",
    "Modertely conservative",
    "Moderate",
    "Moderately aggressive",
    "Aggressive",
  ];

  const handleCreatePortfolio = () => {
    router.push(
      `/CreatePortfolio?riskDegree=${risk_degree}&numStocks=${numStocks}&excludedTickers=${
        excludedTickers ? excludedTickers : "XOM"
      }`
    );
  };

  const handleNumStocksChange = (event) => {
    setNumStocks(parseInt(event.target.value, 10));
  };

  const handleExcludedTickersChange = (event) => {
    setExcludedTickers(event.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Number of Stocks:
        </label>
        <input
          type="number"
          value={numStocks}
          onChange={handleNumStocksChange}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Excluded Tickers:
        </label>
        <MultiSelectDropdown
          selectedOptions={excludedTickers}
          setSelectedOptions={setExcludedTickers}
        />
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={handleCreatePortfolio}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Portfolio
        </button>
      </div>
    </>
  );
};

export default CreatePortfolioCard;
