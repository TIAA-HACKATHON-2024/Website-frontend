"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreatePortfolioCard from "../components/CreatePortfolioCard";
import OptimisePortfolioCard from "../components/OptimisePortfolioCard";

const RiskResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const risk_degree = searchParams.get("riskDegree");
  console.log(risk_degree);

  const [numStocks, setNumStocks] = useState<number>();
  const [excludedTickers, setExcludedTickers] = useState<string>("");
  const [initStocks, setInitStocks] = useState<string>("");
  const [isNew, setIsNew] = useState(true);

  const riskArray = [
    "",
    "Conservative",
    "Modertely conservative",
    "Moderate",
    "Moderately aggressive",
    "Aggressive",
  ];

  const handleOptimizePortfolio = () => {
    router.push(
      `/OptimisePortfolio?riskDegree=${risk_degree}&initStocks=${initStocks}`
    );
  };

  const handleCreatePortfolio = () => {
    router.push(
      `/CreatePortfolio?riskDegree=${risk_degree}&numStocks=${numStocks}&excludedTickers=${
        excludedTickers !== "" ? excludedTickers : "XOM"
      }`
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
    <div className="flex flex-row justify-center min-h-screen bg-gray-100">
      <div className="w-1/2 my-10">
        <h1 className="text-2xl text-black font-bold mb-6 text-center">
          Risk Result Analysis
        </h1>
        <p className="text-center mb-4 text-black">
          Risk Degree: {2 * (risk_degree ? parseInt(risk_degree) : 0)} / 10
        </p>
        <p className="text-center mb-4 text-black">
          Risk Level: {riskArray[parseInt(risk_degree ? risk_degree : "0")]}
        </p>
        {isNew ? (
          <CreatePortfolioCard risk_degree={risk_degree} />
        ) : (
          <OptimisePortfolioCard risk_degree={risk_degree} />
        )}
        <div className="flex flex-row justify-center my-5">
          <button onClick={() => setIsNew(!isNew)} className="text-black">
            {isNew
              ? "Opotimise your existing portfolio instead?"
              : "Create a new portfolio instead?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskResultPage;
