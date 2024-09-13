import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { Analytics } from "@vercel/analytics/react";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                </Routes>
            </Router>
            <Analytics />
        </>
    );
}

export default App;