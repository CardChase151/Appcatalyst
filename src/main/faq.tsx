import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MessageCircle } from 'lucide-react';
import BottomBar from '../menu/bottombar';
import SEO from '../components/SEO';

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
    dateAdded: '2025-01-14'
  },
  {
    id: '7',
    question: 'What technology stack do you use and why does it matter?',
    answer: 'I use modern, proven technologies that balance performance, cost, and maintainability: React and React Native for frontend (one codebase works on web, iOS, and Android), Supabase for backend (PostgreSQL database, real-time subscriptions, authentication, file storage—all in one platform), TypeScript for type safety and fewer bugs, Vercel or Netlify for web hosting with automatic scaling, OneSignal for push notifications across all platforms. Why this matters to you: Lower costs—open-source tools mean no expensive licensing, faster development—mature ecosystems with pre-built components, easier hiring—if you need another developer later, these are popular skills, better performance—modern tools are optimized for speed, and future-proof—actively maintained with regular updates. I avoid proprietary or outdated technologies that lock you into expensive vendors or make future updates difficult. You own all the code and can move to any hosting provider.',
    category: 'Technology',
    dateAdded: '2025-01-14'
  },
  {
    id: '8',
    question: 'What happens after my app launches? Do you offer maintenance and support?',
    answer: 'After launch, you have several options. Included in your fixed price: 30 days of bug fixes for any issues found after launch, deployment to your hosting environment, and basic documentation on how to use your app. Not included but available: Ongoing maintenance plans ($200-500/month depending on app complexity) covering server monitoring, security updates, dependency updates, minor feature tweaks, and priority support. Major feature additions are quoted separately. You also have the option to take full ownership—I provide complete source code, deployment documentation, and database access credentials so you can hire another developer or handle it yourself. Many clients choose a hybrid approach: handle minor content updates themselves and contact me for significant changes. I stay available for questions even after the 30-day warranty period. My goal is to set you up for success, whether that means ongoing partnership or full independence.',
    category: 'Support',
    dateAdded: '2025-01-14'
  },
  {
    id: '9',
    question: 'How does payment work for fixed-price projects?',
    answer: 'Fixed-price projects use a milestone-based payment structure to protect both of us. Typical payment schedule: 30% deposit to start (secures your spot in my schedule and covers initial design/planning), 40% at midpoint when core features are functional and you can see real progress, 30% at launch when the app is complete, tested, and deployed. For smaller projects under $2K, I typically do 50% upfront and 50% at completion. I accept payments via bank transfer, Stripe, or PayPal. Why fixed pricing benefits you: No surprise bills or scope creep charges, you know total cost upfront for budgeting, incentivizes me to work efficiently (I can\'t bill extra hours), and clear deliverables at each milestone. Small change requests during development are included; major scope changes are discussed and may adjust the timeline or price. I provide detailed proposals before starting so you know exactly what you\'re paying for and what you\'ll receive.',
    category: 'Pricing',
    dateAdded: '2025-01-14'
  },
  {
    id: '10',
    question: 'Can I see examples of apps you\'ve built and talk to previous clients?',
    answer: 'Absolutely! You can see live examples on my Projects page: CardChase.org (trading card collection platform with inventory tracking, pricing, marketplace features), NarcoticTrack.com (pharmaceutical tracking system for controlled substances with compliance features), and FreeQRCoding.com (QR code generator with analytics). I also have several proprietary apps built for private companies visible on my App Store Developer Profile, though those have internal-only access due to client confidentiality. For client references, I\'m happy to connect you with previous clients who have agreed to serve as references—just ask! They can speak to communication style, timeline accuracy, problem-solving ability, and post-launch support. Many of my clients are startups and small businesses similar to yours who needed professional quality at affordable prices. I\'ve maintained relationships with most clients, either through ongoing maintenance contracts or occasional feature additions, which speaks to satisfaction with both the initial work and long-term support.',
    category: 'Process',
    dateAdded: '2025-01-14'
  },
  {
    id: '11',
    question: 'How does the design process work? Do I need to provide designs?',
    answer: 'You don\'t need to provide anything—I handle the entire design process. Here\'s how it works: First, I gather requirements through a discovery call where we discuss your vision, target audience, and key features. Then I create initial wireframes (simple layouts showing structure and flow) for your approval. Once wireframes are approved, I design 2-3 key screens in full detail with colors, fonts, and branding. After you approve the design direction, I build out the remaining screens maintaining consistency. Throughout development, you\'ll see progress via live preview links. However, if you already have designs from a designer or specific brand guidelines, I can work from those too. I\'m flexible—some clients want full creative control, others prefer to hand everything off. Design is included in the fixed price, so there\'s no extra charge whether I design from scratch or implement your existing designs.',
    category: 'Design',
    dateAdded: '2025-01-13'
  },
  {
    id: '12',
    question: 'Do you offer custom branding, logos, and UI/UX design?',
    answer: 'I offer UI/UX design for your app interface as part of the standard package—layouts, screens, user flows, color schemes, and typography. However, I don\'t create logos or full brand identities (brand guides, marketing materials, etc.) as that\'s specialized graphic design work. If you need a logo, I can recommend affordable logo designers ($200-500) or work with your existing branding. For UI/UX, I follow modern best practices: mobile-first design for optimal phone experience, accessibility standards (readable fonts, color contrast, touch target sizes), intuitive navigation that users understand immediately, and consistent design patterns throughout the app. I\'m experienced in both minimalist/modern aesthetics and more colorful/playful designs—whatever fits your brand. If you have strong design preferences or examples of apps you like, share them during our discovery call and I\'ll match that style. The goal is an interface that looks professional and works smoothly for your users.',
    category: 'Design',
    dateAdded: '2025-01-13'
  },
  {
    id: '13',
    question: 'Can you build HIPAA-compliant healthcare apps?',
    answer: 'Yes, I can build HIPAA-compliant healthcare applications, but this falls under custom solutions due to additional requirements. HIPAA compliance requires: encrypted data storage and transmission (both at rest and in transit), secure user authentication with multi-factor options, detailed audit logs tracking who accessed what data and when, Business Associate Agreements (BAA) with all third-party services, strict access controls and role-based permissions, and regular security assessments. For healthcare apps, I use HIPAA-compliant infrastructure: Supabase Enterprise (offers BAA), AWS with HIPAA-eligible services, encrypted databases, and secure API endpoints. Additional considerations include patient consent workflows, data retention policies, and breach notification procedures. HIPAA projects typically cost more ($8K-$15K+) because they require extra security measures, compliance documentation, and ongoing security monitoring. I\'ll work with you to understand your specific compliance needs—not all health apps need full HIPAA compliance (general wellness apps typically don\'t), but if you\'re handling Protected Health Information (PHI), proper compliance is essential.',
    category: 'Security',
    dateAdded: '2025-01-13'
  },
  {
    id: '14',
    question: 'How do you handle data security, privacy, and GDPR compliance?',
    answer: 'Security and privacy are built into every app I develop. Standard security measures included: All data transmission uses HTTPS/TLS encryption, passwords are hashed using industry-standard bcrypt (never stored in plain text), database access is restricted with row-level security policies, API endpoints require authentication tokens, regular dependency updates to patch security vulnerabilities, and secure environment variable management (API keys never exposed in code). For GDPR compliance (required if you have EU users), I implement: clear consent mechanisms for data collection, ability for users to export their data, ability for users to delete their accounts and data, privacy-focused analytics that don\'t track personal information, and cookie consent notices where required. Your Supabase database includes built-in backup and recovery. For apps requiring extra security (financial, healthcare, sensitive data), I can add: two-factor authentication (2FA), advanced encryption for sensitive fields, security headers and CORS policies, rate limiting to prevent abuse, and detailed audit logging. Data privacy policies and terms of service are your responsibility (I recommend using a legal service like TermsFeed), but I ensure the technical implementation supports your compliance needs.',
    category: 'Security',
    dateAdded: '2025-01-13'
  },
  {
    id: '15',
    question: 'Can you integrate with Shopify, QuickBooks, Salesforce, or other business platforms?',
    answer: 'Yes! Integration with business platforms is common. Basic integrations (included in standard pricing) cover: Stripe for payments, SendGrid/Mailgun for email, Google Maps for location, social media authentication (Google, Facebook login), and simple webhooks/APIs. Complex enterprise integrations (quoted separately) include: Shopify for e-commerce (inventory sync, order management, product catalogs), QuickBooks for accounting (invoice creation, expense tracking, financial reporting), Salesforce for CRM (contact management, lead tracking, sales pipelines), Zapier for workflow automation, Calendar APIs (Google Calendar, Outlook), and custom API integrations with your proprietary systems. Integration complexity varies—some platforms offer excellent APIs with clear documentation, others require complex authentication flows or have limited endpoints. I\'ll assess your integration needs during discovery and provide honest feedback on feasibility, timeline, and cost. Some integrations have ongoing API fees (Shopify charges for certain API calls, for example) which I\'ll explain upfront. Most startups need basic integrations initially and add complex ones later as they grow.',
    category: 'Technology',
    dateAdded: '2025-01-13'
  },
  {
    id: '16',
    question: 'What\'s your refund policy if I\'m not satisfied with the work?',
    answer: 'I want you to be completely satisfied, so here\'s how I protect both of us: The initial 30% deposit is non-refundable once work begins (it covers design time and opportunity cost of turning down other projects). However, you approve all major milestones before additional payments. At the midpoint (before the 40% payment), you see functional core features—if you\'re unhappy at this stage, we can discuss adjustments or part ways with no additional payment required. The final 30% is only due when you approve the completed app. If there are bugs or issues within 30 days of launch, I fix them at no charge. What if we have a major disagreement mid-project? We\'ll first try to resolve it through clear communication and adjustments. If that fails, you keep all work completed to that point (code, designs, database) and can hire another developer to finish. I only get paid for completed milestones. In 6+ years, I\'ve never had a project end this way because I prioritize clear communication, regular updates, and early problem-solving. The milestone structure ensures you\'re never paying for work you haven\'t seen and approved.',
    category: 'Business',
    dateAdded: '2025-01-12'
  },
  {
    id: '17',
    question: 'How do I market and launch my app successfully? Do you help with that?',
    answer: 'I focus on building the app, but I can guide you on technical launch requirements and best practices. For successful launches, you need: a landing page explaining your app (I can build this), app store listings if publishing to stores (compelling descriptions, screenshots, keywords), a launch strategy (soft launch to test, or big announcement?), and initial user acquisition plan (social media, ads, word-of-mouth). What I can help with: Setting up analytics (Google Analytics, Mixpanel) to track user behavior, implementing referral systems or promotional codes if needed, integrating email marketing tools (Mailchimp, ConvertKit) for user communications, optimizing load times and performance for good first impressions, and setting up crash reporting to quickly fix issues users encounter. What I don\'t do: social media marketing, paid advertising campaigns, content creation, PR and press releases, or ongoing marketing strategy. I can recommend affordable marketing tools and freelancers if you need them. Many successful app launches start small—get 10-50 users, gather feedback, improve the product, then scale marketing. Your app will be technically ready to handle growth when you\'re ready to market aggressively.',
    category: 'Business',
    dateAdded: '2025-01-12'
  },
  {
    id: '18',
    question: 'Can my app handle thousands of users? What about scaling?',
    answer: 'Yes, apps I build are designed to scale from day one. The tech stack I use (React, Supabase, Vercel/Netlify) automatically handles scaling for most small-to-medium businesses. Here\'s what happens as you grow: 1-1,000 users: Standard infrastructure handles this easily with zero changes needed and minimal hosting costs ($0-50/month). 1,000-10,000 users: Supabase and Vercel scale automatically—you\'ll pay more in hosting ($100-300/month) but no code changes required. 10,000-100,000+ users: May need optimization like database indexing, caching layers (Redis), CDN for images/assets, and possibly moving to dedicated servers. At this scale, I can help with performance optimization or you can hire a DevOps specialist. The architecture is built on proven, scalable services—Supabase uses PostgreSQL (handles millions of rows), Vercel uses edge networks (Netflix-level infrastructure), and React is used by Facebook and Instagram. Bottlenecks typically come from inefficient code or database queries, not the technology itself. If you anticipate massive scale from day one, mention it during discovery and I\'ll add specific optimizations upfront. For most startups, the standard setup grows with you perfectly.',
    category: 'Technology',
    dateAdded: '2025-01-12'
  },
  {
    id: '19',
    question: 'Do you offer white-label solutions I can resell to my clients?',
    answer: 'Yes, white-label development is available as a custom solution. Common scenarios: marketing agencies offering app development to their clients (I build, you sell under your brand), consultants who need technical execution without hiring full-time developers, entrepreneurs building app businesses where the same core app is customized per client, and SaaS founders who want a launchable product they can brand and resell. White-label pricing depends on usage: One-time white-label project: Standard pricing applies, you can rebrand and resell as your own (full code ownership). Multi-client white-label platform: We\'d create a base template you can customize per client (quoted based on complexity, typically $8K-$15K for the base, then $500-2K per client customization). Ongoing partnership: If you have regular client needs, we can discuss partnership terms (revenue share or discounted rates for volume). You get complete source code ownership, remove my branding, add your logo/branding, and present it as your work. I stay behind the scenes. Many agencies use this model successfully—you focus on sales and client relationships, I handle technical execution. This works best when you have a steady pipeline of similar projects.',
    category: 'Business',
    dateAdded: '2025-01-12'
  },
  {
    id: '20',
    question: 'What\'s the difference between React Native and Flutter? Which do you recommend?',
    answer: 'Both are excellent cross-platform frameworks, but I specialize in React Native for several reasons. React Native (Facebook/Meta): Uses JavaScript/TypeScript which is the most common programming language (easier to find developers if you need to hire later), shares code with React web apps (build web + mobile from one codebase), has mature ecosystem with thousands of pre-built components, backed by Meta with massive community support, and allows native modules when needed (can drop down to Swift/Kotlin for specific features). Flutter (Google): Uses Dart programming language (less common, smaller talent pool), produces slightly faster performance in some cases, has beautiful built-in widgets and animations, and growing rapidly but newer than React Native. For most startups and small businesses, React Native is better because: You can use the same developers for web and mobile, easier to find help if you need it, more third-party integrations available, and JavaScript skills are transferable. Flutter makes sense if you need extremely high performance (gaming, complex animations) or you already have a Dart development team. For your typical business app (authentication, database, API calls, standard UI), React Native is the practical choice. Both can build excellent apps—the ecosystem and hiring considerations make React Native my recommendation for most clients.',
    category: 'Technology',
    dateAdded: '2025-01-12'
  },
  {
    id: '21',
    question: 'Why are overseas developers cheaper? What are the hidden risks?',
    answer: 'Overseas developers (India, Pakistan, Philippines, Eastern Europe) charge less due to lower cost of living—$15-30/hour vs $100-150/hour in the US. However, the "savings" often disappear through hidden costs: Communication barriers create misunderstandings that require expensive rework (I\'ve seen 40% of project time wasted on clarifications). Timezone differences mean 12-24 hour delays on every question or bug fix. Quality issues are common—junior developers pose as seniors, code lacks documentation, security vulnerabilities go unnoticed. Project abandonment happens frequently—they take deposits and disappear, or abandon projects halfway when better-paying clients come along. No legal recourse—if things go wrong, good luck enforcing contracts internationally. Hidden charges appear constantly—"That feature will cost extra" after you\'ve already paid. The average startup spends $15K-$25K with overseas teams (multiple attempts, rework, hiring someone to fix it) for what should\'ve been a $5K project. My pricing matches overseas final costs but with US communication, reliability, and quality. You\'re not paying more—you\'re avoiding expensive mistakes.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-11'
  },
  {
    id: '22',
    question: 'I\'m getting quotes from multiple developers. How do I choose?',
    answer: 'Smart move! Here\'s how to evaluate quotes effectively: First, compare scope, not just price—a $2K quote with limited features isn\'t cheaper than $5K for a complete app. Ask what\'s NOT included (App Store publishing, designs, revisions, hosting setup). Check communication quality—if they\'re slow or unclear during sales, it gets worse during development. Review portfolios critically—can you see live working apps, or just screenshots? Ask for client references you can actually call. Evaluate technical choices—do they explain why they chose certain technologies, or just use buzzwords? Understand payment terms—milestone-based protects you, 100% upfront is a red flag. Consider timezone and availability—will they respond in your working hours? Look for transparency—honest developers explain limitations and tradeoffs, dishonest ones promise everything. Red flags include: quotes significantly below everyone else, no clear timeline, unwillingness to show previous work, pressure to decide quickly, vague proposals without specifics, and no contract or unclear terms. The cheapest quote often becomes the most expensive project. Choose based on communication quality, portfolio, and realistic scope—not just the lowest number.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-11'
  },
  {
    id: '23',
    question: 'What happens if I go with the cheapest developer and it doesn\'t work out?',
    answer: 'This is the most common painful lesson in app development. Here\'s what typically happens: You pay $2K-$5K to a cheap developer (overseas or inexperienced US developer). Initial progress seems good—they show screenshots, you\'re excited. Problems emerge—features don\'t work properly, bugs multiply, communication slows down. They ask for more money—"This feature is more complex than expected." You\'re stuck—you\'ve already paid, starting over means losing everything. Project drags on—2 months becomes 6 months, promises are broken repeatedly. You finally give up—the app is unusable, half-finished, or completely abandoned. Now you\'re in a worse position: You\'ve spent $2K-$8K with nothing usable, you\'ve wasted 3-6 months while competitors moved ahead, you need to start completely over (can\'t use the bad code), you\'re demoralized and skeptical of all developers, and you need to explain the failed project to investors or partners. Recovery cost: Hiring a proper developer now costs $8K-$15K because they need to understand your failed attempt, rebuild from scratch (bad code is worse than no code), regain lost time, and rebuild your confidence. Total cost: $10K-$23K and 9-12 months for what should\'ve been $5K and 6 weeks. I\'ve rescued dozens of these projects—the cheapest option is rarely the least expensive.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-11'
  },
  {
    id: '24',
    question: 'How do I know you won\'t abandon my project halfway through?',
    answer: 'Great question—project abandonment is a real fear, especially after bad experiences. Here\'s what protects you when working with me: Track record: I\'ve completed 25+ apps and 30+ websites since 2019 without a single abandoned project. Verifiable portfolio: All my public projects (CardChase, NarcoticTrack, FreeQRCoding) are live and maintained—you can verify them yourself. Milestone payments: You never pay for work you haven\'t seen—30% to start, 40% at midpoint when you see working features, 30% at completion. You control the money. Local presence: I\'m US-based with a reputation to maintain—you can find me, unlike anonymous overseas contractors. Open communication: You get regular updates (at least weekly), access to development environment to see real-time progress, and direct communication (no middlemen or account managers). Client references: I\'ll connect you with previous clients who can vouch for project completion and support. Legal protection: Clear contracts with deliverables, timelines, and recourse if things go wrong. Source code access: You get code repositories from day one—even if I disappeared tomorrow, you\'d have everything. Why I don\'t abandon projects: My business depends on referrals and reputation, I price projects to be profitable at completion, and I enjoy finishing what I start. If you\'re worried, start with a smaller project to build trust.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-11'
  },
  {
    id: '25',
    question: 'What are the red flags I should watch for when hiring a developer?',
    answer: 'After 6+ years, I\'ve seen every scam and bad practice. Watch for these warning signs: Pricing red flags: Quote is 50%+ below everyone else (if it seems too good to be true, it is), vague pricing without scope details, demands 100% payment upfront, constantly changes price mid-project, or charges hourly with no cap or estimate. Communication red flags: Takes days to respond during sales process (gets worse later), uses only email/chat (no video calls), English is barely understandable, avoids answering direct questions, or uses high-pressure tactics ("special price if you sign today"). Portfolio red flags: Only shows mockups/designs (no live working apps), can\'t provide URLs to verify projects, portfolio looks suspiciously professional for their prices, claims credit for well-known apps without proof, or refuses to provide client references. Technical red flags: Can\'t explain their technology choices in simple terms, promises everything is possible (no limitations discussed), doesn\'t ask questions about your needs (just agrees with everything), uses outdated technologies, or won\'t show development progress until "it\'s done." Legal red flags: No written contract or agreement, unclear deliverables or timelines, no refund policy or dispute resolution, works only through freelance platforms (no direct relationship), or company/identity can\'t be verified. Trust your gut—if something feels off, it probably is. Professional developers are transparent, communicative, and set realistic expectations.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-11'
  },
  {
    id: '26',
    question: 'Why do some developers quote $50K+ while you charge $3K-$5K for similar apps?',
    answer: 'The pricing gap exists for real reasons. Large agencies ($50K-$150K) charge more because of: Overhead costs—fancy offices, sales teams, account managers, legal departments. Multiple layers—project manager, designer, senior developer, junior developer, QA tester all billing hours. Hourly billing—they bill for meetings, emails, revisions, everything (100-500 hours × $100-150/hour). Risk buffer—they pad estimates to cover unexpected issues. Premium brand—some clients only trust expensive agencies. What you actually get: The same React/Supabase app I\'d build, lots of meetings and paperwork, polished presentations, and often junior developers doing the actual work. I charge less because: Solo operation—I do design, development, and project management myself (no overhead). Fixed pricing—I optimize for efficiency since I can\'t bill extra hours. Startup focus—I deliberately target price-sensitive clients that agencies ignore. Simple process—minimal meetings, maximum coding. I keep the code and capabilities. What you don\'t get: A fancy office to visit, dedicated account manager, unlimited meetings, or a big brand name. For startups and small businesses, agencies are overkill. You need a working app, not PowerPoint presentations. That said, enterprise clients with $500K budgets should hire agencies—they have different needs (compliance teams, procurement processes, risk mitigation). Know your needs and pay accordingly.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-10'
  },
  {
    id: '27',
    question: 'I found a developer on Fiverr/Upwork for $500. Why shouldn\'t I try that first?',
    answer: 'I understand the temptation—$500 vs $5,000 is compelling. But here\'s the reality of $500 app development: What you actually get: A template they\'ve sold to 50 other people with your logo swapped in, broken features that look good in demos but don\'t work, no backend/database (just a frontend shell), stolen code from other projects, zero security measures, no documentation or ability to modify it, and they disappear after payment. What happens next: You realize it doesn\'t work within days, they won\'t respond to fix issues or charge extra for every small change, you can\'t hire another developer to fix it (code is a mess or you don\'t have access), you\'re back to square one after wasting $500 and 2-3 weeks, and you now need to hire a real developer anyway—starting from zero. The math: $500 wasted + $5,000 real development = $5,500 total and 2 months lost. Or just $5,000 and 1.5 months with a real developer. When $500 makes sense: Logo design, simple landing page (no functionality), graphic design work, or content writing. When it never makes sense: Full applications with login, database, and multiple features. Nobody with real skills works for $500 on complex projects—they can make $3K-$10K per project elsewhere. If you want to test the waters cheaply, I\'d recommend starting with a $1K simple website to see if we work well together, then upgrading to a full app. That\'s a smart test, not a false economy.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-10'
  },
  {
    id: '28',
    question: 'What are the hidden costs I should budget for beyond the development price?',
    answer: 'Good question—many developers don\'t discuss this upfront, leading to budget surprises. Here\'s what you actually need beyond the development cost: Domain name: $10-20/year for your custom domain (yourstartup.com). Hosting: $0-50/month initially on Vercel/Netlify (free tier works for startups), scales to $100-500/month with growth. Database hosting: Included in Supabase free tier initially, $25-100/month as you grow. Third-party services: Stripe fees (2.9% + 30¢ per transaction if you accept payments), email service $0-50/month (SendGrid free tier covers most startups), SMS/phone verification $10-50/month if you use it, and Google Maps API $0-200/month depending on usage. Developer accounts (if publishing to stores): Apple Developer Program $99/year, Google Play $25 one-time. Maintenance: $0 if you handle it yourself, $200-500/month if you want me to handle updates and fixes. SSL certificate: Free with Vercel/Netlify/Cloudflare. What\'s NOT a hidden cost with me: Revisions during development (included in fixed price), bug fixes within 30 days (included), deployment setup (included), basic documentation (included). Realistic first-year budget beyond my development fee: Minimum: $200 (domain + keeping everything on free tiers), Typical: $500-1,000 (domain + basic paid services + Apple Developer account), Growth: $2,000-5,000 (as your user base grows and you need more server capacity). I\'ll help you optimize costs and stay on free tiers as long as possible.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-10'
  },
  {
    id: '29',
    question: 'How do I know the code quality is good? Can I own the code?',
    answer: 'Code quality and ownership are critical—you\'re making a business investment, not just buying a service. Code quality assurances I provide: Modern best practices: TypeScript for type safety, ESLint for code consistency, component-based architecture for maintainability, and clean folder structure that makes sense. Security standards: No hardcoded secrets, encrypted sensitive data, secure authentication, SQL injection prevention, and regular dependency updates. Performance optimization: Lazy loading for faster load times, optimized images, efficient database queries, and minimal bundle sizes. Documentation: README with setup instructions, comments explaining complex logic, environment variable examples, and deployment guides. Testing: Manual testing of all features, cross-browser/device testing, and edge case handling. Code ownership: You get full ownership from day one. Specifically: Complete source code in a GitHub repository (you control access), all design files and assets, database schemas and migration files, API keys and credentials, and deployment configurations. You can: Hire another developer to work on it, sell the code/app if you want, modify anything yourself, host it anywhere you choose, and never pay me again if you don\'t want to. Unlike agencies that keep code in their repositories or use proprietary systems, you truly own everything. I can do a code review call after completion to walk through the structure and answer questions. Think of it like buying a house—you own it completely after purchase, even though I built it.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-10'
  },
  {
    id: '30',
    question: 'Should I hire a local developer I can meet in person, or is remote okay?',
    answer: 'This is a valid consideration, and the answer depends on your priorities. In-person developers (local to you): Pros include face-to-face meetings can build trust faster, easier to drop by their office if needed, same timezone for real-time communication, and local legal recourse if issues arise. Cons include much higher rates ($150-250/hour in major cities), limited talent pool (you\'re restricted to your city), and you\'re paying for office overhead in their pricing. Remote developers (like me): Pros include access to talent anywhere in the US, lower rates due to lower cost of living areas, more flexibility in communication (async updates work well), and proven processes for remote collaboration (I\'ve done this for 6+ years). Cons include no face-to-face meetings (though video calls work great), requires trust in someone you haven\'t met in person, and timezone differences if working across coasts. The reality in 2025: 80% of software development is remote—even "local" developers often work from home. Video calls, screen sharing, and project management tools make remote work seamless. The skills and communication quality matter more than physical location. My approach: Regular video calls for face-time connection, shared screens to show real-time progress, detailed written updates you can review anytime, and fast response times during business hours. Many clients are surprised how collaborative remote work feels. If you\'re in my area (check my contact page), we can meet for coffee to start the relationship if you prefer—but most clients find it unnecessary after our first video call.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-10'
  },
  {
    id: '31',
    question: 'What should I prepare or have ready before contacting a developer?',
    answer: 'Good preparation makes projects go smoother and cheaper. Here\'s what helps: Your core idea in 2-3 sentences (what problem does it solve, who is it for?). User stories or use cases (what will users do in the app? "A restaurant owner logs in and sees daily orders"). Must-have vs nice-to-have features (start with minimum viable product, add later). Reference apps you like ("I want something like Uber, but for..."). Target platform preference (web, iOS, Android, or all). Rough budget and timeline expectations. What you DON\'T need: Detailed technical specifications (I\'ll help with that), wire frames or designs (I can create those), chosen technology stack (unless you have strong reasons), or complete feature list (we\'ll refine together). Red flag preparations: "I need you to sign an NDA before I tell you anything" suggests unrealistic expectations about idea value. "Here\'s a 40-page requirements document" usually means scope creep and confusion. Best approach: Have a clear vision of the problem you\'re solving, be flexible on HOW to solve it, and know your constraints (budget, timeline, must-have features). I\'ll guide you through the rest. Many successful projects start with a 30-minute conversation where you describe your vision and I ask clarifying questions. That\'s often enough to start.',
    category: 'Getting Started',
    dateAdded: '2025-01-09'
  },
  {
    id: '32',
    question: 'Can I use AI like ChatGPT to help plan my app idea and features?',
    answer: 'Absolutely! AI is an excellent brainstorming partner for app planning. Here\'s how to use it effectively: Use AI for: Generating feature ideas ("What features should a dog walking app have?"), identifying user flows ("What steps should a user take to book a service?"), brainstorming names and branding concepts, researching competitors and market validation, drafting initial requirements, and understanding technical concepts. Good prompts: "I want to build an app for [problem]. What are the core features I should consider?", "What are common pitfalls when building a [type] app?", or "How do successful [competitor] apps handle [specific feature]?" What AI is NOT good for: Choosing specific technologies (it gives generic answers without knowing your constraints), estimating project costs (it doesn\'t know market rates or your specific complexity), replacing the discovery conversation with a real developer (I\'ll ask questions AI won\'t think of), and generating complete technical specifications (AI overgeneralizes). Best workflow: Use AI to brainstorm and organize your thoughts, then bring that to our discovery call where I refine it based on budget, timeline, and technical reality. Many clients do this and it works great—you arrive with a clearer vision, I help make it practical and achievable. Pro tip: Ask AI "What questions should I ask a developer before starting this project?" The answers help you evaluate me and other developers more effectively.',
    category: 'Getting Started',
    dateAdded: '2025-01-09'
  },
  {
    id: '33',
    question: 'Can I require specific technologies, or should I trust your recommendations?',
    answer: 'You can certainly have technology preferences, but flexibility usually leads to better outcomes. When specific tech makes sense: You have an existing system we need to integrate with ("Our backend is Python/Django, so..."), you have in-house developers who will maintain it ("Our team knows Vue.js"), there\'s a regulatory requirement ("We need .NET for enterprise compliance"), or you have strong technical leadership who can justify the choice. When flexibility is better: You\'re focused on the end goal, not the tools ("I just want users to book appointments easily"), you want the most cost-effective solution, you trust the developer\'s experience with certain tools, or you need it done quickly (let me use what I\'m fastest with). My technology recommendations are based on: What I\'m expert in (React/React Native/Supabase—I\'m 10x faster than learning new tools), what\'s most maintainable for you (popular technologies = easier to find future help), what matches your budget (open-source vs paid tools), and what\'s proven for this use case. Red flag: Clients who demand specific obscure technologies usually heard about them from a technical friend or read a blog post, but don\'t understand the tradeoffs. "It MUST be built with [framework they read about]" often signals future scope creep. Best approach: Tell me your constraints and goals, ask why I recommend certain technologies, be open to equivalent alternatives ("I prefer PostgreSQL but MySQL works too"), and focus on outcomes, not tools. A React app and a Vue app look identical to users—the difference is development speed, cost, and maintainability.',
    category: 'Getting Started',
    dateAdded: '2025-01-09'
  },
  {
    id: '34',
    question: 'Do I need to specifically ask for code ownership, or is it automatically mine?',
    answer: 'This varies by developer, so it\'s important to clarify upfront. With me, code ownership is automatic—you own everything from day one. Here\'s what different developers do: Full ownership (my approach): You get all source code, designs, database schemas, and deployment configs. You can do whatever you want—modify, sell, hire another developer. No ongoing fees or restrictions. This should be standard but isn\'t always. License-based: Developer retains copyright but gives you license to use it. Often hidden in contracts. You can use the app but can\'t easily modify or transfer it. Common with agencies protecting their "frameworks." Proprietary systems: Developer keeps code on their servers. You only get access to the running app. If you stop paying, you lose everything. This is predatory but happens. Shared ownership: You own the custom code, developer owns reusable components they built. Complicated and should be avoided for small projects. How to protect yourself: Ask directly: "Will I own all code and assets?" Get it in writing in the contract. Ask for GitHub repository access from day one (proves you have the code). Request delivery of final code package at completion. When NOT to care as much: SaaS products where you pay monthly (you\'re renting, not buying). Platforms where the tool is the product, not custom code. Very short projects where you just need it done. Why I do full ownership: It\'s fair—you paid for it, you own it. It builds trust and leads to referrals. I don\'t want to manage ongoing licenses. If you need to ask for ownership specifically, that\'s a red flag about the developer.',
    category: 'Getting Started',
    dateAdded: '2025-01-09'
  },
  {
    id: '35',
    question: 'Should I require an NDA? What about non-compete agreements?',
    answer: 'NDAs and non-competes are different things, and one is reasonable while the other isn\'t. Non-Disclosure Agreements (NDAs): Reasonable for: Truly sensitive business information (existing customer data, proprietary algorithms, trade secrets you\'re sharing). NOT reasonable for: General app ideas ("It\'s like Uber for dog walking"). NDAs don\'t protect ideas—only execution matters. Novel features anyone could think of. My approach to NDAs: I\'m happy to sign reasonable NDAs protecting your actual confidential information. I won\'t share your customer data, business metrics, or proprietary processes with anyone. I won\'t sign overly broad NDAs that prevent me from working in entire industries or discussing general concepts. Standard mutual NDAs (we both protect each other\'s info) work great. Non-Compete Agreements: Almost always unreasonable: "You can\'t build apps for any restaurants for 5 years." This would destroy my business. "You can\'t use these technologies for other clients." Impossible to enforce and unfair. What\'s fair instead: "You won\'t build an identical app for my direct competitor while working with me." Reasonable. "You won\'t disclose my business model or customer list." Covered by NDA. "You won\'t steal my clients." Basic professional ethics. Reality check: Your idea isn\'t as unique as you think. Execution, timing, and market fit matter 100x more than the idea. I\'ve built 25+ apps and never stolen an idea—my business depends on trust and referrals. I have plenty of my own ideas I don\'t have time to build. Best approach: Sign a reasonable mutual NDA if you have actual confidential info. Don\'t ask for non-competes (signals you don\'t understand business). Focus on building a great app, not locking down your developer.',
    category: 'Getting Started',
    dateAdded: '2025-01-09'
  },
  {
    id: '36',
    question: 'Do we need a formal contract or agreement? What should it include?',
    answer: 'Yes, always use a written agreement—it protects both of us. My contracts include: Scope of work: Specific features and deliverables, what\'s included vs what\'s additional cost, and number of revision rounds. Timeline: Estimated start and completion dates, milestone schedule, and dependencies on your feedback. Payment terms: Total price, deposit amount and due date, milestone payments (30/40/30 split), payment methods accepted, and late payment terms. Deliverables: Source code ownership and delivery, design files and assets, documentation, and deployment to your hosting. Warranties and support: 30-day bug fix warranty, what constitutes a "bug" vs new feature, and response time commitments. Change management: How scope changes are handled, how additional costs are calculated, and approval process for changes. Termination: Either party can terminate with notice, you keep work completed to date, refund policy (initial deposit non-refundable, milestone payments pro-rated), and what happens to incomplete work. Intellectual property: You own all custom code and designs created for you, I retain right to show project in portfolio (unless NDA prevents), and standard disclaimer about third-party libraries. Liability limitations: Standard contractor disclaimers, no warranty of specific revenue/results, and mutual indemnification. What good contracts DON\'T have: Vague deliverables ("build an app"), hidden fees or hourly billing without caps, automatic renewals or ongoing obligations, unreasonable non-competes, or one-sided termination clauses. I provide a clear, fair contract for every project. Read it, ask questions, and we both sign before starting. This clarity prevents 99% of disputes.',
    category: 'Getting Started',
    dateAdded: '2025-01-08'
  },
  {
    id: '37',
    question: 'Is it normal to pay a deposit before any work starts? Why?',
    answer: 'Yes, deposits are industry standard and protect both of us. Here\'s why: Why developers require deposits: Opportunity cost: When I accept your project, I turn down other paying work. The deposit compensates for that commitment. Time investment: Even before coding starts, I invest hours in discovery, planning, and design. The deposit covers this. Seriousness filter: Clients who won\'t pay deposits often aren\'t serious and waste time with endless questions and no commitment. Materials and setup: Purchasing necessary tools, setting up servers/services, and buying stock assets if needed. What\'s normal in the industry: 25-50% upfront deposit is standard. I charge 30%. Smaller projects ($1-2K) often do 50% up / 50% on completion. Larger projects use milestone-based payments (30/40/30 is my structure). What\'s NOT normal: 100% payment upfront (huge red flag—never do this). Payment after completion with no milestones (developer assumes all risk, usually charges more). Why deposits protect YOU too: Milestone payments mean you see progress before paying more. You never pay for work you haven\'t seen. If developer disappears after deposit, you lose 30%, not 100%. Forces clear scope definition upfront (prevents scope creep). What if you\'re uncomfortable with deposits: Start with a smaller test project ($1K website) to build trust, then do the bigger app. Ask for weekly updates and development environment access so you see progress. Use milestone-based payments (you control 70% of payment until the end). Get everything in writing—scope, timeline, deliverables. My track record: 25+ projects completed, zero deposit disputes, and all clients paid in full because I delivered. The deposit is mutual commitment to making the project successful.',
    category: 'Getting Started',
    dateAdded: '2025-01-08'
  },
  {
    id: '38',
    question: 'Do you charge for the discovery or planning phase?',
    answer: 'Great question—this varies by developer and project complexity. My approach: Initial consultation (free): 30-60 minute video call where we discuss your idea, goals, timeline, and budget. I explain approach, give rough estimate, and answer questions. No charge—this helps us both decide if we\'re a good fit. Basic planning and scoping (included in deposit): After you commit, I create detailed project plan, wireframes showing app flow, feature breakdown with priorities, and timeline with milestones. This is covered by your 30% deposit. Complex discovery (additional cost): For very complex projects ($15K+) with unclear scope, enterprise integrations, or regulatory requirements, I may propose a paid discovery phase: $1,500-3,000 for 1-2 weeks of research, technical proof-of-concept, detailed specification document, and accurate cost estimate. This discovery fee often applies toward the final project cost if you proceed. When discovery makes sense: You\'re not sure if your idea is technically feasible. Multiple stakeholders need to align on requirements. You need a detailed spec to get investor funding. You\'re comparing multiple complex approaches. When it doesn\'t: Standard apps with clear requirements (e-commerce, booking systems, social apps). You have a limited budget and need to start building ASAP. You trust me to figure out details during development. What other developers do: Agencies often charge $5K-$15K for discovery phases. Freelancers usually include basic planning in their rates. Consultants may do discovery-only without building. My philosophy: Keep barriers low for startups. Free consultation + basic planning included gets most projects started. Only charge for discovery when complexity demands it. Most of my clients start with free consultation, pay deposit, and I handle planning as part of the project.',
    category: 'Getting Started',
    dateAdded: '2025-01-08'
  },
  {
    id: '39',
    question: 'How detailed should my requirements be? Can I be too specific or too vague?',
    answer: 'There\'s a sweet spot between too vague and too specific. Both extremes cause problems. Too vague (problems): "Build me a social media app." (Which features? For who? Why?) "Make it look good." (What\'s your style preference? Examples?) "Add whatever features make sense." (Leads to mismatched expectations and disputes.) Impact: I build what I think you want, you imagined something different, expensive rework needed, or project scope balloons without clear boundaries. Too specific (problems): "The login button must be #4287f5 blue, 14.5px border radius, positioned exactly 47px from top." (Micromanagement signals lack of trust.) "Use Redux for state management, Apollo for GraphQL, styled-components for CSS..." (Why? Better options may exist.) "Here\'s a 60-page requirements doc with every pixel specified." (Changes will happen during development anyway.) Impact: Development takes longer and costs more, I can\'t apply my expertise to improve things, changes become expensive because everything\'s locked down, and you\'re paying for execution, not problem-solving. The sweet spot: Problem-focused: "Users need to book appointments and pay in advance." Feature-level: "Users create accounts, browse available times, book slots, get email confirmations, pay via credit card." Priority-ranked: Must-have vs nice-to-have vs future. Visual examples: "I like the flow of [competitor app] for booking, but want cleaner design like [other app]." Outcome-oriented: "Users should be able to complete booking in under 2 minutes." Flexible on how: "I don\'t care what payment processor, as long as it\'s secure and works." Best approach: Describe WHAT you want and WHY, let me suggest HOW. Share examples of apps you like. Trust my expertise on technical decisions. Stay focused on user experience, not implementation details. Be specific about business rules but flexible on technical approach.',
    category: 'Getting Started',
    dateAdded: '2025-01-08'
  },
  {
    id: '40',
    question: 'What makes someone a good client vs a difficult client to work with?',
    answer: 'I love working with engaged, communicative clients. Here\'s what makes collaboration great: Good clients: Respond to questions within 1-2 business days (not demanding instant response, but not leaving me stuck for weeks). Trust the process and technical recommendations ("You\'re the expert on which database to use"). Provide clear, actionable feedback ("The checkout flow is confusing because..." not "I don\'t like it"). Understand that changes cost time and money ("I know this is a change, what would it cost to add?"). Focus on outcomes ("Users need to feel secure") not implementation details ("Make the button #4287f5"). Pay invoices on time per agreement. Communicate when life gets busy ("I\'ll be on vacation next week, responses will be slow"). Celebrate milestones and progress. Difficult clients: Disappear for weeks, then demand immediate answers. Change requirements constantly without acknowledging scope impact ("Just one more small thing..." 20 times). Micromanage implementation details without technical knowledge. Compare every decision to how [big tech company] does it without considering budget differences. Withhold information ("I forgot to mention the app needs to integrate with our legacy system"). Late or disputed payments. Unrealistic expectations ("Why isn\'t it done yet? It\'s been 3 days"). Blame the developer for business model issues ("Why aren\'t people using the app?" That\'s marketing/product-market fit). What I provide to be a good developer: Regular progress updates, honest communication about challenges, proactive problem-solving, transparent pricing for any scope changes, and staying on schedule (or communicating early if issues arise). Best client relationships: Feel like partnerships, clear mutual respect, efficient communication, shared excitement about the project, trust both ways, and often lead to ongoing work and referrals.',
    category: 'Getting Started',
    dateAdded: '2025-01-08'
  },
  {
    id: '41',
    question: 'I need to talk to my co-founder/partner/spouse before deciding. How long should I take?',
    answer: 'Absolutely talk to your decision-making partners—that\'s smart business. Here\'s how to make that conversation productive: What to discuss with them: Show them this FAQ page (seriously—it answers their questions too). Share my portfolio (CardChase, NarcoticTrack) so they see real work. Discuss the 30/40/30 payment structure (milestone-based protection). Review the features list and pricing together. Ask their concerns and bring them to our next call. Timeline guidance: A few days to a week is normal and expected. I hold your spot for 1-2 weeks while you decide. More than 2 weeks usually means you\'re not ready (and that\'s okay). Red flags on my end: "I need 6 months to think about it" means you\'re not serious yet. "My technical friend needs to vet you" often means endless gatekeeping. How I\'ve solved this: Schedule a call with all decision-makers at once (co-founders, technical advisors, investors). I answer everyone\'s questions in 30-60 minutes. This prevents the "telephone game" where information gets lost. Joint decision-making is faster and better. Alternative: Start with a small test project ($1K website) that doesn\'t require extensive buy-in, prove the relationship works, then get approval for the bigger app. Many successful partnerships start this way. What slows people down: Paralysis by analysis (endless research, comparing 20 developers). Waiting for "perfect timing" that never comes. Fear of making the wrong choice (addressed by milestone payments—you\'re never locked in). Bottom line: Take the time you need, but set a deadline for yourself. "I\'ll decide by Friday" is productive. "Let me think about it" without a timeline usually means no. I\'ll follow up once after our call, then leave the ball in your court.',
    category: 'Making the Decision',
    dateAdded: '2025-01-07'
  },
  {
    id: '42',
    question: 'I\'m not sure if now is the right time to build my app. How do I know?',
    answer: 'Timing is never perfect, but there are good and bad times to build. Here\'s honest guidance: Good time to build: You have a clear problem you\'re solving (not just a vague idea). You have budget allocated ($3K-$5K saved or approved). You can commit 2-5 hours per week for feedback and decisions. You have early users waiting or a validation signal (people asking for it). Your business needs this to move forward (not just "nice to have"). You\'re ready to launch in 6-8 weeks (clear timeline and commitment). Bad time to build: You\'re still figuring out your business model (build after you validate the idea). You hope the app will tell you if the idea is good (apps don\'t validate ideas, customers do). You can\'t afford the investment without going into debt (bootstrap something smaller first). You have 5 other higher-priority projects competing for attention. You need it "someday" but not in the next 3 months. How I help with timing: Start with MVP (minimum features) to test the market quickly. Phase the project—build core now, add features later as you grow. Flexible timelines if you\'re coordinating with other launches or funding. Can pause and resume if life happens (though not ideal). Red flag timing: "I want to build it but won\'t launch for a year" (requirements will change, waste of money). "I need it yesterday" (rushed projects have poor outcomes). "I might need it, I\'m not sure" (figure that out first). Reality check from my experience: The best time to build is when you have validated demand (people want it) and committed resources (time and money). The worst time is when you\'re hoping the app will validate your idea. Build the app to serve customers, not to find out if you should have customers. Middle ground: Start with a $1K landing page to collect interest, prove demand, then build the $5K app when you have traction.',
    category: 'Making the Decision',
    dateAdded: '2025-01-07'
  },
  {
    id: '43',
    question: 'What if I build the app and nobody uses it? Am I just wasting money?',
    answer: 'This is the #1 fear of every founder, and it\'s valid. Here\'s the honest truth: Why apps fail (it\'s rarely the code): No real problem solved (you built what YOU wanted, not what users need). No marketing or distribution (if you build it, they won\'t automatically come). Wrong target market (building for "everyone" means nobody). Poor timing (too early or too late to market). Bad user experience (works but confusing or ugly). No unique value (why use yours instead of existing solutions?). Why apps succeed: They solve a real, painful problem for specific people. Founders talk to users constantly and iterate based on feedback. There\'s a distribution plan (how will people find it?). The MVP launches quickly and improves based on real usage. How I reduce your risk: Build MVP first (core features only) to test quickly. $3K-$5K gets you a real working app, not just a prototype. Launch in 4-6 weeks, not 6 months (faster feedback loop). You own the code—if v1 doesn\'t work, v2 uses the same foundation. What I can\'t control (your responsibility): Validating that people actually want this (talk to potential users first). Marketing and user acquisition (I build it, you promote it). Product-market fit (does your solution match market needs?). Pivoting based on feedback (I can help with technical changes, you decide business direction). Smart validation before building: Talk to 10-20 potential users. Would they pay for this? Launch a landing page describing the app. Do people sign up? Offer a manual version first (do the work by hand to prove demand). Build a simple prototype or wireframes to get feedback. My recommendation: If you have validated demand (people asking for it, willing to pay), building the app is low risk. If you\'re hoping the app will create demand, that\'s high risk. Consider validation first, building second. Many successful apps I\'ve built started with founders who had waiting lists before writing a line of code.',
    category: 'Making the Decision',
    dateAdded: '2025-01-07'
  },
  {
    id: '44',
    question: 'I don\'t have the full budget right now. Can we work out a payment plan?',
    answer: 'I understand cash flow challenges, especially for bootstrapped startups. Here\'s what\'s possible: Standard payment structure (what most clients do): 30% deposit to start ($900-$1,500 for a $3K-$5K project). 40% at midpoint when you see working features ($1,200-$2,000). 30% at completion ($900-$1,500). You need 30% to start, but you have 4-6 weeks to gather the rest. What I CAN do: Smaller starter project first: $1K website now, $4K app later when budget allows. Phased development: Build core features now ($2K), add features later ($1K-$2K more). Extended timeline: Slower pace if you need time between milestones (8-10 weeks instead of 4-6). Pause and resume: Stop at midpoint if needed, resume in 2-3 months (not ideal, but doable). What I CAN\'T do: Monthly payment plans ($300/month for 12 months) because I deliver the work upfront. Net-60 or net-90 terms—I\'m not a bank, I need cash flow too. "Pay me when the app makes money" revenue shares (too risky for me). Start without any deposit (I turn down other paying work to commit to you). Why payment structure matters: I\'m a solo developer, not a big agency with credit terms. I need to pay my bills while building your app. Payment milestones protect both of us—you see progress before paying more. Alternative funding options I\'ve seen clients use: Small business loan or line of credit ($5K is minimal for most banks). Credit card (many offer 0% for 12-15 months on new purchases). Friends/family loan for the deposit. Pre-selling to early customers ("Beta access for $100" × 30 customers = $3K). Delaying other expenses to prioritize the app investment. Reality check: If $3K-$5K is a huge stretch, consider whether you\'re ready to launch a business (apps need marketing budget, hosting, ongoing costs too). Starting smaller and growing over time is smarter than overextending financially. Most successful approach: Start with $1K website to prove the concept and relationship, save for 2-3 months while the website generates interest, then build the $4K full app when you have budget and validation.',
    category: 'Making the Decision',
    dateAdded: '2025-01-07'
  },
  {
    id: '45',
    question: 'What if I need changes after we agree on the scope? Will I be stuck?',
    answer: 'You won\'t be stuck—scope changes happen on almost every project. Here\'s exactly how I handle them: Changes during development (before completion): Minor tweaks and refinements: Included in fixed price. Example: "Make that button bigger" or "Change the wording here." Small scope adjustments: Usually absorbed if they\'re reasonable. Example: "Add a forgot password link" when we\'re already doing login. Significant additions: We discuss, I quote the additional cost, you approve or decline. Example: "Add a chat feature" when it wasn\'t in original scope. How the conversation works: You: "I\'d like to add [feature]." Me: "That\'s a new feature outside original scope. It would add $X and Y days. Want to proceed, add to Phase 2, or skip it?" You decide with full information. No surprises. What\'s a "change" vs "bug": Bug: Something that doesn\'t work as originally specified. I fix free within 30 days. Change: New feature or different behavior than agreed scope. Additional cost. Refinement: Making existing features better (usually included). Why this flexibility works: You have final approval on all changes and costs. Small changes don\'t derail the project. Big changes don\'t bankrupt me (or surprise you with bills). Clear communication prevents resentment on both sides. Real examples from past projects: Client wanted to add Stripe payment after we started (originally was going to be free app). I quoted $400 extra, they approved, done. Client wanted to change color scheme halfway through. Minor refinement, no charge. Client wanted to add entire admin dashboard after seeing app. I quoted $2,500 additional. They said "Phase 2," we completed original scope first. Common changes I anticipate: Design preferences (I show options and iterate until you\'re happy—included). User flow improvements (if I see a better way, I suggest it—included). Third-party integration changes (switching from Mailchimp to SendGrid—usually minor cost). Platform additions (want Android after agreeing to iOS only—significant cost). How to minimize change costs: Be thoughtful about initial scope (what do you REALLY need?). Prioritize features as must-have vs nice-to-have. Trust the MVP approach (start small, add later based on real feedback). Communicate questions early rather than waiting. Bottom line: You have total flexibility. Changes just need clear communication and mutual agreement on cost impact. Nobody is "stuck" in a bad situation.',
    category: 'Making the Decision',
    dateAdded: '2025-01-07'
  },
  {
    id: '46',
    question: 'Can I start with just part of the app (MVP) and add features later?',
    answer: 'Absolutely! This is actually the smartest approach for most startups. Here\'s how phased development works: Phase 1 - Core MVP ($2K-$3K, 3-4 weeks): User authentication (signup, login, password reset). One core feature that delivers value. Basic mobile-responsive design. Database and backend setup. Deployment to production (it\'s live and usable). Why start here: Proves the concept with real users. Costs $2K-$3K instead of $5K. Gets you to market in 3-4 weeks instead of 6-8. Validates demand before investing more. Users tell you what features they actually need (vs what you guess). Phase 2 - Based on feedback ($1K-$3K, 2-4 weeks): Most-requested features from Phase 1 users. Integrations (payment, email, etc.) if needed. Design improvements. Performance optimizations. Admin features if your user base justifies it. Phase 3+ - Growth features (variable): Advanced features for power users. Mobile apps (App Store publishing). AI integration. Team/collaboration features. Analytics and reporting. Real example from my clients: Phase 1: Restaurant booking app with calendar and basic reservations ($2.5K). Launched, got 50 users, validated demand. Phase 2: Added Stripe payments and email confirmations ($1.5K). Revenue started flowing. Phase 3: Added admin dashboard for restaurant owners to manage bookings ($2K). Total: $6K spread over 6 months instead of $6K all at once. Each phase was validated before the next. How we structure phased projects: Clear Phase 1 scope agreed upfront. "Phase 2 wish list" documented for later (no commitment). You can hire me for Phase 2 or someone else (you own the code). Typical gap between phases: 1-3 months while you gather users and feedback. Pricing: Each phase is priced separately, usually 20-30% less than building everything at once (because foundation exists). Benefits of this approach: Lower initial investment. Real user feedback guides what to build next. Faster time to market. Ability to pivot if Phase 1 reveals new direction. Cash flow friendly (pay as you grow). When phased doesn\'t make sense: You need all features for launch (regulatory requirement, competitive parity). You have full budget and want it all now. You can\'t launch until everything is complete. My recommendation: 80% of clients should start with MVP Phase 1, validate with users, then build Phase 2. Only 20% need everything at once.',
    category: 'Making the Decision',
    dateAdded: '2025-01-06'
  },
  {
    id: '47',
    question: 'I don\'t have a technical background. Will I be lost during development?',
    answer: 'Not at all! Most of my clients aren\'t technical, and that\'s completely fine. Here\'s how I make it work: I explain things in plain English: Instead of "We\'ll use JWT tokens for stateless authentication," I say "Users stay logged in securely, even if they close the app." Instead of "PostgreSQL with row-level security," I say "Your database is locked down so users can\'t see each other\'s data." Instead of "We need to optimize the bundle size," I say "Making the app load faster." What you need to understand (I\'ll teach you): What the app does (features, user flows, how it works). Why I\'m recommending certain approaches (trade-offs explained simply). What you\'re approving at each milestone (you see and test it yourself). What happens if something goes wrong (and how I\'ll fix it). What you DON\'T need to understand: How the code works internally (that\'s my job). Which libraries or frameworks I\'m using (trust my technical choices). Database schemas or API architecture (invisible to users). DevOps and deployment details (I handle it). How I communicate with non-technical clients: Screen sharing demos where I walk you through the app. Video recordings of new features so you can review on your own time. Simple email updates: "Completed login system. Next: building the dashboard." Screenshots and GIFs showing progress. Test links where you can click around and see it yourself. What helps collaboration: Tell me WHAT you want to accomplish (business goal). Let me figure out HOW to do it technically. Ask questions when you don\'t understand—I\'ll clarify. Focus on user experience, not implementation. Trust that I won\'t use unnecessary technical complexity. Real example: Non-technical client: "I want users to save their favorite items." Me: "Got it. They\'ll have a heart icon on each item. Tapping saves it to a Favorites page. Should favorites sync across devices?" Client: "Yes, that way if they switch phones, favorites come with them." Me: "Perfect. I\'ll build that." No mention of databases, APIs, or sync protocols. Just outcomes. When technical knowledge helps (but isn\'t required): You have strong opinions on user experience (you know your users better than I do). You want to understand what\'s possible vs expensive (I\'ll explain trade-offs). You\'re hiring developers later (understanding basics helps you evaluate them). You want to make minor updates yourself someday (I can teach you the basics). Bottom line: You don\'t need to be technical. You need to be clear about what you want users to accomplish. I translate that into working code and explain it in terms you understand.',
    category: 'Making the Decision',
    dateAdded: '2025-01-06'
  },
  {
    id: '48',
    question: 'What if I get a better quote or offer from another developer after we start?',
    answer: 'This is fair to wonder about. Here\'s the honest reality: Why this happens: You talk to multiple developers over weeks. Someone quotes lower after you\'ve already started with me. You see an ad for "$500 app development!" You meet someone who "knows a guy" who\'ll do it cheaper. What you should do: Be upfront with me: "I got another quote for $2K less. Can you explain the difference?" Let\'s discuss it honestly: Often the "cheaper" quote has hidden costs or missing features. Sometimes it\'s actually better, and I\'ll tell you if that\'s the case. I\'ll help you evaluate fairly (even if it means losing you as a client). What I will and won\'t do: I won\'t match obviously-too-low prices ($500 Fiverr developers—there\'s a reason they\'re cheap). I will explain clearly why my quote is what it is (experience, quality, support, fixed pricing). I might adjust scope if you want fewer features for less money (totally reasonable). I won\'t guilt-trip or pressure you (your project, your choice). What happens if you decide to switch: Before any work starts: Full deposit refund if you change your mind within 48 hours. This is rare, but I honor it. After work has started: You keep all work completed to that point. You pay for milestones completed (30% if I\'ve done design/planning, 70% if midpoint reached). You can take the code to another developer (you own it). No hard feelings—I want you to succeed. Why most clients don\'t switch: The "cheaper" quote often doesn\'t pan out (classic bait and switch). Starting over wastes time (2-3 weeks lost). New developer has learning curve (they need to understand your vision). Milestone structure protects you anyway (you\'ve only paid for what you\'ve seen). The relationship and trust matter more than $500-$1,000 difference. Real-world example: Client got quote from overseas developer for $2K vs my $4K after paying my deposit. We compared line by line: Their quote didn\'t include designs, had 30-day timeline (unrealistic), no support after delivery, and sketchy portfolio. Client stayed with me, app launched successfully in 6 weeks. My confidence: I don\'t compete on lowest price—I compete on value, communication, and reliability. If another developer offers legitimately better value, I\'d rather you go with them than resent working with me. But usually the "better deal" reveals itself as worse once you dig into details. Best approach: Do your comparison shopping BEFORE paying the deposit. Once you commit, give the relationship a fair shot. If you have concerns during the project, raise them immediately.',
    category: 'Making the Decision',
    dateAdded: '2025-01-06'
  },
  {
    id: '49',
    question: 'How do I know the final app will actually be good quality and work properly?',
    answer: 'Quality concerns are totally valid. Here\'s how I ensure you get a solid, working app: During development (you see everything): Weekly progress updates with working demo links. You test features as they\'re built (not just at the end). I fix issues immediately when you find them. You approve each milestone before I move forward. Nothing is hidden until "the big reveal." Quality standards I follow: Cross-browser testing (Chrome, Safari, Firefox on desktop and mobile). Real device testing (iOS and Android phones, tablets). Security best practices (encrypted data, secure authentication, no vulnerabilities). Performance optimization (fast load times, efficient code). Clean, maintainable code (if you hire another developer later, they won\'t curse me). Before launch checklist: All features work as specified. No critical bugs or errors. App loads quickly on average internet speeds. Works on different screen sizes. User flows make sense (tested with real people if possible). Data is secure and backed up. Deployment is stable. What "quality" means practically: Users can complete their tasks without confusion or errors. App doesn\'t crash or show error messages. Design looks professional (not "expensive agency beautiful," but clean and functional). Performance is smooth (no lag, quick responses). Works reliably day after day. What if quality isn\'t meeting expectations: During development: Tell me immediately. I fix it. No extra charge if it\'s in scope. Within 30 days of launch: Bug fixes are free. If something doesn\'t work as specified, I fix it. After 30 days: Bugs from my code: I usually fix free or at deep discount. New features or changes: Normal rates apply. How I\'ve proven quality: 25+ apps delivered since 2019. Live, working examples you can test (CardChase.org, NarcoticTrack.com, FreeQRCoding.com). Client references who vouch for quality and reliability. Zero projects abandoned or left in broken state. Your protection mechanisms: Milestone payments—don\'t pay final 30% until you approve quality. You own the code—if I somehow disappear, hire someone to fix issues. 30-day warranty—anything broken gets fixed free. Test environment access—see it working before launch. Red flags you WON\'T see with me: "Trust me, it\'ll be great at the end" (you see it throughout). Refusing to let you test during development. Making excuses for bugs ("That\'s not a bug, it\'s a feature"). Rushing to completion without proper testing. Disappearing after final payment. Real quality metric: Would I be embarrassed to show this app to other potential clients? If yes, it\'s not done. I include every app in my portfolio (public ones), so quality reflects on me directly.',
    category: 'Making the Decision',
    dateAdded: '2025-01-06'
  },
  {
    id: '50',
    question: 'I\'ve been burned by developers before. How is working with you different?',
    answer: 'I\'m sorry you had a bad experience—it\'s unfortunately common. Here\'s specifically how I\'m different: What probably went wrong before (tell me if this sounds familiar): Developer disappeared mid-project or after deposit. Constant delays and excuses ("Just one more week..."). Features didn\'t work as promised or described. Communication dried up (took days/weeks to respond). Price kept increasing ("That\'ll be extra..."). Code was a mess or you never received it. Project dragged on for months past the deadline. You felt lied to, ignored, or taken advantage of. How I specifically address each of those: I don\'t disappear: 25+ projects completed since 2019, zero abandoned. Verifiable track record (live apps you can check). US-based, findable, with reputation to maintain. Regular communication (at least weekly updates): You get progress demos, test links, and status updates. I respond to questions within 24 hours on business days. If I\'m unavailable (vacation, etc.), I tell you in advance. Fixed pricing with milestone protection: No surprise bills or "that\'s extra" charges. You approve milestones before paying more. Scope changes are discussed and quoted clearly upfront. Realistic timelines I actually hit: I don\'t promise 2 weeks if it takes 6. I build buffer into estimates and communicate early if delays happen. You see progress weekly, so you know we\'re on track. Code quality and ownership: You get clean, documented code you actually own. GitHub access from day one (proof you have the code). Other developers can work on it if needed (it\'s maintainable). Transparency and honesty: I say "I don\'t know, let me research that" instead of faking expertise. I explain tradeoffs honestly instead of promising everything. I tell you if your idea has technical challenges before taking your money. What past clients say (you can verify): "Finally, a developer who actually delivers what they promise." "Communication was night and day compared to [previous developer]." "Refreshing to work with someone honest about timeline and cost." "Felt like a partner, not a vendor." How to verify I\'m different: Check my live portfolio apps (they work, they\'re real). Ask for client references (I\'ll connect you with past clients). Start with smaller test project ($1K) to build trust. Review my contract (clear, fair, protective of both parties). Trust your gut in our initial call (does communication feel different?). What I need from you if you\'ve been burned: Be upfront about your concerns—I\'d rather address them directly. Give clear feedback if something feels off (don\'t let resentment build). Understand I\'m not your previous developer (judge me on my actions). Ask questions instead of assuming the worst. Your protection if I turn out wrong: Milestone payments (you control 70% of payment until the end). Written contract with clear deliverables. Code ownership from day one. My trackable reputation (burning you hurts my business). Bottom line: I can\'t undo your past bad experience, but I can show you what good development partnership looks like. Many of my best long-term clients came to me after being burned. They\'re now my biggest advocates.',
    category: 'Making the Decision',
    dateAdded: '2025-01-06'
  }
];

