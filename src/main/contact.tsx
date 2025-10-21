import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../menu/bottombar';
import { supabase } from '../config/supabase';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    appDescription: '',
    budgetRange: '',
    platforms: [] as string[],
    timeline: '',
    hasDesign: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validation
    if (formData.platforms.length === 0) {
      setStatus('error');
      setErrorMessage('Please select at least one platform.');
      return;
    }

    try {
      // Insert into Supabase
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone,
          app_description: formData.appDescription,
          budget_range: formData.budgetRange,
          platforms: formData.platforms,
          timeline: formData.timeline,
          has_design: formData.hasDesign
        }]);

      if (dbError) throw dbError;

      // Send emails via Netlify function
      const emailResponse = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          appDescription: formData.appDescription,
          budgetRange: formData.budgetRange,
          platforms: formData.platforms,
          timeline: formData.timeline,
          hasDesign: formData.hasDesign
        })
      });

      if (!emailResponse.ok) {
        console.error('Email failed but submission saved');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        appDescription: '',
        budgetRange: '',
        platforms: [],
        timeline: '',
        hasDesign: ''
      });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingTop: isPWA ? 'max(env(safe-area-inset-top), 20px)' : '20px',
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
          Ready to bring your app idea to life? Fill out the form below and let's discuss your project with <strong>AppCatalyst</strong>! Be honest about your budget to help us provide the best solution for you.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#FFFFFF'
              }}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
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
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#FFFFFF'
              }}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Email *
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

          {/* Company and Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#FFFFFF'
              }}>
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Optional"
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
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#FFFFFF'
              }}>
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(123) 456-7890"
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
          </div>

          {/* App Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Describe Your App Idea *
            </label>
            <textarea
              name="appDescription"
              value={formData.appDescription}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell me about your app, its purpose, and key features..."
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

          {/* Budget Range */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Budget Range * <span style={{ fontWeight: '400', fontSize: '12px', color: '#999' }}>(Be honest - helps us find the right solution)</span>
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                color: formData.budgetRange ? '#FFFFFF' : '#999',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFFFFF'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            >
              <option value="" style={{ backgroundColor: '#000000', color: '#999' }}>Select budget range</option>
              <option value="under-1k" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Under $1,000 - Quick/Simple Project</option>
              <option value="1k-3k" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>$1,000 - $3,000 - Small Project</option>
              <option value="3k-5k" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>$3,000 - $5,000 - Medium Project</option>
              <option value="5k-10k" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>$5,000 - $10,000 - Large Project</option>
              <option value="over-10k" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>$10,000+ - Premium/Enterprise</option>
              <option value="not-sure" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Not Sure - Need Consultation</option>
            </select>
          </div>

          {/* Platforms */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#FFFFFF'
            }}>
              Platform(s) Needed * <span style={{ fontWeight: '400', fontSize: '12px', color: '#999' }}>(Select all that apply)</span>
            </label>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['iOS', 'Android', 'Web'].map(platform => (
                <label key={platform} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: formData.platforms.includes(platform) ? '#FFFFFF' : '#000000',
                  color: formData.platforms.includes(platform) ? '#000000' : '#FFFFFF',
                  border: '1px solid #FFFFFF',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    style={{ margin: 0, cursor: 'pointer' }}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Timeline *
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                color: formData.timeline ? '#FFFFFF' : '#999',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFFFFF'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            >
              <option value="" style={{ backgroundColor: '#000000', color: '#999' }}>Select timeline</option>
              <option value="asap" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>ASAP - Urgent</option>
              <option value="1-2-months" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>1-2 Months</option>
              <option value="2-4-months" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>2-4 Months</option>
              <option value="4-plus-months" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>4+ Months</option>
              <option value="flexible" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Flexible - No Rush</option>
            </select>
          </div>

          {/* Has Design */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#FFFFFF'
            }}>
              Do you have existing designs? *
            </label>
            <select
              name="hasDesign"
              value={formData.hasDesign}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                color: formData.hasDesign ? '#FFFFFF' : '#999',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FFFFFF'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            >
              <option value="" style={{ backgroundColor: '#000000', color: '#999' }}>Select option</option>
              <option value="yes" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Yes - Complete designs ready</option>
              <option value="partially" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Partially - Some designs/wireframes</option>
              <option value="no" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>No - Need design help</option>
            </select>
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
              Thank you! Your submission has been received. Check your email for confirmation and I'll be in touch within 24-48 hours!
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
            {status === 'loading' ? 'Submitting...' : 'Submit Project Inquiry'}
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
          Your information is stored securely. You'll receive a confirmation email immediately.
        </p>
      </div>

      {/* Spacer for mobile to add padding below content */}
      <div style={{
        height: '100px',
        backgroundColor: '#000000'
      }}></div>

      <BottomBar activeTab="contact" />
    </div>
  );
}

export default Contact;
