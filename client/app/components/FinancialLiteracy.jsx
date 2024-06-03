"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const FinancialLiteracyCard = () => {
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        console.log('Fetching data...');
        const response = await axios.post('https://literacy-api-1.onrender.com/api/literacy', {
          topic: "What is options trading",
        });
        const data = await response.data;
        console.log('Response:', data);
        setTopic(data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchTopic();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 mx-auto p-4">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-black">Get to know more about Investments.</h1>
      </div>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        topic && (
          <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 text-white">
              <h2 className="text-2xl font-semibold">{topic}</h2>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FinancialLiteracyCard;
