import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// Onboarding screens
import Welcome from './onboarding/welcome';
import Login from './onboarding/login';
import SignUp from './onboarding/signup';
import ForgotPassword from './onboarding/forgotpassword';

// Main screens
import Home from './main/home';
import Projects from './main/projects';
import LoginDemo from './main/logindemo';
import Search from './main/search';
import Saved from './main/saved';
import Contact from './main/contact';
import Profile from './main/profile';

function AppContent() {
  return (
    <Router>
      <div style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/work" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login-demo" element={<LoginDemo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;