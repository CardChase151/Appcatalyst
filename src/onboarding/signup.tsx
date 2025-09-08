import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Test account created successfully!');
    // Navigate to login or home later
  };

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
    marginBottom: '24px'
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
    width: '100%'
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
          Sign Up for BORED
        </h2>
        
        <form onSubmit={handleSignUp} style={{ marginBottom: '24px' }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input 
            type="password" 
            placeholder="Create password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <input 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Create Account
          </button>
        </form>
        
        <button 
          onClick={() => window.location.href = '/login'}
          style={secondaryButtonStyle}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default SignUp;