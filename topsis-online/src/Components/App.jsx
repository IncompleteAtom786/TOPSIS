import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NextPage from "./NextPage";
import DecisionMatrix from "./DecisionMatrix";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';


function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/next" element={<NextPage />} />
          <Route path="/decision-matrix" element={<DecisionMatrix />} />
        </Routes>
      </Router>
    );
}

export default App;
