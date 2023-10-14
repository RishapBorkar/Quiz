import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);

  const correctAnswers = parseInt(query.get("correct"), 10) || 0;
  const incorrectAnswers = parseInt(query.get("incorrect"), 10) || 0;

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
              <div className="resultPercentage">{`${
                correctAnswers === 0
                  ? 0
                  : (
                      (correctAnswers / (correctAnswers + incorrectAnswers)) *
                      100
                    ).toFixed(0)
              }%`}</div>
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
