"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CreatePortfolio: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const riskDegree = searchParams.get("riskDegree");
  const numStocks = searchParams.get("numStocks");
  const excludedTickers = searchParams.get("excludedTickers");
  const [data, setData] = React.useState<{ [key: string]: number } | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      if (riskDegree && numStocks && excludedTickers) {
        try {
          const adjustedRiskDegree = parseFloat(riskDegree) / 5;
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Suggested Portfolio
        </h1>
        {data ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-black">Ticker</th>
                <th className="px-4 py-2 border-b text-black">
                  Allocation (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([ticker, allocation], index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b text-black">{ticker}</td>
                  <td className="px-4 py-2 border-b text-black">
                    {allocation.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CreatePortfolio;
