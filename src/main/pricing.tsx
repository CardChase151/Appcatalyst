import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Rocket, Zap, DollarSign, Globe, TrendingUp, Clock } from 'lucide-react';
import BottomBar from '../menu/bottombar';

function Pricing() {
  const navigate = useNavigate();

  // Detect device and PWA mode
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingTop: isPWA ? 'max(env(safe-area-inset-top), 20px)' : '20px',
      paddingBottom: '120px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
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
          Pricing
        </h1>
      </header>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '40px 20px'
      }}>
        <h2 style={{
          fontSize: isMobile ? '36px' : '56px',
          fontWeight: '800',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          letterSpacing: '-2px',
          lineHeight: '1.1'
        }}>
          Be The Catalyst
        </h2>
        <p style={{
          fontSize: isMobile ? '18px' : '24px',
          color: '#999999',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Empowering startups and small businesses with affordable, world-class app development
        </p>
      </div>

      {/* Mission Statement */}
      <div style={{
        backgroundColor: '#0A0A0A',
        borderRadius: '20px',
        padding: isMobile ? '30px 20px' : '50px 40px',
        marginBottom: '40px',
        border: '1px solid #222222',
        maxWidth: '1000px',
        margin: '0 auto 40px auto'
      }}>
        <h3 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '700',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          My Mission
        </h3>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#CCCCCC',
          lineHeight: '1.8',
          margin: '0 0 20px 0',
          textAlign: 'center'
        }}>
          I'm here to be the <strong style={{ color: '#FFFFFF' }}>catalyst for new companies and startups</strong>.
          While senior developers typically charge $100-150 per hour, I believe in making quality app development
          accessible to <strong style={{ color: '#FFFFFF' }}>small businesses and emerging startups</strong>.
        </p>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#CCCCCC',
          lineHeight: '1.8',
          margin: 0,
          textAlign: 'center'
        }}>
          My goal is to help you compete globally with <strong style={{ color: '#FFFFFF' }}>affordable,
          fixed-price solutions</strong> that rival overseas development—without sacrificing quality or communication.
        </p>
      </div>

      {/* Pricing Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto 60px auto'
      }}>
        {/* Standard Sites */}
        <div style={{
          backgroundColor: '#0A0A0A',
          borderRadius: '20px',
          padding: '40px 30px',
          border: '2px solid #222222',
          transition: 'all 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#FFFFFF';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#222222';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{
            marginBottom: '16px',
            color: '#FFFFFF'
          }}>
            <Briefcase size={48} strokeWidth={1.5} />
          </div>
          <h4 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            color: '#FFFFFF'
          }}>
            Simple Sites
          </h4>
          <div style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#FFFFFF',
            margin: '16px 0'
          }}>
            $1K
          </div>
          <p style={{
            fontSize: '14px',
            color: '#999999',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            One-time fixed price
          </p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '14px',
            color: '#CCCCCC',
            lineHeight: '2'
          }}>
            <li>✓ Basic website design</li>
            <li>✓ Responsive mobile layout</li>
            <li>✓ Fast deployment</li>
            <li>✓ SEO optimized</li>
          </ul>

          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #222222'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#666666',
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Examples:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://freeqrcoding.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid #333333',
                  transition: 'all 0.2s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = '#333333';
                }}
              >
                freeqrcoding.com →
              </a>
              <a
                href="https://realprayermovement.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid #333333',
                  transition: 'all 0.2s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = '#333333';
                }}
              >
                realprayermovement.com →
              </a>
            </div>
          </div>
        </div>

        {/* Standard Apps */}
        <div style={{
          backgroundColor: '#0A0A0A',
          borderRadius: '20px',
          padding: '40px 30px',
          border: '2px solid #FFFFFF',
          transition: 'all 0.3s ease',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Most Popular
          </div>
          <div style={{
            marginBottom: '16px',
            color: '#FFFFFF'
          }}>
            <Rocket size={48} strokeWidth={1.5} />
          </div>
          <h4 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            color: '#FFFFFF'
          }}>
            Standard Apps
          </h4>
          <div style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#FFFFFF',
            margin: '16px 0'
          }}>
            $3K-$5K
          </div>
          <p style={{
            fontSize: '14px',
            color: '#999999',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            90%+ of my projects • Fixed price
          </p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '14px',
            color: '#CCCCCC',
            lineHeight: '2'
          }}>
            <li>✓ Full-stack app development</li>
            <li>✓ iOS & Android ready</li>
            <li>✓ Backend & database setup</li>
            <li>✓ User authentication</li>
            <li>✓ Push notifications</li>
            <li>✓ Compete with overseas quality</li>
          </ul>

          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #FFFFFF'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#CCCCCC',
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Examples:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://cardchase.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#000000',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '6px',
                  border: '1px solid #FFFFFF',
                  transition: 'all 0.2s ease',
                  display: 'block',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                cardchase.org →
              </a>
              <a
                href="http://appcatalyst.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#000000',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '6px',
                  border: '1px solid #FFFFFF',
                  transition: 'all 0.2s ease',
                  display: 'block',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                appcatalyst.org →
              </a>
            </div>
          </div>
        </div>

        {/* Enterprise */}
        <div style={{
          backgroundColor: '#0A0A0A',
          borderRadius: '20px',
          padding: '40px 30px',
          border: '2px solid #222222',
          transition: 'all 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#FFFFFF';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#222222';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{
            marginBottom: '16px',
            color: '#FFFFFF'
          }}>
            <Zap size={48} strokeWidth={1.5} />
          </div>
          <h4 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            color: '#FFFFFF'
          }}>
            Custom Solutions
          </h4>
          <div style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#FFFFFF',
            margin: '16px 0'
          }}>
            Custom
          </div>
          <p style={{
            fontSize: '14px',
            color: '#999999',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            Let's discuss your needs
          </p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '14px',
            color: '#CCCCCC',
            lineHeight: '2'
          }}>
            <li>✓ Complex integrations</li>
            <li>✓ Scalable architecture</li>
            <li>✓ Advanced features</li>
            <li>✓ Ongoing support</li>
            <li>✓ Team collaboration</li>
          </ul>

          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #222222'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#666666',
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Examples:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://narcotictrack.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid #333333',
                  transition: 'all 0.2s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = '#333333';
                }}
              >
                narcotictrack.com →
              </a>
              <a
                href="https://apps.apple.com/us/developer/chase-kellis/id1590860407"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid #333333',
                  transition: 'all 0.2s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = '#333333';
                }}
              >
                App Store Developer Profile →
              </a>
            </div>
            <p style={{
              fontSize: '11px',
              color: '#666666',
              margin: '12px 0 0 0',
              fontStyle: 'italic',
              lineHeight: '1.5'
            }}>
              Note: These are proprietary applications built for private companies with internal-only access.
            </p>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div style={{
        backgroundColor: '#0A0A0A',
        borderRadius: '20px',
        padding: isMobile ? '30px 20px' : '40px',
        border: '1px solid #222222',
        maxWidth: '1000px',
        margin: '0 auto 40px auto'
      }}>
        <h3 style={{
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: '700',
          margin: '0 0 24px 0',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          Why Choose AppCatalyst?
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <DollarSign size={20} strokeWidth={2} /> Affordable Development
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#999999',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Low-cost app builds designed for startups and small businesses. Fixed pricing means no surprises.
            </p>
          </div>
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Globe size={20} strokeWidth={2} /> Global Competition
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#999999',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Compete with overseas development prices while maintaining US-based quality and communication.
            </p>
          </div>
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <TrendingUp size={20} strokeWidth={2} /> Startup Focused
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#999999',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Built specifically for new companies looking to launch fast without breaking the bank.
            </p>
          </div>
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Clock size={20} strokeWidth={2} /> Fast Turnaround
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#999999',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Proven track record: 25+ apps, 30+ websites delivered since 2019.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h3 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '700',
          margin: '0 0 16px 0',
          color: '#FFFFFF'
        }}>
          Ready to Launch Your Idea?
        </h3>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#999999',
          margin: '0 0 32px 0',
          lineHeight: '1.6'
        }}>
          Let's discuss how we can bring your app or website to life at a price that works for your startup.
        </p>
        <button
          onClick={() => navigate('/contact')}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: 'none',
            padding: '16px 48px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Get In Touch
        </button>
      </div>

      <BottomBar activeTab="pricing" />
    </div>
  );
}

export default Pricing;
