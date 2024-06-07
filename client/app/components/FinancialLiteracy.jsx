"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Markdown from "markdown-to-jsx";

const topics = [
  "What is options trading",
  "How to manage retirement savings",
  "Social Security benefits",
  "Investment strategies for retirees",
  "Estate planning basics",
  "Tax planning for retirement",
];

const FinancialLiteracyCard = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async (topic) => {
      try {
        console.log(`Fetching data for: ${topic}`);
        const response = await axios.post(
          "https://literacy-api-1.onrender.com/api/literacy",
          { topic }
        );
        const result = response.data;
        console.log(`Response for ${topic}:`, result);
        setData((prevData) => ({
          ...prevData,
          [topic]: result.response,
        }));
      } catch (err) {
        console.error(`Error fetching data for ${topic}:`, err);
        setError("Error fetching data. Please try again later.");
      }
    };

    topics.forEach((topic) => fetchTopic(topic));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get to know more about Finance
        </h1>
      </div>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <div
                key={topic}
                className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-green-700 h-50">
                  <h2 className="text-2xl font-semibold text-white p-2">
                    {topic}
                  </h2>
                </div>
                <div className="p-6">
                  <Markdown className="text-gray-700 text-base">
                    {data[topic] ? data[topic] : "Loading..."}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLiteracyCard;
