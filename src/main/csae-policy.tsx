import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import BottomBar from '../menu/bottombar';
import SEO from '../components/SEO';

function CSAEPolicy() {
  const navigate = useNavigate();

  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  const sections = [
    {
      title: 'Our Commitment',
      content: `AppCatalyst maintains a zero-tolerance policy toward child sexual abuse and exploitation (CSAE) across all of our applications and services. We are committed to creating safe digital environments for all users, including minors.

This policy applies to all applications developed and published by AppCatalyst, including but not limited to CardChase, UniTeam, RemedyGo, and any other apps in our portfolio.`
    },
    {
      title: 'Prohibited Content and Conduct',
      content: `The following are strictly prohibited on all AppCatalyst platforms:

- Any content that sexually exploits or endangers children
- Child sexual abuse material (CSAM) of any kind, including AI-generated material
- Grooming behavior or any attempt to establish inappropriate contact with minors
- Sextortion or coercion of minors
- Trafficking of minors
- Sharing, distributing, or soliciting exploitative content involving minors
- Using our platforms to facilitate any form of child exploitation

This applies to all user-generated content including profile images, messages, posts, trades, and any other interactions within our apps.`
    },
    {
      title: 'Detection and Prevention',
      content: `We employ multiple measures to detect and prevent CSAE on our platforms:

- Content moderation systems to identify and remove prohibited material
- User reporting mechanisms accessible throughout our apps
- Account verification and age-gating measures where appropriate
- Monitoring of messaging and social features for concerning patterns
- Regular review and improvement of our safety systems

Users under 13 are required to use our apps through a parent or guardian account, in compliance with COPPA regulations.`
    },
    {
      title: 'Reporting and Response',
      content: `If you encounter any content or behavior that may involve child exploitation on our platforms:

1. Use the in-app reporting feature to flag the content or user immediately
2. Contact us directly at tradersupport@cardchase.org or chase@appcatalyst.org
3. Contact the National Center for Missing & Exploited Children (NCMEC) at CyberTipline.org or 1-800-843-5678
4. If a child is in immediate danger, call 911

When we become aware of potential CSAE content or conduct:

- We immediately remove the content and disable the offending account
- We preserve evidence as required by law
- We report to NCMEC and relevant law enforcement authorities
- We cooperate fully with any resulting investigation`
    },
    {
      title: 'Enforcement',
      content: `Violations of this policy result in immediate and permanent action:

- Immediate removal of all violating content
- Permanent ban of the offending account with no possibility of reinstatement
- Reporting to NCMEC via the CyberTipline as required by federal law (18 U.S.C. 2258A)
- Full cooperation with law enforcement investigations
- Preservation of all relevant data and evidence for authorities

We do not provide prior warning for CSAE violations. Any account found in violation is terminated immediately.`
    },
    {
      title: 'User Responsibilities',
      content: `All users of AppCatalyst applications are expected to:

- Comply with all applicable laws regarding the protection of minors
- Report any suspected child exploitation immediately using our reporting tools
- Never share, request, or distribute exploitative material involving minors
- Not engage in grooming, sextortion, or any inappropriate contact with minors
- Supervise minors who use our apps under parental accounts

Parents and guardians who create accounts for minors are responsible for monitoring their child's activity and interactions.`
    },
    {
      title: 'Legal Compliance',
      content: `AppCatalyst complies with all applicable laws and regulations regarding child safety, including:

- Children's Online Privacy Protection Act (COPPA)
- PROTECT Act
- 18 U.S.C. 2258A (mandatory reporting of CSAM to NCMEC)
- Applicable state laws regarding child protection
- Google Play and Apple App Store child safety policies

We regularly review and update our practices to align with evolving legal requirements and industry best practices.`
    },
    {
      title: 'Policy Updates',
      content: `This policy is reviewed and updated regularly to reflect changes in law, technology, and best practices. The current version is always available at this URL. Material changes will be communicated through our apps and updated on this page.`
    },
    {
      title: 'Contact',
      content: `For questions about this policy or to report a concern:

tradersupport@cardchase.org
chase@appcatalyst.org

AppCatalyst
Chase Kellis
Huntington Beach, CA`
    }
  ];

  return (
    <>
    <SEO
      title="CSAE Policy"
      description="AppCatalyst child safety and anti-exploitation policy. Zero tolerance for CSAE across all applications."
      path="/csae-policy"
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
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => navigate('/privacy')}
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
          &#8592; Privacy
        </button>

        <h1 style={{
          fontSize: isMobile ? '20px' : '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Child Safety
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
          <ShieldCheck size={48} strokeWidth={1.5} color="#22c55e" />
        </div>
        <h2 style={{
          fontSize: isMobile ? '28px' : '44px',
          fontWeight: '800',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          letterSpacing: '-1px',
          lineHeight: '1.2'
        }}>
          Standards Against Child Sexual Abuse and Exploitation
        </h2>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#999999',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          AppCatalyst's commitment to child safety across all our applications
        </p>
        <p style={{
          fontSize: '13px',
          color: '#666666',
          marginTop: '12px'
        }}>
          Effective Date: February 14, 2026
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
    </>
  );
}

export default CSAEPolicy;
