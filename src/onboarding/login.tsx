import React, { useState } from 'react';

interface LoginProps {
  onLogin?: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'viewer@gmail.com' && password === 'view') {
      setIsLoggingIn(true);
      setTimeout(() => {
        setIsLoggingIn(false);
        setLoginSuccess(true);
        setTimeout(() => {
          if (onLogin) {
            onLogin();
          }
        }, 1500);
      }, 1000);
    } else {
      alert('Invalid credentials!');
    }
  };

  if (loginSuccess) {
    return (
      <div style={{
        backgroundColor: '#0F1623',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: '#E2F4FF'
      }}>
        <div style={{
          fontSize: '60px',
          color: '#00D1FF',
          marginBottom: '20px',
          animation: 'bounce 0.6s ease-in-out'
        }}>
          ✓
        </div>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '800',
          textAlign: 'center',
          color: '#00D1FF'
        }}>
          Login Successful!
        </h2>
        <style>{`
          @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            80% { transform: translateY(-15px); }
          }
        `}</style>
      </div>
    );
  }

  const inputStyle = {
    backgroundColor: '#101A2B',
    border: '1px solid #1b2a44',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#E2F4FF',
    fontSize: '16px',
    width: '100%',
    marginBottom: '16px',
    outline: 'none'
  };

  const buttonStyle = {
    backgroundColor: '#00D1FF',
    color: '#0F1623',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '900',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '12px'
  };

  const secondaryButtonStyle = {
    backgroundColor: '#101A2B',
    color: '#E2F4FF',
    border: '1px solid #1b2a44',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '800',
    cursor: 'pointer',
    marginRight: '12px'
  };

  return (
    <div style={{
      backgroundColor: '#0F1623',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      color: '#E2F4FF'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '800', 
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Login to BORED
        </h2>
        
        <form onSubmit={handleLogin} style={{ marginBottom: '24px' }}>
          <input 
            type="email" 
            placeholder="viewer@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input 
            type="password" 
            placeholder="view" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={() => window.location.href = '/signup'}
            style={secondaryButtonStyle}
          >
            Sign Up
          </button>
          <button 
            onClick={() => window.location.href = '/forgot-password'}
            style={secondaryButtonStyle}
          >
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;