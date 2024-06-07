"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

const RiskResultPage = ({ risk_degree }) => {
  const router = useRouter();
  console.log(risk_degree);

  const [initStocks, setInitStocks] = useState("");

  const handleOptimizePortfolio = () => {
    router.push(
      `/OptimisePortfolio?riskDegree=${risk_degree}&initStocks=${initStocks}`
    );
  };
  
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current investments:
        </label>
        <MultiSelectDropdown
          selectedOptions={initStocks}
          setSelectedOptions={setInitStocks}
        />
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleOptimizePortfolio}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Optimize Your Portfolio
        </button>
      </div>
    </>
  );
};

export default RiskResultPage;
