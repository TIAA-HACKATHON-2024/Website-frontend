"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const OptimisePortfolio: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const riskDegree = searchParams.get("riskDegree");
  const initStocks = searchParams.get("initStocks");
  const [data, setData] = React.useState<{ [key: string]: number } | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      if (riskDegree && initStocks) {
        try {
          const adjustedRiskDegree = parseFloat(riskDegree) / 5;
          const initStocksArray = initStocks
            .split(",")
            .map((ticker) => ticker.trim());

          const response = await fetch(
            "https://predictweights.azurewebsites.net/api/predictweights/reallocation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                risk_degree: adjustedRiskDegree,
                init_stocks: initStocksArray,
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
  }, [riskDegree, initStocks]);

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

export default OptimisePortfolio;
