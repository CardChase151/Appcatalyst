import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MessageCircle } from 'lucide-react';
import BottomBar from '../menu/bottombar';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  dateAdded: string;
}

// SEO-friendly FAQ data - Easy to add daily blog-style entries
const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'What is a Progressive Web App (PWA)?',
    answer: 'A Progressive Web App (PWA) is a type of web application that delivers an app-like experience directly through your web browser. PWAs can be installed on your device\'s home screen, work offline, send push notifications, and access device features—all without requiring App Store or Google Play approval. They\'re faster to develop, easier to maintain, and work seamlessly across iOS, Android, and desktop devices. For startups, PWAs offer a cost-effective way to reach users on all platforms with a single codebase.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '2',
    question: 'How much does it cost to build a mobile app?',
    answer: 'App development costs vary widely based on complexity. At AppCatalyst, simple sites start at $1K, while standard apps with full-stack features (user authentication, database, push notifications, and basic integrations) range from $3K-$5K. This is significantly lower than typical agency rates ($50K-$150K+) or overseas development that often lacks quality control. Custom solutions involving App Store publishing, AI integration, or admin dashboards are quoted separately based on your specific needs.',
    category: 'Pricing',
    dateAdded: '2025-01-15'
  },
  {
    id: '3',
    question: 'Do I need to publish to the App Store for my app to work on phones?',
    answer: 'No! Progressive Web Apps (PWAs) work beautifully on both iOS and Android devices without App Store submission. Users can install your PWA directly from their browser to their home screen. However, if you specifically need your app listed in the Apple App Store or Google Play Store for discoverability or business reasons, that\'s available as a custom solution. App Store publishing involves additional steps: developer accounts ($99/year for Apple, $25 one-time for Google), app review processes, compliance with store policies, and ongoing maintenance for OS updates.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '4',
    question: 'What\'s included in the standard $3K-$5K app package?',
    answer: 'The standard package includes everything most startups need: full-stack development with React/React Native, a PWA that installs like a native app on iOS and Android, backend infrastructure with database setup (typically Supabase), user authentication (login/signup/password reset), push notifications via OneSignal, and basic integrations like Stripe for payments, email services, and maps. You\'ll get a production-ready app that competes with much more expensive solutions. What\'s NOT included: App Store publishing, AI integration, and admin dashboards (those are custom solutions).',
    category: 'Pricing',
    dateAdded: '2025-01-15'
  },
  {
    id: '5',
    question: 'How long does it take to build an app?',
    answer: 'Timeline depends on complexity, but I prioritize fast turnaround. Simple sites can be completed in 1-2 weeks. Standard apps typically take 3-6 weeks from start to launch. Custom solutions with advanced features may take 8-12 weeks. I\'ve delivered 25+ apps and 30+ websites since 2019, so I have streamlined processes that keep projects moving efficiently. Fixed-price projects include clear milestones and regular updates so you always know where we stand.',
    category: 'Process',
    dateAdded: '2025-01-15'
  },
  {
    id: '6',
    question: 'Can you add AI features like ChatGPT to my app?',
    answer: 'Absolutely! AI integration is available as a custom solution. I can integrate OpenAI\'s GPT models, Claude, or other AI services depending on your needs. AI features can include chatbots, content generation, image analysis, recommendation engines, and more. Since AI integration involves variable costs (API usage), complex prompt engineering, and ongoing optimization, these projects are quoted separately. I\'ll help you understand the technical requirements and ongoing costs before we start.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  }
];

function FAQ() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Detect device and PWA mode
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs by category
  const filteredFAQs = filterCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === filterCategory);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

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
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => navigate('/projects')}
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
          ← Back to Projects
        </button>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          FAQs
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
          <MessageCircle size={48} strokeWidth={1.5} color="#FFFFFF" />
        </div>
        <h2 style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: '800',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          letterSpacing: '-1px',
          lineHeight: '1.2'
        }}>
          Frequently Asked Questions
        </h2>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#999999',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Everything you need to know about building your app with AppCatalyst
        </p>
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            style={{
              backgroundColor: filterCategory === category ? '#FFFFFF' : 'transparent',
              color: filterCategory === category ? '#000000' : '#FFFFFF',
              border: '1px solid #FFFFFF',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            style={{
              backgroundColor: '#0A0A0A',
              border: `1px solid ${openId === faq.id ? '#FFFFFF' : '#222222'}`,
              borderRadius: '12px',
              marginBottom: '16px',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'left'
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  margin: '0 0 8px 0'
                }}>
                  {faq.question}
                </h3>
                <div style={{
                  fontSize: '11px',
                  color: '#666666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {faq.category} • {new Date(faq.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <ChevronDown
                size={24}
                strokeWidth={2}
                style={{
                  color: '#FFFFFF',
                  transform: openId === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0
                }}
              />
            </button>

            {openId === faq.id && (
              <div style={{
                padding: '0 24px 24px 24px',
                borderTop: '1px solid #222222'
              }}>
                <p style={{
                  fontSize: '15px',
                  color: '#CCCCCC',
                  lineHeight: '1.8',
                  margin: '20px 0 0 0'
                }}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Have Questions CTA */}
      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        padding: '40px 20px',
        backgroundColor: '#0A0A0A',
        borderRadius: '20px',
        border: '1px solid #222222',
        maxWidth: '700px',
        margin: '60px auto 0 auto'
      }}>
        <h3 style={{
          fontSize: isMobile ? '24px' : '28px',
          fontWeight: '700',
          margin: '0 0 16px 0',
          color: '#FFFFFF'
        }}>
          Still Have Questions?
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#999999',
          margin: '0 0 24px 0',
          lineHeight: '1.6'
        }}>
          Let's chat about your project and see how I can help bring your idea to life.
        </p>
        <button
          onClick={() => navigate('/contact')}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Contact Me
        </button>
      </div>

      <BottomBar activeTab="projects" />
    </div>
  );
}

export default FAQ;
