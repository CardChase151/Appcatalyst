import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import { AuthProvider } from './context/AuthContext';

// Main screens
import Home from './main/home';
import Projects from './main/projects';
import Pricing from './main/pricing';
import LoginDemo from './main/logindemo';
import Search from './main/search';
import Saved from './main/saved';
import Contact from './main/contact';
import PWA from './main/pwa';
import FAQ from './main/faq';
import Privacy from './main/privacy';
import CSAEPolicy from './main/csae-policy';
import Blog from './main/blog';
import BlogPost from './main/blogpost';

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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login-demo" element={<LoginDemo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pwa" element={<PWA />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/csae-policy" element={<CSAEPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;