"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const RiskResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const risk_degree = searchParams.get("riskDegree");
  console.log(risk_degree);

  const [numStocks, setNumStocks] = useState<number>(); // Default number of stocks
  const [excludedTickers, setExcludedTickers] = useState<string>(""); // Default excluded tickers
  const [initStocks, setInitStocks] = useState<string>(""); // Default excluded tickers

  const handleOptimizePortfolio = () => {
    router.push(
      `/OptimisePortfolio?riskDegree=${risk_degree}&initStocks=${initStocks}`
    );
  };

  const handleCreatePortfolio = () => {
    router.push(
      `/CreatePortfolio?riskDegree=${risk_degree}&numStocks=${numStocks}&excludedTickers=${excludedTickers}`
    );
  };

  const handleNumStocksChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumStocks(parseInt(event.target.value, 10));
  };

  const handleExcludedTickersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExcludedTickers(event.target.value);
  };

  const handleInitStocksChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInitStocks(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Risk Result Page
        </h1>
        <p className="text-center mb-4">Risk Degree: {risk_degree}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Number of Stocks:
          </label>
          <input
            type="number"
            value={numStocks}
            onChange={handleNumStocksChange}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Excluded Tickers (comma separated):
          </label>
          <input
            type="text"
            value={excludedTickers}
            onChange={handleExcludedTickersChange}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Current investments (Stocks comma separated):
          </label>
          <input
            type="text"
            value={initStocks}
            onChange={handleInitStocksChange}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleCreatePortfolio}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create New Portfolio
          </button>
          <button
            onClick={handleOptimizePortfolio}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Optimize Your Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskResultPage;
