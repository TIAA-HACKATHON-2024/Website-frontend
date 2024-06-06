"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const FinancialLiteracyCard = () => {
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.post(
          "https://literacy-api-1.onrender.com/api/literacy",
          {
            topic: "What is options trading",
          }
        );
        const data = await response.data;
        console.log("Response:", data);
        setTopic(data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchTopic();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get to know more about Finance
        </h1>
      </div>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        topic && (
          <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-blue-900">
              <h2 className="text-2xl font-semibold text-white">
                Topic
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base">{topic}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FinancialLiteracyCard;
