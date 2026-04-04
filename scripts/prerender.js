#!/usr/bin/env node
/**
 * Prerender static HTML files for each route so Google sees unique
 * <title>, canonical, meta description, and body content per URL
 * instead of the identical SPA shell. This fixes the "Alternate page
 * with proper canonical tag" issue in Search Console where Google
 * deduped every route under the homepage canonical.
 *
 * For each route defined below, this script:
 *  1. Reads build/index.html as a template
 *  2. Replaces <title>, description, adds canonical + og tags
 *  3. Injects a unique <noscript> body with H1 + description so bots
 *     that don't execute JS still see distinct content
 *  4. Writes build/<route>/index.html
 *
 * Netlify serves static files before hitting the SPA fallback in
 * _redirects, so /contact will get build/contact/index.html directly
 * (Googlebot sees unique HTML), while client-side navigation still
 * works because React hydrates over it.
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = 'https://appcatalyst.org';

// Metadata must stay in sync with src/main/*.tsx <SEO> props
const ROUTES = [
  {
    path: '/pricing',
    title: 'App Development Pricing',
    description: 'Transparent, fixed-price app development. Websites from $1K, mobile apps from $3K-$5K. No hidden fees, no hourly billing. Orange County based, serving clients nationwide.',
    keywords: 'app development pricing, how much does an app cost, affordable app development cost, fixed price app developer, mobile app pricing, website development cost, cheap app development pricing',
    h1: 'App Development Pricing',
    body: 'Transparent, fixed-price pricing for custom apps and websites. Websites from $1,000. Mobile apps from $3,000 to $5,000. No hidden fees, no hourly billing, no surprises. Orange County based senior developer serving clients nationwide.',
  },
  {
    path: '/work',
    title: 'Our Work - App Portfolio',
    description: 'See 25+ apps and websites built by AppCatalyst. Real projects for real businesses including healthcare apps, trading platforms, and business tools. React Native and React development.',
    keywords: 'app development portfolio, mobile app examples, react native apps, app developer work samples, custom app projects, startup app portfolio',
    h1: 'Our Work',
    body: 'Portfolio of 25+ apps and websites built by AppCatalyst since 2019. Real projects for real businesses including healthcare apps, trading platforms, business tools, and startup MVPs. Built with React Native, React, and Supabase.',
  },
  {
    path: '/contact',
    title: 'Contact - Get a Free Quote',
    description: 'Get a free app development quote from AppCatalyst. Tell us about your project and get transparent pricing within 24 hours. Based in Orange County, CA, serving clients nationwide.',
    keywords: 'app development quote, hire app developer, contact app developer, get app built, free app quote, app development consultation',
    h1: 'Contact AppCatalyst',
    body: 'Get a free app development quote. Tell us about your project and receive transparent, fixed-price quotes within 24 hours. Orange County based senior developer, serving startups and small businesses nationwide.',
  },
  {
    path: '/pwa',
    title: 'Install App - Progressive Web App',
    description: 'Install AppCatalyst as a progressive web app on your device. Fast, native-like experience right from your home screen.',
    keywords: 'progressive web app, install web app, PWA app development',
    h1: 'Install AppCatalyst',
    body: 'Install AppCatalyst as a progressive web app on your phone, tablet, or desktop. Get a fast, native-like experience directly from your home screen. Learn more about PWA development at AppCatalyst.',
  },
  {
    path: '/faq',
    title: 'FAQ - App Development Questions',
    description: 'Common questions about app development costs, timelines, process, and what to expect. Get clear answers about working with AppCatalyst.',
    keywords: 'app development FAQ, app development questions, how long does it take to build an app, app development process, app development timeline',
    h1: 'Frequently Asked Questions',
    body: 'Answers to common questions about app development costs, timelines, and process. How long does it take to build an app, how much does it cost, what technology do we use, and what to expect when working with AppCatalyst.',
  },
  {
    path: '/blog',
    title: 'Blog - App Development Insights',
    description: 'Practical guides on app development costs, timelines, and strategy for startups and small businesses. Learn what it really costs to build an app in 2026.',
    keywords: 'app development blog, how much does an app cost, app development guide, startup app tips, mobile app cost breakdown',
    h1: 'AppCatalyst Blog',
    body: 'Practical guides on app development costs, timelines, and strategy for startups and small businesses. Learn what it really costs to build an app in 2026, how to find a good developer, and how to avoid common pitfalls.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'AppCatalyst privacy policy. Learn how we collect, use, and protect your data across our applications.',
    h1: 'Privacy Policy',
    body: 'AppCatalyst privacy policy. How we collect, use, and protect user data across our applications and services.',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions',
    description: 'AppCatalyst terms and conditions for use of our applications and services.',
    h1: 'Terms and Conditions',
    body: 'AppCatalyst terms and conditions for use of our applications and services.',
  },
  {
    path: '/csae-policy',
    title: 'CSAE Policy',
    description: 'AppCatalyst child safety and anti-exploitation policy. Zero tolerance for CSAE across all applications.',
    h1: 'Child Safety and Anti-Exploitation Policy',
    body: 'AppCatalyst child safety and anti-exploitation policy. Zero tolerance for CSAE across all applications.',
  },
];

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function prerender(template, route) {
  const url = `${BASE_URL}${route.path}`;
  const fullTitle = `${route.title} | AppCatalyst - Chase Kellis`;

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escape(fullTitle)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escape(route.description)}"/>`
  );

  // Replace keywords if provided
  if (route.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escape(route.keywords)}"/>`
    );
  }

  // Inject canonical + OG/Twitter tags right before </head>
  const headInjection = `
    <link rel="canonical" href="${url}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="${url}"/>
    <meta property="og:title" content="${escape(fullTitle)}"/>
    <meta property="og:description" content="${escape(route.description)}"/>
    <meta property="og:image" content="${BASE_URL}/profile.png"/>
    <meta property="og:site_name" content="AppCatalyst"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:url" content="${url}"/>
    <meta name="twitter:title" content="${escape(fullTitle)}"/>
    <meta name="twitter:description" content="${escape(route.description)}"/>
    <meta name="twitter:image" content="${BASE_URL}/profile.png"/>
  </head>`;
  html = html.replace('</head>', headInjection);

  // Replace noscript content with route-specific H1 + body so bots
  // that don't run JS (and Google's first-pass crawl) see unique content
  const noscriptHtml = `<noscript><div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:-apple-system,sans-serif;color:#333"><h1>${escape(route.h1)}</h1><p>${escape(route.body)}</p><p><a href="${BASE_URL}">AppCatalyst Home</a> | <a href="${BASE_URL}/work">Our Work</a> | <a href="${BASE_URL}/pricing">Pricing</a> | <a href="${BASE_URL}/contact">Contact</a></p></div></noscript>`;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptHtml);

  return html;
}

function main() {
  const templatePath = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`ERROR: ${templatePath} not found. Run "npm run build" first.`);
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  let count = 0;
  for (const route of ROUTES) {
    const html = prerender(template, route);
    // Write as build/<slug>.html (not <slug>/index.html) so Netlify
    // serves it directly at /<slug> without a 301 to /<slug>/
    const slug = route.path.replace(/^\//, '');
    const outPath = path.join(BUILD_DIR, `${slug}.html`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`  prerendered ${route.path} -> ${path.relative(BUILD_DIR, outPath)}`);
    count++;
  }

  // Also fix the homepage: add canonical to build/index.html so / has it too
  const homeHtml = template
    .replace(
      /<\/head>/,
      `  <link rel="canonical" href="${BASE_URL}/"/>\n  </head>`
    );
  fs.writeFileSync(templatePath, homeHtml, 'utf8');
  console.log(`  added canonical to / (build/index.html)`);

  console.log(`\nPrerendered ${count} routes.`);
}

main();
