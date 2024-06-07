"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import LightweightChart from "../components/LightWeightChart";
import tickers from "../data/tickers.json";

const CreatePortfolio: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const riskDegree = searchParams.get("riskDegree");
  const numStocks = searchParams.get("numStocks");
  const excludedTickers = searchParams.get("excludedTickers");
  const [data, setData] = useState<{ [key: string]: number } | null>(null);

  useEffect(() => {
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
                    <th className="px-4 py-2 border-b text-black">Ticker</th>
                    <th className="px-4 py-2 border-b text-black">
                      Allocation (%)
                    </th>
                    <th className="px-4 py-2 border-b text-black">
                      Company Name
                    </th>
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
      </div>
    </div>
  );
};

export default CreatePortfolio;
