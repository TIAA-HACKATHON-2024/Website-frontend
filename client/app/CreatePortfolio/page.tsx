"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import LightweightChart from "../components/LightWeightChart";
import tickers from "../data/tickers.json";
import Markdown from "markdown-to-jsx";

const CreatePortfolio: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const riskDegree = searchParams.get("riskDegree");
  const numStocks = searchParams.get("numStocks");
  const excludedTickers = searchParams.get("excludedTickers");
  const [data, setData] = useState<{ [key: string]: number } | null>(null);
  const [tickerInfo, setTickerInfo] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (riskDegree && numStocks && excludedTickers) {
        try {
          let adjustedRiskDegree = parseFloat(riskDegree) / 5;
          if (adjustedRiskDegree === 1) {
            adjustedRiskDegree = 0.99;
          }
          const excludedTickersArray = excludedTickers
            .split(",")
            .map((ticker) => ticker.trim());

          excludedTickersArray.push("XOM");

          const response = await fetch(
            "https://predictweights.azurewebsites.net/api/predictweights/allocation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                excluded_tickers: excludedTickersArray,
                risk_degree: adjustedRiskDegree,
                num_stocks: parseInt(numStocks, 10),
              }),
            }
          );

          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [riskDegree, numStocks, excludedTickers]);

  const handleGetTickerInfo = async (ticker: string) => {
    const response = await fetch(
      "https://literacy-api-1.onrender.com/api/fundamentals",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticker: ticker,
        }),
      }
    );

    const result = await response.json();
    setTickerInfo(result.response);
  };

  return (
    <div className="flex flex-row justify-center min-h-screen bg-gray-100">
      <div className="w-5/6 my-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Suggested Portfolio
        </h1>
        <div className="flex flex-row justify-between items-center">
          <div className="w-1/2">
            {data ? (
              <>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-black">Ticker</th>
                      <th className="px-4 py-2 border-b text-black">
                        Allocation (%)
                      </th>
                      <th className="px-4 py-2 border-b text-black">
                        Company Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data).map(
                      ([ticker, allocation]: [string, number], index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="px-4 py-2 border-b text-black text-center">
                              {ticker}
                            </td>
                            <td className="px-4 py-2 border-b text-black text-center">
                              {allocation.toFixed(2)}
                            </td>
                            <td className="px-4 py-2 border-b text-black text-center">
                              {tickers[ticker]}
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-black">Loading...</p>
            )}
          </div>
          <div className="w-1/2">
            {data && (
              <div className="">
                <PieChart
                  data={Object.values(data)}
                  labels={Object.keys(data)}
                />
              </div>
            )}
          </div>
        </div>
        {data && <LightweightChart predictions={data} />}
        <div className="mt-6"></div>
        <label
          htmlFor="tickerSelect"
          className="block text-sm font-medium text-gray-700"
        >
          Select Ticker:
        </label>
        <select
          id="tickerSelect"
          name="tickerSelect"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          onChange={(e) => handleGetTickerInfo(e.target.value)}
        >
          <option value="">Select a ticker</option>
          {data &&
            Object.keys(data).map((ticker) => (
              <option key={ticker} value={ticker}>
                {ticker}
              </option>
            ))}
        </select>

        {tickerInfo && (
          <div className="text-black bg-white p-5 overflow-auto max-h-60">
            <Markdown>{tickerInfo}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePortfolio;
