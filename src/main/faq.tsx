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
  },
  {
    id: '21',
    question: 'Why are overseas developers cheaper? What are the hidden risks?',
    answer: 'Overseas developers (India, Pakistan, Philippines, Eastern Europe) charge less due to lower cost of living—$15-30/hour vs $100-150/hour in the US. However, the "savings" often disappear through hidden costs: Communication barriers create misunderstandings that require expensive rework (I\'ve seen 40% of project time wasted on clarifications). Timezone differences mean 12-24 hour delays on every question or bug fix. Quality issues are common—junior developers pose as seniors, code lacks documentation, security vulnerabilities go unnoticed. Project abandonment happens frequently—they take deposits and disappear, or abandon projects halfway when better-paying clients come along. No legal recourse—if things go wrong, good luck enforcing contracts internationally. Hidden charges appear constantly—"That feature will cost extra" after you\'ve already paid. The average startup spends $15K-$25K with overseas teams (multiple attempts, rework, hiring someone to fix it) for what should\'ve been a $5K project. My pricing matches overseas final costs but with US communication, reliability, and quality. You\'re not paying more—you\'re avoiding expensive mistakes.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '22',
    question: 'I\'m getting quotes from multiple developers. How do I choose?',
    answer: 'Smart move! Here\'s how to evaluate quotes effectively: First, compare scope, not just price—a $2K quote with limited features isn\'t cheaper than $5K for a complete app. Ask what\'s NOT included (App Store publishing, designs, revisions, hosting setup). Check communication quality—if they\'re slow or unclear during sales, it gets worse during development. Review portfolios critically—can you see live working apps, or just screenshots? Ask for client references you can actually call. Evaluate technical choices—do they explain why they chose certain technologies, or just use buzzwords? Understand payment terms—milestone-based protects you, 100% upfront is a red flag. Consider timezone and availability—will they respond in your working hours? Look for transparency—honest developers explain limitations and tradeoffs, dishonest ones promise everything. Red flags include: quotes significantly below everyone else, no clear timeline, unwillingness to show previous work, pressure to decide quickly, vague proposals without specifics, and no contract or unclear terms. The cheapest quote often becomes the most expensive project. Choose based on communication quality, portfolio, and realistic scope—not just the lowest number.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '23',
    question: 'What happens if I go with the cheapest developer and it doesn\'t work out?',
    answer: 'This is the most common painful lesson in app development. Here\'s what typically happens: You pay $2K-$5K to a cheap developer (overseas or inexperienced US developer). Initial progress seems good—they show screenshots, you\'re excited. Problems emerge—features don\'t work properly, bugs multiply, communication slows down. They ask for more money—"This feature is more complex than expected." You\'re stuck—you\'ve already paid, starting over means losing everything. Project drags on—2 months becomes 6 months, promises are broken repeatedly. You finally give up—the app is unusable, half-finished, or completely abandoned. Now you\'re in a worse position: You\'ve spent $2K-$8K with nothing usable, you\'ve wasted 3-6 months while competitors moved ahead, you need to start completely over (can\'t use the bad code), you\'re demoralized and skeptical of all developers, and you need to explain the failed project to investors or partners. Recovery cost: Hiring a proper developer now costs $8K-$15K because they need to understand your failed attempt, rebuild from scratch (bad code is worse than no code), regain lost time, and rebuild your confidence. Total cost: $10K-$23K and 9-12 months for what should\'ve been $5K and 6 weeks. I\'ve rescued dozens of these projects—the cheapest option is rarely the least expensive.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '24',
    question: 'How do I know you won\'t abandon my project halfway through?',
    answer: 'Great question—project abandonment is a real fear, especially after bad experiences. Here\'s what protects you when working with me: Track record: I\'ve completed 25+ apps and 30+ websites since 2019 without a single abandoned project. Verifiable portfolio: All my public projects (CardChase, NarcoticTrack, FreeQRCoding) are live and maintained—you can verify them yourself. Milestone payments: You never pay for work you haven\'t seen—30% to start, 40% at midpoint when you see working features, 30% at completion. You control the money. Local presence: I\'m US-based with a reputation to maintain—you can find me, unlike anonymous overseas contractors. Open communication: You get regular updates (at least weekly), access to development environment to see real-time progress, and direct communication (no middlemen or account managers). Client references: I\'ll connect you with previous clients who can vouch for project completion and support. Legal protection: Clear contracts with deliverables, timelines, and recourse if things go wrong. Source code access: You get code repositories from day one—even if I disappeared tomorrow, you\'d have everything. Why I don\'t abandon projects: My business depends on referrals and reputation, I price projects to be profitable at completion, and I enjoy finishing what I start. If you\'re worried, start with a smaller project to build trust.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '25',
    question: 'What are the red flags I should watch for when hiring a developer?',
    answer: 'After 6+ years, I\'ve seen every scam and bad practice. Watch for these warning signs: Pricing red flags: Quote is 50%+ below everyone else (if it seems too good to be true, it is), vague pricing without scope details, demands 100% payment upfront, constantly changes price mid-project, or charges hourly with no cap or estimate. Communication red flags: Takes days to respond during sales process (gets worse later), uses only email/chat (no video calls), English is barely understandable, avoids answering direct questions, or uses high-pressure tactics ("special price if you sign today"). Portfolio red flags: Only shows mockups/designs (no live working apps), can\'t provide URLs to verify projects, portfolio looks suspiciously professional for their prices, claims credit for well-known apps without proof, or refuses to provide client references. Technical red flags: Can\'t explain their technology choices in simple terms, promises everything is possible (no limitations discussed), doesn\'t ask questions about your needs (just agrees with everything), uses outdated technologies, or won\'t show development progress until "it\'s done." Legal red flags: No written contract or agreement, unclear deliverables or timelines, no refund policy or dispute resolution, works only through freelance platforms (no direct relationship), or company/identity can\'t be verified. Trust your gut—if something feels off, it probably is. Professional developers are transparent, communicative, and set realistic expectations.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '26',
    question: 'Why do some developers quote $50K+ while you charge $3K-$5K for similar apps?',
    answer: 'The pricing gap exists for real reasons. Large agencies ($50K-$150K) charge more because of: Overhead costs—fancy offices, sales teams, account managers, legal departments. Multiple layers—project manager, designer, senior developer, junior developer, QA tester all billing hours. Hourly billing—they bill for meetings, emails, revisions, everything (100-500 hours × $100-150/hour). Risk buffer—they pad estimates to cover unexpected issues. Premium brand—some clients only trust expensive agencies. What you actually get: The same React/Supabase app I\'d build, lots of meetings and paperwork, polished presentations, and often junior developers doing the actual work. I charge less because: Solo operation—I do design, development, and project management myself (no overhead). Fixed pricing—I optimize for efficiency since I can\'t bill extra hours. Startup focus—I deliberately target price-sensitive clients that agencies ignore. Simple process—minimal meetings, maximum coding. I keep the code and capabilities. What you don\'t get: A fancy office to visit, dedicated account manager, unlimited meetings, or a big brand name. For startups and small businesses, agencies are overkill. You need a working app, not PowerPoint presentations. That said, enterprise clients with $500K budgets should hire agencies—they have different needs (compliance teams, procurement processes, risk mitigation). Know your needs and pay accordingly.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '27',
    question: 'I found a developer on Fiverr/Upwork for $500. Why shouldn\'t I try that first?',
    answer: 'I understand the temptation—$500 vs $5,000 is compelling. But here\'s the reality of $500 app development: What you actually get: A template they\'ve sold to 50 other people with your logo swapped in, broken features that look good in demos but don\'t work, no backend/database (just a frontend shell), stolen code from other projects, zero security measures, no documentation or ability to modify it, and they disappear after payment. What happens next: You realize it doesn\'t work within days, they won\'t respond to fix issues or charge extra for every small change, you can\'t hire another developer to fix it (code is a mess or you don\'t have access), you\'re back to square one after wasting $500 and 2-3 weeks, and you now need to hire a real developer anyway—starting from zero. The math: $500 wasted + $5,000 real development = $5,500 total and 2 months lost. Or just $5,000 and 1.5 months with a real developer. When $500 makes sense: Logo design, simple landing page (no functionality), graphic design work, or content writing. When it never makes sense: Full applications with login, database, and multiple features. Nobody with real skills works for $500 on complex projects—they can make $3K-$10K per project elsewhere. If you want to test the waters cheaply, I\'d recommend starting with a $1K simple website to see if we work well together, then upgrading to a full app. That\'s a smart test, not a false economy.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '28',
    question: 'What are the hidden costs I should budget for beyond the development price?',
    answer: 'Good question—many developers don\'t discuss this upfront, leading to budget surprises. Here\'s what you actually need beyond the development cost: Domain name: $10-20/year for your custom domain (yourstartup.com). Hosting: $0-50/month initially on Vercel/Netlify (free tier works for startups), scales to $100-500/month with growth. Database hosting: Included in Supabase free tier initially, $25-100/month as you grow. Third-party services: Stripe fees (2.9% + 30¢ per transaction if you accept payments), email service $0-50/month (SendGrid free tier covers most startups), SMS/phone verification $10-50/month if you use it, and Google Maps API $0-200/month depending on usage. Developer accounts (if publishing to stores): Apple Developer Program $99/year, Google Play $25 one-time. Maintenance: $0 if you handle it yourself, $200-500/month if you want me to handle updates and fixes. SSL certificate: Free with Vercel/Netlify/Cloudflare. What\'s NOT a hidden cost with me: Revisions during development (included in fixed price), bug fixes within 30 days (included), deployment setup (included), basic documentation (included). Realistic first-year budget beyond my development fee: Minimum: $200 (domain + keeping everything on free tiers), Typical: $500-1,000 (domain + basic paid services + Apple Developer account), Growth: $2,000-5,000 (as your user base grows and you need more server capacity). I\'ll help you optimize costs and stay on free tiers as long as possible.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '29',
    question: 'How do I know the code quality is good? Can I own the code?',
    answer: 'Code quality and ownership are critical—you\'re making a business investment, not just buying a service. Code quality assurances I provide: Modern best practices: TypeScript for type safety, ESLint for code consistency, component-based architecture for maintainability, and clean folder structure that makes sense. Security standards: No hardcoded secrets, encrypted sensitive data, secure authentication, SQL injection prevention, and regular dependency updates. Performance optimization: Lazy loading for faster load times, optimized images, efficient database queries, and minimal bundle sizes. Documentation: README with setup instructions, comments explaining complex logic, environment variable examples, and deployment guides. Testing: Manual testing of all features, cross-browser/device testing, and edge case handling. Code ownership: You get full ownership from day one. Specifically: Complete source code in a GitHub repository (you control access), all design files and assets, database schemas and migration files, API keys and credentials, and deployment configurations. You can: Hire another developer to work on it, sell the code/app if you want, modify anything yourself, host it anywhere you choose, and never pay me again if you don\'t want to. Unlike agencies that keep code in their repositories or use proprietary systems, you truly own everything. I can do a code review call after completion to walk through the structure and answer questions. Think of it like buying a house—you own it completely after purchase, even though I built it.',
    category: 'Choosing a Developer',
    dateAdded: '2025-01-15'
  },
  {
    id: '30',
    question: 'Should I hire a local developer I can meet in person, or is remote okay?',
    answer: 'This is a valid consideration, and the answer depends on your priorities. In-person developers (local to you): Pros include face-to-face meetings can build trust faster, easier to drop by their office if needed, same timezone for real-time communication, and local legal recourse if issues arise. Cons include much higher rates ($150-250/hour in major cities), limited talent pool (you\'re restricted to your city), and you\'re paying for office overhead in their pricing. Remote developers (like me): Pros include access to talent anywhere in the US, lower rates due to lower cost of living areas, more flexibility in communication (async updates work well), and proven processes for remote collaboration (I\'ve done this for 6+ years). Cons include no face-to-face meetings (though video calls work great), requires trust in someone you haven\'t met in person, and timezone differences if working across coasts. The reality in 2025: 80% of software development is remote—even "local" developers often work from home. Video calls, screen sharing, and project management tools make remote work seamless. The skills and communication quality matter more than physical location. My approach: Regular video calls for face-time connection, shared screens to show real-time progress, detailed written updates you can review anytime, and fast response times during business hours. Many clients are surprised how collaborative remote work feels. If you\'re in my area (check my contact page), we can meet for coffee to start the relationship if you prefer—but most clients find it unnecessary after our first video call.',
    category: 'Choosing a Developer',
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
