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
  const [userAnswers, setUserAnswers] = useState(
    Array(questionData.length).fill(null)
  );
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const navigate = useNavigate();

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
      setIsNextDisabled(true); // Disable the "Next" button again
    } else {
      // Calculate the number of correct and incorrect answers
      const correctAnswers = userAnswers.filter(
        (userAnswer, index) => userAnswer === questionData[index].correctAnswer
      ).length;

      const incorrectAnswers = userAnswers.filter(
        (userAnswer, index) => userAnswer !== questionData[index].correctAnswer
      ).length;

      const totalQuestions = questionData.length;

      const percentage = (correctAnswers / totalQuestions) * 100;

      // Pass the correct and incorrect answers as query parameters
      navigate(
        `/result?correct=${correctAnswers}&incorrect=${incorrectAnswers}&total=${totalQuestions}&percentage=${percentage}`
      );

      console.log("correct answers", correctAnswers);
      console.log("incorrect answers", incorrectAnswers);
      console.log("percentage", percentage);
    }
  };

  const handleCheckboxClick = (index) => {
    // Create a new array with the selected answer for the current question
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = shuffledOptions[index];
    setUserAnswers(newUserAnswers);

    // Enable the "Next" button when an option is selected
    setIsNextDisabled(false);
  };

  const handleSubmit = () => {
    if (userAnswers[currentQuestionIndex] === null) {
      // Don't proceed to the next question without selecting an option
      return;
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
                  userAnswers[currentQuestionIndex] === option ? "checked" : ""
                }`}
                onClick={() => handleCheckboxClick(index)}
              ></div>
              <p className="optionText">{option}</p>
            </p>
          ))}
        </div>
      </div>
      <button
        className="nextBtn"
        onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
        disabled={isNextDisabled} // Disable the button if no option is selected
      >
        {/* Conditional rendering of button text */}
        {isLastQuestion ? "Submit" : "Next"}
        <span className="arrow"></span>
      </button>
    </div>
  );
}

export default Question;
