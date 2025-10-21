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

// SEO-friendly FAQ data - Comprehensive answers to common app development questions
const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'What is a Progressive Web App (PWA) and how is it different from a native app?',
    answer: 'A Progressive Web App (PWA) is a web application that delivers an app-like experience through your browser. PWAs can be installed on your device\'s home screen, work offline, send push notifications, and access device features—all without App Store approval. The key differences: PWAs work across iOS, Android, and desktop with one codebase, install instantly from your website (no app store downloads), update automatically without user action, and cost 50-70% less to develop. Native apps require separate development for iOS and Android, go through lengthy app store approval processes, and need user permission for updates. For most startups and small businesses, PWAs offer the perfect balance of functionality and affordability.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '2',
    question: 'How much does it cost to build a mobile app in 2025?',
    answer: 'App development costs vary dramatically. Large agencies charge $50K-$150K+ for standard apps. Overseas developers offer $10K-$30K but often have quality and communication issues. At AppCatalyst, I offer startup-friendly fixed pricing: simple websites start at $1K, standard apps with authentication, database, push notifications, and basic integrations (Stripe, email, maps) range from $3K-$5K. This includes a PWA that works on iOS and Android. Custom solutions (App Store publishing, AI integration, admin dashboards, complex enterprise features) are quoted separately. My pricing model targets startups and small businesses who need professional quality at affordable rates—competing with overseas prices while maintaining US-based communication and quality standards.',
    category: 'Pricing',
    dateAdded: '2025-01-15'
  },
  {
    id: '3',
    question: 'Do I need to publish to the Apple App Store and Google Play Store?',
    answer: 'Not necessarily! Progressive Web Apps (PWAs) work perfectly on both iOS and Android without any app store submission. Users install your PWA directly from Safari or Chrome to their home screen—it looks and functions exactly like a native app. However, you might want App Store publishing if: 1) You need visibility in app store search results for user discovery, 2) Your business model requires in-app purchases through Apple/Google, 3) You need access to advanced native features not available in PWAs, or 4) Your target audience expects to find you in app stores. App Store publishing adds significant cost and complexity: $99/year for Apple Developer Program, $25 one-time for Google Play, weeks of review processes, strict compliance requirements, and ongoing maintenance for OS updates. This is why I offer it as a custom solution rather than standard pricing.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '4',
    question: 'What exactly is included in your $3K-$5K standard app package?',
    answer: 'The standard package includes everything most startups need to launch: Full-stack development using React for web and React Native for mobile, a Progressive Web App that installs on iOS and Android home screens, complete backend infrastructure with database setup (typically Supabase for real-time features and PostgreSQL database), user authentication system (email/password login, signup, password reset, session management), push notifications via OneSignal for both iOS and Android, basic third-party integrations like Stripe for payments, SendGrid/Mailgun for email, Google Maps for location features, responsive design that works on all screen sizes, and deployment to production servers. What\'s NOT included: App Store/Google Play submission and approval process, AI integration (ChatGPT, Claude, etc.), admin dashboards with team management and role-based permissions, complex enterprise integrations, and ongoing monthly maintenance (available separately). You get a complete, production-ready app at a fixed price.',
    category: 'Pricing',
    dateAdded: '2025-01-15'
  },
  {
    id: '5',
    question: 'How long does it take to build and launch an app?',
    answer: 'Timeline depends on complexity and your responsiveness to feedback. Simple landing pages and basic websites: 1-2 weeks from start to launch. Standard apps (authentication, database, 3-5 core features): 3-6 weeks including design, development, testing, and deployment. Custom solutions with App Store publishing: 8-12 weeks due to additional development, testing, and app review processes. I\'ve delivered 25+ apps and 30+ websites since 2019, so I have efficient workflows. My process includes: Week 1 - Requirements gathering and design mockups, Weeks 2-4 - Core development and weekly progress updates, Week 5 - Testing and refinements based on your feedback, Week 6 - Final deployment and training. Fixed-price projects include clear milestones so you always know progress. The biggest factor in timeline is your availability for feedback—quick responses keep projects moving smoothly.',
    category: 'Process',
    dateAdded: '2025-01-15'
  },
  {
    id: '6',
    question: 'Can you integrate AI features like ChatGPT into my app?',
    answer: 'Yes! AI integration is available as a custom solution. I can integrate various AI services: OpenAI\'s GPT-4 for chatbots and text generation, Claude for advanced reasoning and analysis, image generation APIs like DALL-E or Midjourney, speech-to-text and text-to-speech services, recommendation engines, and sentiment analysis. Common AI features I build include: customer service chatbots that answer questions 24/7, content generation tools for marketing or productivity, image analysis for e-commerce or healthcare apps, personalized recommendations based on user behavior, and automated data analysis and insights. AI integration is quoted separately because costs vary significantly—API usage fees can range from pennies to hundreds per month depending on your user volume, prompt engineering requires careful optimization to get quality responses, and each AI feature needs thorough testing to ensure reliability. I\'ll help you understand both development costs and ongoing API expenses before starting.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '7',
    question: 'What technology stack do you use and why does it matter?',
    answer: 'I use modern, proven technologies that balance performance, cost, and maintainability: React and React Native for frontend (one codebase works on web, iOS, and Android), Supabase for backend (PostgreSQL database, real-time subscriptions, authentication, file storage—all in one platform), TypeScript for type safety and fewer bugs, Vercel or Netlify for web hosting with automatic scaling, OneSignal for push notifications across all platforms. Why this matters to you: Lower costs—open-source tools mean no expensive licensing, faster development—mature ecosystems with pre-built components, easier hiring—if you need another developer later, these are popular skills, better performance—modern tools are optimized for speed, and future-proof—actively maintained with regular updates. I avoid proprietary or outdated technologies that lock you into expensive vendors or make future updates difficult. You own all the code and can move to any hosting provider.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '8',
    question: 'What happens after my app launches? Do you offer maintenance and support?',
    answer: 'After launch, you have several options. Included in your fixed price: 30 days of bug fixes for any issues found after launch, deployment to your hosting environment, and basic documentation on how to use your app. Not included but available: Ongoing maintenance plans ($200-500/month depending on app complexity) covering server monitoring, security updates, dependency updates, minor feature tweaks, and priority support. Major feature additions are quoted separately. You also have the option to take full ownership—I provide complete source code, deployment documentation, and database access credentials so you can hire another developer or handle it yourself. Many clients choose a hybrid approach: handle minor content updates themselves and contact me for significant changes. I stay available for questions even after the 30-day warranty period. My goal is to set you up for success, whether that means ongoing partnership or full independence.',
    category: 'Support',
    dateAdded: '2025-01-15'
  },
  {
    id: '9',
    question: 'How does payment work for fixed-price projects?',
    answer: 'Fixed-price projects use a milestone-based payment structure to protect both of us. Typical payment schedule: 30% deposit to start (secures your spot in my schedule and covers initial design/planning), 40% at midpoint when core features are functional and you can see real progress, 30% at launch when the app is complete, tested, and deployed. For smaller projects under $2K, I typically do 50% upfront and 50% at completion. I accept payments via bank transfer, Stripe, or PayPal. Why fixed pricing benefits you: No surprise bills or scope creep charges, you know total cost upfront for budgeting, incentivizes me to work efficiently (I can\'t bill extra hours), and clear deliverables at each milestone. Small change requests during development are included; major scope changes are discussed and may adjust the timeline or price. I provide detailed proposals before starting so you know exactly what you\'re paying for and what you\'ll receive.',
    category: 'Pricing',
    dateAdded: '2025-01-15'
  },
  {
    id: '10',
    question: 'Can I see examples of apps you\'ve built and talk to previous clients?',
    answer: 'Absolutely! You can see live examples on my Projects page: CardChase.org (trading card collection platform with inventory tracking, pricing, marketplace features), NarcoticTrack.com (pharmaceutical tracking system for controlled substances with compliance features), and FreeQRCoding.com (QR code generator with analytics). I also have several proprietary apps built for private companies visible on my App Store Developer Profile, though those have internal-only access due to client confidentiality. For client references, I\'m happy to connect you with previous clients who have agreed to serve as references—just ask! They can speak to communication style, timeline accuracy, problem-solving ability, and post-launch support. Many of my clients are startups and small businesses similar to yours who needed professional quality at affordable prices. I\'ve maintained relationships with most clients, either through ongoing maintenance contracts or occasional feature additions, which speaks to satisfaction with both the initial work and long-term support.',
    category: 'Process',
    dateAdded: '2025-01-15'
  },
  {
    id: '11',
    question: 'How does the design process work? Do I need to provide designs?',
    answer: 'You don\'t need to provide anything—I handle the entire design process. Here\'s how it works: First, I gather requirements through a discovery call where we discuss your vision, target audience, and key features. Then I create initial wireframes (simple layouts showing structure and flow) for your approval. Once wireframes are approved, I design 2-3 key screens in full detail with colors, fonts, and branding. After you approve the design direction, I build out the remaining screens maintaining consistency. Throughout development, you\'ll see progress via live preview links. However, if you already have designs from a designer or specific brand guidelines, I can work from those too. I\'m flexible—some clients want full creative control, others prefer to hand everything off. Design is included in the fixed price, so there\'s no extra charge whether I design from scratch or implement your existing designs.',
    category: 'Design',
    dateAdded: '2025-01-15'
  },
  {
    id: '12',
    question: 'Do you offer custom branding, logos, and UI/UX design?',
    answer: 'I offer UI/UX design for your app interface as part of the standard package—layouts, screens, user flows, color schemes, and typography. However, I don\'t create logos or full brand identities (brand guides, marketing materials, etc.) as that\'s specialized graphic design work. If you need a logo, I can recommend affordable logo designers ($200-500) or work with your existing branding. For UI/UX, I follow modern best practices: mobile-first design for optimal phone experience, accessibility standards (readable fonts, color contrast, touch target sizes), intuitive navigation that users understand immediately, and consistent design patterns throughout the app. I\'m experienced in both minimalist/modern aesthetics and more colorful/playful designs—whatever fits your brand. If you have strong design preferences or examples of apps you like, share them during our discovery call and I\'ll match that style. The goal is an interface that looks professional and works smoothly for your users.',
    category: 'Design',
    dateAdded: '2025-01-15'
  },
  {
    id: '13',
    question: 'Can you build HIPAA-compliant healthcare apps?',
    answer: 'Yes, I can build HIPAA-compliant healthcare applications, but this falls under custom solutions due to additional requirements. HIPAA compliance requires: encrypted data storage and transmission (both at rest and in transit), secure user authentication with multi-factor options, detailed audit logs tracking who accessed what data and when, Business Associate Agreements (BAA) with all third-party services, strict access controls and role-based permissions, and regular security assessments. For healthcare apps, I use HIPAA-compliant infrastructure: Supabase Enterprise (offers BAA), AWS with HIPAA-eligible services, encrypted databases, and secure API endpoints. Additional considerations include patient consent workflows, data retention policies, and breach notification procedures. HIPAA projects typically cost more ($8K-$15K+) because they require extra security measures, compliance documentation, and ongoing security monitoring. I\'ll work with you to understand your specific compliance needs—not all health apps need full HIPAA compliance (general wellness apps typically don\'t), but if you\'re handling Protected Health Information (PHI), proper compliance is essential.',
    category: 'Security',
    dateAdded: '2025-01-15'
  },
  {
    id: '14',
    question: 'How do you handle data security, privacy, and GDPR compliance?',
    answer: 'Security and privacy are built into every app I develop. Standard security measures included: All data transmission uses HTTPS/TLS encryption, passwords are hashed using industry-standard bcrypt (never stored in plain text), database access is restricted with row-level security policies, API endpoints require authentication tokens, regular dependency updates to patch security vulnerabilities, and secure environment variable management (API keys never exposed in code). For GDPR compliance (required if you have EU users), I implement: clear consent mechanisms for data collection, ability for users to export their data, ability for users to delete their accounts and data, privacy-focused analytics that don\'t track personal information, and cookie consent notices where required. Your Supabase database includes built-in backup and recovery. For apps requiring extra security (financial, healthcare, sensitive data), I can add: two-factor authentication (2FA), advanced encryption for sensitive fields, security headers and CORS policies, rate limiting to prevent abuse, and detailed audit logging. Data privacy policies and terms of service are your responsibility (I recommend using a legal service like TermsFeed), but I ensure the technical implementation supports your compliance needs.',
    category: 'Security',
    dateAdded: '2025-01-15'
  },
  {
    id: '15',
    question: 'Can you integrate with Shopify, QuickBooks, Salesforce, or other business platforms?',
    answer: 'Yes! Integration with business platforms is common. Basic integrations (included in standard pricing) cover: Stripe for payments, SendGrid/Mailgun for email, Google Maps for location, social media authentication (Google, Facebook login), and simple webhooks/APIs. Complex enterprise integrations (quoted separately) include: Shopify for e-commerce (inventory sync, order management, product catalogs), QuickBooks for accounting (invoice creation, expense tracking, financial reporting), Salesforce for CRM (contact management, lead tracking, sales pipelines), Zapier for workflow automation, Calendar APIs (Google Calendar, Outlook), and custom API integrations with your proprietary systems. Integration complexity varies—some platforms offer excellent APIs with clear documentation, others require complex authentication flows or have limited endpoints. I\'ll assess your integration needs during discovery and provide honest feedback on feasibility, timeline, and cost. Some integrations have ongoing API fees (Shopify charges for certain API calls, for example) which I\'ll explain upfront. Most startups need basic integrations initially and add complex ones later as they grow.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '16',
    question: 'What\'s your refund policy if I\'m not satisfied with the work?',
    answer: 'I want you to be completely satisfied, so here\'s how I protect both of us: The initial 30% deposit is non-refundable once work begins (it covers design time and opportunity cost of turning down other projects). However, you approve all major milestones before additional payments. At the midpoint (before the 40% payment), you see functional core features—if you\'re unhappy at this stage, we can discuss adjustments or part ways with no additional payment required. The final 30% is only due when you approve the completed app. If there are bugs or issues within 30 days of launch, I fix them at no charge. What if we have a major disagreement mid-project? We\'ll first try to resolve it through clear communication and adjustments. If that fails, you keep all work completed to that point (code, designs, database) and can hire another developer to finish. I only get paid for completed milestones. In 6+ years, I\'ve never had a project end this way because I prioritize clear communication, regular updates, and early problem-solving. The milestone structure ensures you\'re never paying for work you haven\'t seen and approved.',
    category: 'Business',
    dateAdded: '2025-01-15'
  },
  {
    id: '17',
    question: 'How do I market and launch my app successfully? Do you help with that?',
    answer: 'I focus on building the app, but I can guide you on technical launch requirements and best practices. For successful launches, you need: a landing page explaining your app (I can build this), app store listings if publishing to stores (compelling descriptions, screenshots, keywords), a launch strategy (soft launch to test, or big announcement?), and initial user acquisition plan (social media, ads, word-of-mouth). What I can help with: Setting up analytics (Google Analytics, Mixpanel) to track user behavior, implementing referral systems or promotional codes if needed, integrating email marketing tools (Mailchimp, ConvertKit) for user communications, optimizing load times and performance for good first impressions, and setting up crash reporting to quickly fix issues users encounter. What I don\'t do: social media marketing, paid advertising campaigns, content creation, PR and press releases, or ongoing marketing strategy. I can recommend affordable marketing tools and freelancers if you need them. Many successful app launches start small—get 10-50 users, gather feedback, improve the product, then scale marketing. Your app will be technically ready to handle growth when you\'re ready to market aggressively.',
    category: 'Business',
    dateAdded: '2025-01-15'
  },
  {
    id: '18',
    question: 'Can my app handle thousands of users? What about scaling?',
    answer: 'Yes, apps I build are designed to scale from day one. The tech stack I use (React, Supabase, Vercel/Netlify) automatically handles scaling for most small-to-medium businesses. Here\'s what happens as you grow: 1-1,000 users: Standard infrastructure handles this easily with zero changes needed and minimal hosting costs ($0-50/month). 1,000-10,000 users: Supabase and Vercel scale automatically—you\'ll pay more in hosting ($100-300/month) but no code changes required. 10,000-100,000+ users: May need optimization like database indexing, caching layers (Redis), CDN for images/assets, and possibly moving to dedicated servers. At this scale, I can help with performance optimization or you can hire a DevOps specialist. The architecture is built on proven, scalable services—Supabase uses PostgreSQL (handles millions of rows), Vercel uses edge networks (Netflix-level infrastructure), and React is used by Facebook and Instagram. Bottlenecks typically come from inefficient code or database queries, not the technology itself. If you anticipate massive scale from day one, mention it during discovery and I\'ll add specific optimizations upfront. For most startups, the standard setup grows with you perfectly.',
    category: 'Technology',
    dateAdded: '2025-01-15'
  },
  {
    id: '19',
    question: 'Do you offer white-label solutions I can resell to my clients?',
    answer: 'Yes, white-label development is available as a custom solution. Common scenarios: marketing agencies offering app development to their clients (I build, you sell under your brand), consultants who need technical execution without hiring full-time developers, entrepreneurs building app businesses where the same core app is customized per client, and SaaS founders who want a launchable product they can brand and resell. White-label pricing depends on usage: One-time white-label project: Standard pricing applies, you can rebrand and resell as your own (full code ownership). Multi-client white-label platform: We\'d create a base template you can customize per client (quoted based on complexity, typically $8K-$15K for the base, then $500-2K per client customization). Ongoing partnership: If you have regular client needs, we can discuss partnership terms (revenue share or discounted rates for volume). You get complete source code ownership, remove my branding, add your logo/branding, and present it as your work. I stay behind the scenes. Many agencies use this model successfully—you focus on sales and client relationships, I handle technical execution. This works best when you have a steady pipeline of similar projects.',
    category: 'Business',
    dateAdded: '2025-01-15'
  },
  {
    id: '20',
    question: 'What\'s the difference between React Native and Flutter? Which do you recommend?',
    answer: 'Both are excellent cross-platform frameworks, but I specialize in React Native for several reasons. React Native (Facebook/Meta): Uses JavaScript/TypeScript which is the most common programming language (easier to find developers if you need to hire later), shares code with React web apps (build web + mobile from one codebase), has mature ecosystem with thousands of pre-built components, backed by Meta with massive community support, and allows native modules when needed (can drop down to Swift/Kotlin for specific features). Flutter (Google): Uses Dart programming language (less common, smaller talent pool), produces slightly faster performance in some cases, has beautiful built-in widgets and animations, and growing rapidly but newer than React Native. For most startups and small businesses, React Native is better because: You can use the same developers for web and mobile, easier to find help if you need it, more third-party integrations available, and JavaScript skills are transferable. Flutter makes sense if you need extremely high performance (gaming, complex animations) or you already have a Dart development team. For your typical business app (authentication, database, API calls, standard UI), React Native is the practical choice. Both can build excellent apps—the ecosystem and hiring considerations make React Native my recommendation for most clients.',
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
