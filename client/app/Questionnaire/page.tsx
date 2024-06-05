"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import questionnaireData from "../data/questionnaire.json";
import { Question } from "../types";
import { FaRegQuestionCircle } from "react-icons/fa"; // Import an icon

const Page: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    const questions: Question[] = questionnaireData;
    setQuestions(questions);
    const initialAnswers: { [key: string]: string } = {};
    questions.forEach((q) => {
      initialAnswers[q.name] = "";
    });
    setAnswers(initialAnswers);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
    setIsAnswered(value !== "");
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    setIsAnswered(answers[questions[currentStep + 1]?.name] !== "");
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setIsAnswered(answers[questions[currentStep - 1]?.name] !== "");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { timeHorizonScore, riskToleranceScore } = calculateScore();
    const timeHorizonIndex = calculateTimeHorizonIndex(timeHorizonScore);
    const riskToleranceIndex = calculateRiskToleranceIndex(riskToleranceScore);
    const riskDegree = determineRiskDegree(
      timeHorizonIndex,
      riskToleranceIndex
    );
    alert(`Your risk degree is: ${riskDegree}`);
  };

  const calculateTimeHorizonIndex = (timeHorizonScore: number): number => {
    if (timeHorizonScore >= 2 && timeHorizonScore <= 4) {
      return 0;
    } else if (timeHorizonScore === 5) {
      return 1;
    } else if (timeHorizonScore >= 7 && timeHorizonScore <= 9) {
      return 2;
    } else if (timeHorizonScore >= 10 && timeHorizonScore <= 12) {
      return 3;
    } else if (timeHorizonScore >= 13 && timeHorizonScore <= 18) {
      return 4;
    }
    return 0; // Default case
  };

  const calculateRiskToleranceIndex = (riskToleranceScore: number): number => {
    if (riskToleranceScore >= 0 && riskToleranceScore <= 10) {
      return 0;
    } else {
      return riskToleranceScore - 10;
    }
  };

  const calculateScore = (): {
    timeHorizonScore: number;
    riskToleranceScore: number;
  } => {
    const timeHorizonScore =
      parseInt(answers.question1) + parseInt(answers.question2);
    const riskToleranceScore =
      parseInt(answers.question3) +
      parseInt(answers.question4) +
      parseInt(answers.question5) +
      parseInt(answers.question6) +
      parseInt(answers.question7);

    return { timeHorizonScore, riskToleranceScore };
  };

  const determineRiskDegree = (
    timeHorizonIndex: number,
    riskToleranceIndex: number
  ): number => {
    const profileChart: number[][] = [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3,
        3, 3, 3, 3, 3, 3, 3,
      ],
      [
        1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 4, 4, 4, 4, 4,
      ],
      [
        1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4,
        4, 4, 4, 5, 5, 5,
      ],
      [
        1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4,
        4, 5, 5, 5, 5, 5, 5,
      ],
      [
        1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5,
        5, 5, 5, 5, 5, 5, 5,
      ],
    ];

    return profileChart[timeHorizonIndex][riskToleranceIndex];
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <FaRegQuestionCircle className="mr-2" /> Investor Profile Questionnaire
        </h2>
        {questions.length > 0 && (
          <>
            <div key={currentStep} className="mb-4">
              <label className="block mb-2 text-lg font-medium text-gray-700">
                {questions[currentStep].question}
                <select
                  name={questions[currentStep].name}
                  value={answers[questions[currentStep].name]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select...</option>
                  {questions[currentStep].options.map((option, i) => (
                    <option key={i} value={option.points}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </label>
              {questions[currentStep].table && (
                <>
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
                    Comparison Table
                  </h3>
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b text-black">Plan</th>
                        <th className="px-4 py-2 border-b text-black">
                          Average annual return
                        </th>
                        <th className="px-4 py-2 border-b text-black">
                          Best-case
                        </th>
                        <th className="px-4 py-2 border-b text-black">
                          Worst-case
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions[currentStep].table?.map((row, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2 border-b text-black">
                            {row.plan}
                          </td>
                          <td className="px-4 py-2 border-b text-black">
                            {row.average}
                          </td>
                          <td className="px-4 py-2 border-b text-black">
                            {row.best}
                          </td>
                          <td className="px-4 py-2 border-b text-black">
                            {row.worst}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Previous
                </button>
              )}
              {isAnswered && currentStep < questions.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              )}
              {isAnswered && currentStep === questions.length - 1 && (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Page;
