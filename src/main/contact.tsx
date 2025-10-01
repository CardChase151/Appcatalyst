import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../menu/bottombar';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Google Sheets Web App URL - replace with your deployed script URL
      const GOOGLE_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL || '';

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString()
        })
      });

      // With no-cors mode, we can't read the response, so we assume success
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Contact Me
        </h1>

        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid #333333',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Home
        </button>
      </header>

      {/* Main Content */}
      <div style={{
        backgroundColor: '#000000',
        border: '1px solid #333333',
        borderRadius: '16px',
        padding: '40px',
        marginBottom: '30px',
        maxWidth: '600px',
        margin: '0 auto 30px auto'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          Get In Touch
        </h2>

        <p style={{
          color: '#FFFFFF',
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '0 0 30px 0',
          textAlign: 'center'
        }}>
          Have a question or want to work together? Send me a message!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                color: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFFFFF'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                color: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFFFFF'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                color: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFFFFF'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div style={{
              backgroundColor: '#000000',
              border: '1px solid #4ECDC4',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#4ECDC4',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div style={{
              backgroundColor: '#000000',
              border: '1px solid #FF6B6B',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#FF6B6B',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              width: '100%',
              backgroundColor: status === 'loading' ? '#333333' : '#000000',
              color: '#FFFFFF',
              border: '1px solid #FFFFFF',
              padding: '14px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Tips */}
      <div style={{
        textAlign: 'center',
        marginBottom: '80px'
      }}>
        <p style={{
          color: '#FFFFFF',
          fontSize: '14px',
          margin: 0
        }}>
          Your message will be stored securely and I'll respond as soon as possible.
        </p>
      </div>

      <BottomBar activeTab="contact" />
    </div>
  );
}

export default Contact;