function FAQ() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'questions' | 'all'>('all');

  // Detect device and PWA mode
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isMobile = window.innerWidth <= 768;

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs by category and search term
  const filteredFAQs = faqs.filter(faq => {
    // First filter by category
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;

    // Then filter by search term
    if (!searchTerm.trim()) {
      return matchesCategory;
    }

    const searchLower = searchTerm.toLowerCase();
    const questionMatch = faq.question.toLowerCase().includes(searchLower);
    const answerMatch = searchMode === 'all' && faq.answer.toLowerCase().includes(searchLower);

    return matchesCategory && (questionMatch || answerMatch);
  });

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
      <SEO
        title="FAQ - App Development Questions"
        description="Common questions about app development costs, timelines, process, and what to expect. Get clear answers about working with AppCatalyst."
        keywords="app development FAQ, app development questions, how long does it take to build an app, app development process, app development timeline"
        path="/faq"
      />
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

      {/* Search Bar */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto 40px auto'
      }}>
        {/* Search Input */}
        <div style={{
          position: 'relative',
          marginBottom: '16px'
        }}>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              border: '1px solid #333333',
              borderRadius: '12px',
              padding: '14px 48px 14px 20px',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FFFFFF';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#333333';
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#999999',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '4px 8px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#999999';
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Search Mode Toggle */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSearchMode('questions')}
            style={{
              backgroundColor: searchMode === 'questions' ? '#FFFFFF' : 'transparent',
              color: searchMode === 'questions' ? '#000000' : '#FFFFFF',
              border: '1px solid #FFFFFF',
              padding: '6px 14px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Questions Only
          </button>
          <button
            onClick={() => setSearchMode('all')}
            style={{
              backgroundColor: searchMode === 'all' ? '#FFFFFF' : 'transparent',
              color: searchMode === 'all' ? '#000000' : '#FFFFFF',
              border: '1px solid #FFFFFF',
              padding: '6px 14px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            All Content
          </button>
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <div style={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '13px',
            color: '#666666'
          }}>
            {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found
          </div>
        )}
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
