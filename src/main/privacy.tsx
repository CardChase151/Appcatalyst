import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import BottomBar from '../menu/bottombar';

function Privacy() {
  const navigate = useNavigate();

  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect minimal information necessary to provide our services. This may include:

Account information: Name, email address, and password when you create an account.

Usage data: Anonymous analytics such as pages visited, features used, and general device information (device type, operating system, browser).

User-generated content: Any data you voluntarily enter into the app (e.g., saved items, preferences, form submissions).

We do not collect sensitive personal information such as Social Security numbers, financial account details, or precise geolocation unless explicitly required by the app's functionality and disclosed to you.`
    },
    {
      title: 'How We Use Your Information',
      content: `We use collected information to:

- Provide and maintain the app's core functionality
- Authenticate your identity and secure your account
- Send transactional communications (password resets, account confirmations)
- Improve app performance and fix bugs
- Respond to support requests

We do not sell, rent, or share your personal information with third parties for marketing purposes.`
    },
    {
      title: 'Third-Party Services',
      content: `Our apps may use the following third-party services that have their own privacy policies:

Supabase: Database and authentication infrastructure. Data is stored securely with row-level security and encryption at rest.

OneSignal: Push notification delivery. Receives device tokens to send notifications you have opted into.

Stripe: Payment processing (where applicable). Payment information is handled directly by Stripe and never stored on our servers.

Netlify/Vercel: Hosting and deployment. Standard server logs may be collected.

We encourage you to review the privacy policies of these services.`
    },
    {
      title: 'Data Storage and Security',
      content: `Your data is stored on secure, encrypted servers provided by Supabase (powered by AWS). We implement industry-standard security measures including:

- Encrypted data transmission (HTTPS/TLS)
- Encrypted data at rest
- Row-level security policies on all database tables
- Secure authentication with hashed passwords
- Regular security updates and dependency monitoring

While we take reasonable measures to protect your data, no method of electronic transmission or storage is 100% secure.`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

- Access the personal data we hold about you
- Request correction of inaccurate data
- Request deletion of your account and associated data
- Export your data in a portable format
- Opt out of non-essential communications

To exercise any of these rights, contact us at chase@appcatalyst.org. We will respond within 30 days.`
    },
    {
      title: 'Cookies and Tracking',
      content: `Our web apps may use essential cookies for authentication and session management. We do not use tracking cookies for advertising purposes.

If analytics are implemented, we use privacy-respecting, anonymous usage data to understand how the app is used and improve the experience.`
    },
    {
      title: 'Children\'s Privacy',
      content: `Our apps are not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal data, please contact us and we will promptly delete it.`
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the app after changes constitutes acceptance of the updated policy.`
    },
    {
      title: 'Contact',
      content: `If you have questions about this privacy policy or how your data is handled, contact us at:

chase@appcatalyst.org

AppCatalyst
Chase Kellis`
    }
  ];

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
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#333333';
          }}
        >
          ← Home
        </button>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Privacy
        </h1>
      </header>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <Shield size={48} strokeWidth={1.5} color="#FFFFFF" />
        </div>
        <h2 style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: '800',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          letterSpacing: '-1px',
          lineHeight: '1.2'
        }}>
          Privacy Policy
        </h2>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#999999',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          How AppCatalyst apps handle your data
        </p>
        <p style={{
          fontSize: '13px',
          color: '#666666',
          marginTop: '12px'
        }}>
          Effective Date: February 13, 2026
        </p>
      </div>

      {/* Intro */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 40px auto'
      }}>
        <p style={{
          fontSize: '15px',
          color: '#CCCCCC',
          lineHeight: '1.8',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          This privacy policy applies to all applications developed and published by AppCatalyst, including but not limited to UniTeam, CardChase, RemedyGo, and any other apps listed on our portfolio. Your privacy matters to us and we are committed to being transparent about how we handle your data.
        </p>
      </div>

      {/* Policy Sections */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#0A0A0A',
              border: '1px solid #222222',
              borderRadius: '12px',
              marginBottom: '16px',
              padding: '24px',
              transition: 'all 0.3s ease'
            }}
          >
            <h3 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '700',
              color: '#FFFFFF',
              margin: '0 0 16px 0'
            }}>
              {section.title}
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#CCCCCC',
              lineHeight: '1.8',
              margin: 0,
              whiteSpace: 'pre-line'
            }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <BottomBar activeTab="projects" />
    </div>
  );
}

export default Privacy;
