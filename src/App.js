import React from 'react';
import ChallengesPage from './components/ChallengesPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChallengeForm from './components/ChallengeForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ChallengesPage />} />
        <Route path='/challengeform' element={<ChallengeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
