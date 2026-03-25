import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import BottomBar from '../menu/bottombar';
import SEO from '../components/SEO';

function Terms() {
  const navigate = useNavigate();

  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using any application developed by App Catalyst LLC ("we," "us," or "our"), including but not limited to Base Shop, BiltBase, UniTeam, CardChase, RemedyGo, and any other apps listed on our portfolio, you agree to be bound by these Terms and Conditions. If you do not agree, do not use the application.`
    },
    {
      title: 'Use of the Application',
      content: `You agree to use the application only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account credentials. You must not:

- Use the app in any way that violates applicable laws or regulations
- Attempt to gain unauthorized access to any part of the app or its systems
- Use the app to transmit harmful, offensive, or inappropriate content
- Interfere with or disrupt the app's functionality or infrastructure
- Reverse engineer, decompile, or disassemble any part of the application`
    },
    {
      title: 'Accounts and Registration',
      content: `Some features require you to create an account. You agree to provide accurate and complete information during registration. You are solely responsible for all activity that occurs under your account. You must notify us immediately of any unauthorized use of your account.

We reserve the right to suspend or terminate accounts that violate these terms or are inactive for extended periods.`
    },
    {
      title: 'Organization Content',
      content: `If you are an organization owner or administrator, you are responsible for all content uploaded, shared, or distributed through your organization within the app. This includes training materials, documents, media, and any other content.

You represent that you have the right to use and distribute such content and that it does not infringe on any third-party intellectual property rights. We are not responsible for the accuracy, legality, or appropriateness of user-generated or organization-uploaded content.`
    },
    {
      title: 'Subscriptions and Payments',
      content: `Certain features may require a paid subscription. By subscribing, you agree to pay all applicable fees. Subscriptions automatically renew unless canceled before the renewal date. All payments are processed securely through Stripe. We do not store your payment information on our servers.

Refunds are handled on a case-by-case basis. Contact us at chase@appcatalyst.org for billing inquiries.`
    },
    {
      title: 'Intellectual Property',
      content: `The application, including its design, code, features, and branding, is the property of App Catalyst LLC and is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works based on the application without our written consent.

Content you upload remains yours. By uploading content, you grant us a limited license to store, display, and distribute it within the application as necessary to provide the service.`
    },
    {
      title: 'Limitation of Liability',
      content: `The application is provided "as is" without warranties of any kind, either express or implied. We do not guarantee uninterrupted or error-free operation.

To the fullest extent permitted by law, App Catalyst LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the application.

Our total liability for any claim related to the application shall not exceed the amount you paid us in the 12 months preceding the claim.`
    },
    {
      title: 'Termination',
      content: `We may suspend or terminate your access to the application at any time, with or without cause, and with or without notice. Upon termination, your right to use the application ceases immediately. Provisions that by their nature should survive termination will remain in effect.`
    },
    {
      title: 'Changes to Terms',
      content: `We may update these terms from time to time. Changes will be posted on this page with an updated effective date. Continued use of the application after changes constitutes acceptance of the updated terms.`
    },
    {
      title: 'Governing Law',
      content: `These terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Orange County, California.`
    },
    {
      title: 'Contact',
      content: `If you have questions about these terms, contact us at:

chase@appcatalyst.org

App Catalyst LLC
Costa Mesa, CA`
    }
  ];

  return (
    <>
    <SEO
      title="Terms and Conditions"
      description="AppCatalyst terms and conditions for use of our applications and services."
      path="/terms"
    />
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingTop: isPWA ? 'max(env(safe-area-inset-top), 20px)' : '20px',
      paddingBottom: '120px',
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
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333333'; }}
        >
          &larr; Home
        </button>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Terms
        </h1>
      </header>

      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '40px 20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <FileText size={48} strokeWidth={1.5} color="#FFFFFF" />
        </div>
        <h2 style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: '800',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          letterSpacing: '-1px',
          lineHeight: '1.2'
        }}>
          Terms &amp; Conditions
        </h2>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#999999',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Terms of use for AppCatalyst applications
        </p>
        <p style={{
          fontSize: '13px',
          color: '#666666',
          marginTop: '12px'
        }}>
          Effective Date: March 18, 2026
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
    </>
  );
}

export default Terms;
