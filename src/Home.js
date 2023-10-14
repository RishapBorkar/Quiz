import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="homeContainer">
      <img
        className="logo"
        src="https://www.upraised.co/blog/content/images/2022/04/Horizontal-Logo---Full-Colour-3x.png"
        alt="Upraised-logo"
      ></img>
      <div className="circle">
        <p className="quizText">Quiz</p>
      </div>

      <div className="startBtnDiv">
        <Link to="/question">
          <button className="startBtn">Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
