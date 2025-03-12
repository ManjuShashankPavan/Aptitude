import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const allQuestions = {
  round1: [
    {
      question: "A train 200m long is moving at 60 km/h. How long to pass a pole?",
      options: ["10 sec", "12 sec", "15 sec", "20 sec"],
      answer: "12 sec",
    },
    {
      question: "If 1=5, 2=10, 3=15, 4=20, then 5=?",
      options: ["20", "25", "30", "35"],
      answer: "25",
    },
    {
      question: "What is 15% of 200?",
      options: ["15", "25", "30", "35"],
      answer: "30",
    },
    {
      question: "Find the missing number: 3, 6, 9, ?, 15",
      options: ["10", "11", "12", "13"],
      answer: "12",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
  ],

  round2: [
    {
      question: "What comes next in the series: 2, 6, 12, 20, ?",
      options: ["28", "30", "32", "42"],
      answer: "30",
    },
    {
      question: "A clock shows 3:15. What is the angle between the hands?",
      options: ["37.5°", "42°", "47.5°", "52.5°"],
      answer: "37.5°",
    },
    {
      question: "If the perimeter of a square is 16 cm, what is the area?",
      options: ["4 cm²", "8 cm²", "16 cm²", "32 cm²"],
      answer: "16 cm²",
    },
    {
      question: "Find the missing term: 1, 4, 9, 16, ?",
      options: ["20", "25", "30", "36"],
      answer: "25",
    },
    {
      question: "What is 18% of 150?",
      options: ["27", "30", "33", "36"],
      answer: "27",
    },
  ],

  round3: [
    {
      question: "A train running at 72 km/h crosses a bridge in 50 seconds. If the bridge is 400m long, what is the train's length?",
      options: ["200m", "250m", "300m", "350m"],
      answer: "300m",
    },
    {
      question: "Find the missing term: 5, 11, 17, 23, ?",
      options: ["27", "28", "29", "30"],
      answer: "29",
    },
    {
      question: "A shopkeeper sells a product at 20% profit. If the cost price is $200, what is the selling price?",
      options: ["$220", "$240", "$260", "$280"],
      answer: "$240",
    },
    {
      question: "If a:b = 2:3 and b:c = 4:5, what is a:c?",
      options: ["8:15", "5:8", "6:9", "10:12"],
      answer: "8:15",
    },
    {
      question: "A number is doubled and then increased by 10. If the result is 50, what is the original number?",
      options: ["15", "20", "25", "30"],
      answer: "20",
    },
  ],

  round4: [
    {
      question: "Find the missing number in the sequence: 3, 7, 15, 31, ?",
      options: ["57", "63", "49", "50"],
      answer: "63",
    },
    {
      question: "A sum of money triples itself in 8 years at simple interest. What is the rate of interest per year?",
      options: ["10%", "15%", "20%", "25%"],
      answer: "25%",
    },
    {
      question: "If x² - 9 = 16, what is x?",
      options: ["5", "7", "-5", "±5"],
      answer: "±5",
    },
    {
      question: "The average of 5 consecutive even numbers is 32. What is the largest number?",
      options: ["34", "36", "38", "40"],
      answer: "36",
    },
    {
      question: "A person walks 5 km north, then 3 km east. How far is he from the starting point?",
      options: ["5 km", "6 km", "7 km", "8 km"],
      answer: "6 km",
    },
  ],

  round5: [
    {
      question: "What is the probability of rolling a sum of 7 with two dice?",
      options: ["1/6", "1/5", "1/4", "1/3"],
      answer: "1/6",
    },
    {
      question: "A box contains 10 red and 20 blue balls. One ball is picked randomly. What is the probability of picking a red ball?",
      options: ["1/2", "1/3", "1/4", "2/3"],
      answer: "1/3",
    },
    {
      question: "Find the missing number in the series: 1, 3, 9, 27, ?",
      options: ["54", "81", "72", "90"],
      answer: "81",
    },
    {
      question: "A man spends 80% of his income. If his income increases by 25%, his expenditure increases by?",
      options: ["10%", "20%", "25%", "30%"],
      answer: "20%",
    },
    {
      question: "Find the HCF of 36 and 48.",
      options: ["6", "12", "18", "24"],
      answer: "12",
    },
  ],

  round6: [
    {
      question: "The sum of three consecutive numbers is 72. What is the largest number?",
      options: ["23", "24", "25", "26"],
      answer: "25",
    },
    {
      question: "Find the next term: 2, 6, 12, 20, 30, ?",
      options: ["38", "40", "42", "44"],
      answer: "42",
    },
    {
      question: "A car travels 150 km in 3 hours and then 200 km in 4 hours. What is the average speed?",
      options: ["40 km/h", "45 km/h", "50 km/h", "55 km/h"],
      answer: "50 km/h",
    },
    {
      question: "A train travels at 90 km/h. How long does it take to cover 225 km?",
      options: ["2 hrs", "2.5 hrs", "3 hrs", "3.5 hrs"],
      answer: "2.5 hrs",
    },
    {
      question: "A person deposits $1000 in a bank at 5% compound interest. What is the amount after 2 years?",
      options: ["$1100", "$1102.5", "$1125", "$1150"],
      answer: "$1102.5",
    },
  ],
};

const AptitudeQuiz = () => {
  const { round } = useParams();
  const navigate = useNavigate();
  const questions = allQuestions[round] || []; // Prevent undefined errors

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  if (!questions.length) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Invalid Round</h2>
        <p className="text-lg text-gray-700">The selected round does not exist.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }

    setSelectedAnswer(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 pt-20">
      <h2 className="text-xl font-bold text-center mb-10">
         Aptitude Quiz
      </h2>

      {showScore ? (
        <div className="text-center">
          <h3 className="text-2xl font-semibold"> {round === "round1" ? "1st Round" : round === "round2" ? "2nd Round" : round === "round3" ? "3rd Round" : round === "round4" ? "4th Round" : round === "round5" ? "5th Round" : "6th Round"}
          <br />Quiz Completed!</h3>
          <p className="text-lg font-bold">
            Your Score: {score} / {questions.length}
          </p>
          <button
              onClick={() => navigate(round === "round6" ? "/Mockinterview" : "/Rounds")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
             Thank you
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            {questions[currentQuestion].question}
          </h3>
          <div className="flex flex-col gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded-lg ${
                  selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`w-full mt-4 px-4 py-2 rounded-lg ${
              selectedAnswer
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AptitudeQuiz;
