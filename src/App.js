import React from 'react';
import ChallengesPage from './components/ChallengesPage';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <ChallengesPage />
    </Router>
  );
};

export default App;
