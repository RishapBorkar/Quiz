import React, { useEffect, useState } from "react";
import "./Question.css";
import { useNavigate } from "react-router-dom";

// Function to shuffle the sequence of correct and incorrect answers
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Question() {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCheckedIndex, setCurrentCheckedIndex] = useState(-1);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const navigate = useNavigate();

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch("https://the-trivia-api.com/v2/questions");

        const data = await responce.json();
        setQuestionData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Shuffle the options whenever the question index changes
    if (questionData.length > 0) {
      const currentQuestion = questionData[currentQuestionIndex];
      const options = [
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
      ];
      setShuffledOptions(shuffleArray(options));
    }
  }, [currentQuestionIndex, questionData]);

  useEffect(() => {
    // Update the "isLastQuestion" state when the question index changes
    setIsLastQuestion(currentQuestionIndex === questionData.length - 1);
  }, [currentQuestionIndex, questionData]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentCheckedIndex(-1);
    } else {
      navigate("/result");
    }
  };

  const handleCheckboxClick = (index) => {
    // Create a new array with the clicked state toggled for the clicked checkbox
    setCurrentCheckedIndex(index);
  };

  const handleSubmit = () => {
    const currentQuestion = questionData[currentQuestionIndex];
    const correctAnswerIndex = shuffledOptions.indexOf(
      currentQuestion.correctAnswer
    );
    if (currentCheckedIndex === correctAnswerIndex) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    handleNextQuestion();
  };

  if (
    questionData.length === 0 ||
    currentQuestionIndex >= questionData.length
  ) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questionData[currentQuestionIndex];

  if (
    !currentQuestion ||
    !currentQuestion.question ||
    !currentQuestion.incorrectAnswers
  ) {
    return <p>Error: Data format is incorrect</p>;
  }

  return (
    <div className="questionPage">
      <div className="progressCircle1">
        <div className="progressCircle2">
          <p>
            <span className="span1">{currentQuestionIndex + 1}</span>
            <span className="span2">/{questionData.length}</span>
          </p>
        </div>
      </div>
      <div className="queContainer">
        <p className="queText">{currentQuestion.question.text}</p>
        <div className="queOptions">
          {shuffledOptions.map((option, index) => (
            <p className="options" key={index}>
              <div
                className={`checkBox ${
                  currentCheckedIndex === index ? "checked" : ""
                }`}
                onClick={() => handleCheckboxClick(index)}
              ></div>
              <p className="optionText">{option}</p>
            </p>
          ))}
        </div>
      </div>
      <button className="nextBtn" onClick={isLastQuestion ? handleSubmit : handleNextQuestion}>
        {/* Conditional rendering of button text */}
        {isLastQuestion ? "Submit" : "Next"}
        <span className="arrow"></span>
      </button>
    </div>
  );
}

export default Question;
