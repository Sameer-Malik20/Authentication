import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/login';  // Import the LoginForm component

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Add more routes if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
