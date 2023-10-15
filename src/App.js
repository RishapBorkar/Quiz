import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Question from "./Question";
import Result from "./Result";

function App() {
  return (
    // react-router-dom is used render the component as per the path
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
