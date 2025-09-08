import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Onboarding screens
import Welcome from './onboarding/welcome';
import Login from './onboarding/login';
import SignUp from './onboarding/signup';
import ForgotPassword from './onboarding/forgotpassword';

// Main screens
import Home from './main/home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // If user is not authenticated, show onboarding flow
  if (!isAuthenticated) {
    return (
      <Router>
        <div style={{ 
          backgroundColor: '#0F1623', 
          minHeight: '100vh',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  // If user is authenticated, show main app
  return (
    <Router>
      <div style={{ 
        backgroundColor: '#0F1623', 
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<div style={{color: '#E2F4FF', padding: '20px'}}>Search Screen Coming Soon</div>} />
          <Route path="/saved" element={<div style={{color: '#E2F4FF', padding: '20px'}}>Saved Screen Coming Soon</div>} />
          <Route path="/calendar" element={<div style={{color: '#E2F4FF', padding: '20px'}}>Calendar Screen Coming Soon</div>} />
          <Route path="/profile" element={<div style={{color: '#E2F4FF', padding: '20px'}}>Profile Screen Coming Soon</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;