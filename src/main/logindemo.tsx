import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Key, Mail, Database, ChevronDown, Bell } from 'lucide-react';
import BottomBar from '../menu/bottombar';

type DemoScreen = 'overview' | 'login' | 'signup' | 'forgot' | 'email-verify' | 'supabase' | 'push';

function LoginDemo() {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<DemoScreen>('overview');
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  // Push notification state
  const [pushBody, setPushBody] = useState('');
  const [pushSending, setPushSending] = useState(false);
  const [pushMessage, setPushMessage] = useState('');

  const capabilities = [
    {
      id: 'supabase',
      title: 'Supabase Integration',
      description: 'Full-stack authentication with PostgreSQL database, real-time subscriptions, and row-level security.',
      icon: Database,
      color: '#3ECF8E'
    },
    {
      id: 'login',
      title: 'Login Flows',
      description: 'Email/password authentication, social logins (Google, Apple), and magic link authentication.',
      icon: LogIn,
      color: '#FF6B6B'
    },
    {
      id: 'signup',
      title: 'User Registration',
      description: 'Secure signup with validation, password strength meters, and terms acceptance.',
      icon: UserPlus,
      color: '#4ECDC4'
    },
    {
      id: 'forgot',
      title: 'Password Reset',
      description: 'Secure password recovery via email with token validation and expiration.',
      icon: Key,
      color: '#FFE66D'
    },
    {
      id: 'email-verify',
      title: 'Email Verification',
      description: 'Automated email verification with resend functionality and expiring verification links.',
      icon: Mail,
      color: '#A8DADC'
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'OneSignal integration for iOS and Android push notifications. Test sending notifications to your device.',
      icon: Bell,
      color: '#9B59B6'
    }
  ];

  const renderOverview = () => (
    <div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            onClick={() => setActiveScreen(cap.id as DemoScreen)}
            style={{
              backgroundColor: '#0A0A0A',
              border: '1px solid #1A1A1A',
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = cap.color;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${cap.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              marginBottom: '12px',
              color: cap.color
            }}>
              <cap.icon size={32} strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 8px 0',
              color: '#FFFFFF'
            }}>
              {cap.title}
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#CCCCCC',
              lineHeight: '1.5',
              margin: 0
            }}>
              {cap.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #1A1A1A',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 16px 0',
          color: '#FFFFFF'
        }}>
          Tech Stack
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {['Supabase', 'PostgreSQL', 'React Native', 'TypeScript', 'JWT', 'OAuth 2.0', 'Row Level Security', 'Real-time Subscriptions'].map((tech) => (
            <span
              key={tech}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSupabaseDemo = () => (
    <div>
      <button
        onClick={() => setActiveScreen('overview')}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #333333',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <Database size={28} strokeWidth={1.5} color="#3ECF8E" />
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Supabase Integration
        </h2>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #3ECF8E',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 16px 0',
          color: '#3ECF8E'
        }}>
          Configuration Example
        </h3>
        <pre style={{
          backgroundColor: '#000000',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '12px',
          color: '#CCCCCC',
          fontFamily: 'Monaco, Courier, monospace'
        }}>
{`import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

// Authentication
const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// Real-time subscriptions
supabase
  .from('profiles')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()`}
        </pre>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '16px'
      }}>
        <div style={{
          backgroundColor: '#0A0A0A',
          border: '1px solid #1A1A1A',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#FFFFFF'
          }}>
            ✅ Features Implemented
          </h4>
          <ul style={{
            fontSize: '13px',
            color: '#CCCCCC',
            lineHeight: '1.8',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li>Row-level security policies</li>
            <li>Database triggers & functions</li>
            <li>Real-time data sync</li>
            <li>File storage & CDN</li>
            <li>Edge functions</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#0A0A0A',
          border: '1px solid #1A1A1A',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#FFFFFF'
          }}>
            🛡️ Security Best Practices
          </h4>
          <ul style={{
            fontSize: '13px',
            color: '#CCCCCC',
            lineHeight: '1.8',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li>Environment variables</li>
            <li>API key rotation</li>
            <li>SQL injection prevention</li>
            <li>JWT token validation</li>
            <li>CORS configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderLoginDemo = () => (
    <div>
      <button
        onClick={() => setActiveScreen('overview')}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #333333',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <LogIn size={28} strokeWidth={1.5} color="#FF6B6B" />
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Login Flow Implementation
        </h2>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #1A1A1A',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 24px 0',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            Welcome Back
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#CCCCCC',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#CCCCCC',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '12px'
          }}>
            Sign In
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#999999'
          }}>
            <button type="button" style={{ color: '#FFFFFF', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>Forgot password?</button>
          </div>

          <div style={{
            margin: '24px 0',
            textAlign: 'center',
            color: '#666666',
            fontSize: '12px'
          }}>
            OR
          </div>

          <button style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            Continue with Google
          </button>

          <button style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            Continue with Apple
          </button>
        </div>
      </div>

      <p style={{
        fontSize: '12px',
        color: '#666666',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        * Interactive demo - inputs are non-functional
      </p>
    </div>
  );

  const renderSignupDemo = () => (
    <div>
      <button
        onClick={() => setActiveScreen('overview')}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #333333',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <UserPlus size={28} strokeWidth={1.5} color="#4ECDC4" />
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: 0,
          color: '#FFFFFF'
        }}>
          User Registration
        </h2>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #1A1A1A',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 24px 0',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            Create Account
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#CCCCCC',
              marginBottom: '6px'
            }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#CCCCCC',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#CCCCCC',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <div style={{
              marginTop: '8px',
              display: 'flex',
              gap: '4px'
            }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '4px',
                    backgroundColor: i <= 2 ? '#FFE66D' : '#1A1A1A',
                    borderRadius: '2px'
                  }}
                />
              ))}
            </div>
            <p style={{
              fontSize: '11px',
              color: '#999999',
              margin: '4px 0 0 0'
            }}>
              Password strength: Medium
            </p>
          </div>

          <div style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              type="checkbox"
              id="terms"
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="terms"
              style={{
                fontSize: '12px',
                color: '#CCCCCC',
                cursor: 'pointer'
              }}
            >
              I agree to the Terms & Conditions
            </label>
          </div>

          <button style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '12px'
          }}>
            Create Account
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#999999'
          }}>
            Already have an account? <button type="button" style={{ color: '#FFFFFF', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>Sign In</button>
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '12px',
        color: '#666666',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        * Interactive demo - inputs are non-functional
      </p>
    </div>
  );

  const renderForgotDemo = () => (
    <div>
      <button
        onClick={() => setActiveScreen('overview')}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #333333',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <Key size={28} strokeWidth={1.5} color="#FFE66D" />
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Password Reset Flow
        </h2>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #1A1A1A',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            Reset Password
          </h3>

          <p style={{
            fontSize: '13px',
            color: '#999999',
            textAlign: 'center',
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            Enter your email and we'll send you a link to reset your password
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#CCCCCC',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '12px'
          }}>
            Send Reset Link
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#999999'
          }}>
            <button type="button" style={{ color: '#FFFFFF', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>← Back to login</button>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #FFE66D',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          margin: '0 0 12px 0',
          color: '#FFE66D'
        }}>
          Implementation Details
        </h4>
        <ul style={{
          fontSize: '13px',
          color: '#CCCCCC',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px'
        }}>
          <li>Secure token generation with expiration</li>
          <li>Email templating and delivery</li>
          <li>Rate limiting to prevent abuse</li>
          <li>Token validation and single-use enforcement</li>
          <li>Password strength requirements</li>
        </ul>
      </div>
    </div>
  );

  const renderEmailVerifyDemo = () => (
    <div>
      <button
        onClick={() => setActiveScreen('overview')}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #333333',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <Mail size={28} strokeWidth={1.5} color="#A8DADC" />
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Email Verification
        </h2>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #1A1A1A',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            marginBottom: '20px',
            color: '#A8DADC'
          }}>
            <Mail size={48} strokeWidth={1.5} />
          </div>

          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#FFFFFF'
          }}>
            Check Your Email
          </h3>

          <p style={{
            fontSize: '13px',
            color: '#999999',
            lineHeight: '1.6',
            margin: '0 0 24px 0'
          }}>
            We've sent a verification link to<br />
            <span style={{ color: '#FFFFFF', fontWeight: '600' }}>user@example.com</span>
          </p>

          <div style={{
            backgroundColor: '#000000',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#CCCCCC',
              margin: '0 0 12px 0',
              lineHeight: '1.5'
            }}>
              Click the link in your email to verify your account. The link will expire in 24 hours.
            </p>
            <div style={{
              fontSize: '11px',
              color: '#666666'
            }}>
              Didn't receive the email? Check your spam folder
            </div>
          </div>

          <button style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '8px'
          }}>
            Resend Verification Email
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#999999',
            marginTop: '16px'
          }}>
            <button type="button" style={{ color: '#FFFFFF', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>← Back to login</button>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#0A0A0A',
        border: '1px solid #A8DADC',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          margin: '0 0 12px 0',
          color: '#A8DADC'
        }}>
          Email Flow Features
        </h4>
        <ul style={{
          fontSize: '13px',
          color: '#CCCCCC',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '20px'
        }}>
          <li>Automated email sending via SendGrid/AWS SES</li>
          <li>Custom HTML email templates</li>
          <li>Resend functionality with cooldown</li>
          <li>Link expiration handling</li>
          <li>Account status tracking</li>
        </ul>
      </div>
    </div>
  );

  const sendTestNotification = async () => {
    if (!pushBody) {
      setPushMessage('Please enter a message');
      return;
    }

    setPushSending(true);
    setPushMessage('');

    try {
      // @ts-ignore - OneSignal is loaded globally
      if (!window.OneSignal) {
        throw new Error('OneSignal not initialized');
      }

      // @ts-ignore - Get player ID from OneSignal v16 API
      const playerId = await window.OneSignal.User.PushSubscription.id;

      if (!playerId) {
        setPushMessage('Please subscribe to notifications first (click the bell icon)');
        setPushSending(false);
        return;
      }

      // Send notification using OneSignal API
      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic os_v2_app_hvaeqga6tjby3huezhgp2oalpxuxwn7g2dvejlvvr2hhkfxddhvkek43izmd6npb5dmigxw3xrawew633rinyo3ufiljscqiqbgz37a'
        },
        body: JSON.stringify({
          app_id: '3d404818-1e9a-438d-9e84-c9ccfd380b7d',
          include_player_ids: [playerId],
          headings: { en: 'Notification' },
          contents: { en: pushBody }
        })
      });

      if (response.ok) {
        setPushMessage('✅ Notification sent successfully!');
        setPushBody('');
      } else {
        setPushMessage('❌ Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setPushMessage('❌ Error: ' + (error as Error).message);
    } finally {
      setPushSending(false);
    }
  };

  const renderPushDemo = () => {

    return (
      <div>
        <button
          onClick={() => setActiveScreen('overview')}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #333333',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <Bell size={28} strokeWidth={1.5} color="#9B59B6" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            color: '#FFFFFF'
          }}>
            Push Notifications Test
          </h2>
        </div>

        <div style={{
          backgroundColor: '#0A0A0A',
          border: '1px solid #1A1A1A',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px'
        }}>
          <div style={{
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#FFFFFF',
              textAlign: 'center'
            }}>
              Send Test Notification
            </h3>

            <p style={{
              fontSize: '13px',
              color: '#999999',
              textAlign: 'center',
              margin: '0 0 24px 0'
            }}>
              Will display as: <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Notification from AppCatalyst</span>
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#CCCCCC',
                marginBottom: '6px'
              }}>
                Message
              </label>
              <textarea
                value={pushBody}
                onChange={(e) => setPushBody(e.target.value)}
                placeholder="Enter your notification message here..."
                style={{
                  width: '100%',
                  backgroundColor: '#000000',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              onClick={sendTestNotification}
              disabled={pushSending}
              style={{
                width: '100%',
                backgroundColor: '#9B59B6',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: pushSending ? 'not-allowed' : 'pointer',
                opacity: pushSending ? 0.6 : 1,
                marginBottom: '12px'
              }}
            >
              {pushSending ? 'Sending...' : 'Send to My Device'}
            </button>

            {pushMessage && (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: pushMessage.includes('✅') ? '#1A4D2E' : '#4D1A1A',
                border: `1px solid ${pushMessage.includes('✅') ? '#2ECC71' : '#E74C3C'}`,
                color: '#FFFFFF',
                fontSize: '13px',
                textAlign: 'center'
              }}>
                {pushMessage}
              </div>
            )}
          </div>
        </div>

        <div style={{
          backgroundColor: '#0A0A0A',
          border: '1px solid #9B59B6',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#9B59B6'
          }}>
            How It Works
          </h4>
          <ul style={{
            fontSize: '13px',
            color: '#CCCCCC',
            lineHeight: '1.8',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li>OneSignal SDK sends notifications to subscribed devices</li>
            <li>Works on iOS (Safari/PWA) and Android (Chrome/PWA)</li>
            <li>User must grant notification permission first</li>
            <li>Notifications delivered even when app is closed</li>
            <li>Test sends only to your subscribed device</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingTop: isPWA ? 'max(env(safe-area-inset-top), 20px)' : '20px',
      paddingBottom: '100px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
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
          ← Back
        </button>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Auth
        </h1>
      </header>

      {activeScreen === 'overview' && (
        <div
          className="breathe-box"
          style={{
            backgroundColor: '#0A0A0A',
            border: '1px solid #FFFFFF',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '20px',
            animation: 'breathe 2s ease-in-out infinite'
          }}
        >
          <style>
            {`
              @keyframes breathe {
                0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
                50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
              }
            `}
          </style>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <ChevronDown size={20} strokeWidth={2.5} color="#FFFFFF" />
            <p style={{
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '600',
              margin: 0
            }}>
              Click on any card below to see interactive demos
            </p>
            <ChevronDown size={20} strokeWidth={2.5} color="#FFFFFF" />
          </div>
        </div>
      )}

      {activeScreen === 'overview' && renderOverview()}
      {activeScreen === 'supabase' && renderSupabaseDemo()}
      {activeScreen === 'login' && renderLoginDemo()}
      {activeScreen === 'signup' && renderSignupDemo()}
      {activeScreen === 'forgot' && renderForgotDemo()}
      {activeScreen === 'email-verify' && renderEmailVerifyDemo()}
      {activeScreen === 'push' && renderPushDemo()}

      <BottomBar activeTab="login-demo" />
    </div>
  );
}

export default LoginDemo;
