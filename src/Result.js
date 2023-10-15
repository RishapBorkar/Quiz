import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const navigate = useNavigate();

  //   This code extracts the correct and incorrect query parameters from the URL.
  const query = new URLSearchParams(window.location.search);
  const correctAnswers = parseInt(query.get("correct"), 10) || 0;
  const incorrectAnswers = parseInt(query.get("incorrect"), 10) || 0;
  const totalQuestions = parseInt(query.get("total"), 10) || 0;

  // Calculate the percentage of correct answers
  const percentage = (correctAnswers / totalQuestions) * 100 || 0;

  console.log("correct answers", correctAnswers);
  console.log("incorrect answers", incorrectAnswers);
  console.log("percentage", percentage);

  const handleStartAgain = () => {
    // Navigate to the first question when the "Start Again" button is clicked
    navigate("/question");
  };

  return (
    <div className="resultPage">
      <div className="resultContainer">
        <p>Your result</p>
        <div className="guage">
          <div className="progress">
            <div className="bar"></div>
            <div className="bar2">
              {/* <div className="resultPercentage">50%</div> */}
              <div className="resultPercentage">{percentage.toFixed(0)}%</div>
            </div>
            <div className="needle"></div>
          </div>
        </div>
        <div className="result">
          <div className="correctDiv">
            <div className="resultCheckBox1"></div>
            <div className="resultQueNo">{correctAnswers}</div>
            <div className="resultText">Correct</div>
          </div>
          <div className="incorrectDiv">
            <div className="resultCheckBox2"></div>
            <div className="resultQueNo">{incorrectAnswers}</div>
            <div className="resultText">Incorrect</div>
          </div>
          <button className="startAgainBtn" onClick={handleStartAgain}>
            Start Again<span className="arrow"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
