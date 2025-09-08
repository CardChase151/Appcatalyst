import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
    } else {
      alert('Please enter your email address');
    }
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
    marginBottom: '16px'
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

  if (emailSent) {
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
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            marginBottom: '24px'
          }}>
            Email Sent!
          </h2>
          <p style={{ 
            color: '#9FBAD1', 
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            An email has been sent to <strong style={{ color: '#00D1FF' }}>{email}</strong> with instructions to reset your password.
          </p>
          <p style={{ 
            color: '#9FBAD1', 
            marginBottom: '32px',
            lineHeight: '1.5'
          }}>
            Check your inbox and follow the link to update your password.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            style={secondaryButtonStyle}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

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
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Forgot Password
        </h2>
        <p style={{ 
          color: '#9FBAD1', 
          marginBottom: '32px',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSendEmail} style={{ marginBottom: '16px' }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Send Reset Email
          </button>
        </form>
        
        <button 
          onClick={() => window.location.href = '/login'}
          style={secondaryButtonStyle}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;