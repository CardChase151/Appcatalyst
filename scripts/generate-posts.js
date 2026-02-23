#!/usr/bin/env node
/**
 * Generate all blog posts from the content calendar using Claude API.
 * Run once to generate all drafts, then publish-post.js handles the weekly releases.
 *
 * Usage: ANTHROPIC_API_KEY=sk-xxx node scripts/generate-posts.js
 */

const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '..', 'blog-drafts');
const CALENDAR_PATH = path.join(__dirname, 'content-calendar.json');

async function generatePost(entry) {
  const prompt = `Write a comprehensive, SEO-optimized blog post for an app development company called AppCatalyst.

TITLE: ${entry.title}
TARGET KEYWORD: ${entry.keyword}
BRIEF: ${entry.brief}

REQUIREMENTS:
- Write 1,800-2,500 words of high-quality content
- Use the target keyword naturally 5-8 times throughout
- Structure with H2 and H3 headings (use <h2> and <h3> tags)
- Write in a direct, confident, conversational tone (not corporate or salesy)
- Include specific numbers, data points, and real-world examples
- The author is Chase Kellis, a senior full-stack developer who has built 25+ apps since 2019
- AppCatalyst offers apps from $3K-$5K and websites from $1K
- Tech stack: React Native, React, Supabase, Netlify
- Do NOT include the title (it's rendered separately)
- Do NOT include any frontmatter or metadata
- Output clean HTML only (h2, h3, p, ul, ol, li, strong, blockquote tags)
- Do NOT use emojis
- Include a mid-article callout: <blockquote>Need help with this? <a href="/contact">Get a free quote</a> from AppCatalyst.</blockquote>
- End with a strong conclusion paragraph

Write the HTML content now:`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

function generateStaticHTML(entry, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${entry.title} | AppCatalyst Blog</title>
  <meta name="description" content="${entry.brief.substring(0, 155)}">
  <meta name="keywords" content="${entry.keyword}, app development, AppCatalyst, Chase Kellis">
  <link rel="canonical" href="https://appcatalyst.org/blog/${entry.slug}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${entry.title}">
  <meta property="og:description" content="${entry.brief.substring(0, 155)}">
  <meta property="og:url" content="https://appcatalyst.org/blog/${entry.slug}">
  <meta property="og:image" content="https://appcatalyst.org/profile.png">
  <meta property="og:site_name" content="AppCatalyst">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${entry.title}">
  <meta name="twitter:description" content="${entry.brief.substring(0, 155)}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${entry.title}",
    "author": {
      "@type": "Person",
      "name": "Chase Kellis",
      "jobTitle": "Senior Full Stack Developer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AppCatalyst",
      "url": "https://appcatalyst.org"
    },
    "datePublished": "${entry.publishDate}",
    "dateModified": "${entry.publishDate}",
    "mainEntityOfPage": "https://appcatalyst.org/blog/${entry.slug}",
    "keywords": "${entry.keyword}"
  }
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; color: #ccc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px 20px 100px; line-height: 1.8; font-size: 16px; }
    article { max-width: 700px; margin: 0 auto; }
    h1 { color: #fff; font-size: 32px; font-weight: 800; margin-bottom: 16px; line-height: 1.2; }
    h2 { color: #fff; font-size: 24px; font-weight: 700; margin: 40px 0 16px; }
    h3 { color: #fff; font-size: 18px; font-weight: 600; margin: 32px 0 12px; }
    p { margin-bottom: 16px; }
    ul, ol { margin-bottom: 16px; padding-left: 24px; }
    li { margin-bottom: 8px; }
    strong { color: #fff; }
    a { color: #fff; text-decoration: underline; }
    blockquote { border-left: 3px solid #333; padding: 12px 20px; margin: 16px 0; color: #999; font-style: italic; }
    .meta { color: #666; font-size: 13px; margin-bottom: 32px; }
    .author { display: flex; align-items: center; gap: 16px; margin-top: 48px; padding-top: 24px; border-top: 1px solid #222; }
    .author img { width: 48px; height: 48px; border-radius: 50%; }
    .author-info p { margin: 0; }
    .author-name { font-size: 14px; font-weight: 600; color: #fff; }
    .author-bio { font-size: 12px; color: #666; }
    .cta { margin-top: 48px; padding: 32px; border: 1px solid #333; border-radius: 12px; text-align: center; background: #0a0a0a; }
    .cta h3 { margin: 0 0 8px; }
    .cta p { color: #999; font-size: 14px; }
    .cta a { display: inline-block; background: #fff; color: #000; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; margin-top: 16px; }
    .back { display: inline-block; color: #fff; text-decoration: none; font-size: 13px; border: 1px solid #333; padding: 8px 16px; border-radius: 12px; margin-bottom: 40px; }
  </style>
</head>
<body>
  <article>
    <a href="/blog" class="back">Back to Blog</a>
    <h1>${entry.title}</h1>
    <div class="meta">${entry.publishDate} | By Chase Kellis</div>
    ${content}
    <div class="cta">
      <h3>Ready to build your app?</h3>
      <p>Get a free quote for your project. Apps from $5K, websites from $1K.</p>
      <a href="/contact">Get a Free Quote</a>
    </div>
    <div class="author">
      <img src="/profile.png" alt="Chase Kellis">
      <div class="author-info">
        <p class="author-name">Chase Kellis</p>
        <p class="author-bio">Senior Full Stack Developer at AppCatalyst. 25+ apps shipped since 2019.</p>
      </div>
    </div>
  </article>
</body>
</html>`;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY environment variable');
    process.exit(1);
  }

  const calendar = JSON.parse(fs.readFileSync(CALENDAR_PATH, 'utf-8'));

  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }

  for (const entry of calendar) {
    const draftPath = path.join(DRAFTS_DIR, `${entry.slug}.json`);
    const htmlPath = path.join(DRAFTS_DIR, `${entry.slug}.html`);

    if (fs.existsSync(draftPath)) {
      console.log(`[SKIP] ${entry.slug} - already generated`);
      continue;
    }

    console.log(`[GENERATING] ${entry.title}...`);

    try {
      const content = await generatePost(entry);

      // Calculate read time (~200 words per minute)
      const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTime = `${Math.max(5, Math.ceil(wordCount / 200))} min read`;

      // Save draft JSON (for the React app)
      const draft = {
        slug: entry.slug,
        title: entry.title,
        description: entry.brief.substring(0, 200),
        keyword: entry.keyword,
        publishDate: entry.publishDate,
        readTime: readTime
      };
      fs.writeFileSync(draftPath, JSON.stringify(draft, null, 2));

      // Save content HTML (loaded by blog post component)
      fs.writeFileSync(path.join(DRAFTS_DIR, `${entry.slug}.content.html`), content);

      // Save static HTML page (for SEO crawlers)
      fs.writeFileSync(htmlPath, generateStaticHTML(entry, content));

      console.log(`[DONE] ${entry.slug} (${wordCount} words, ${readTime})`);

      // Rate limit - wait 2 seconds between API calls
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`[ERROR] ${entry.slug}: ${err.message}`);
    }
  }

  console.log('\nAll posts generated. Run publish-post.js to publish the next one.');
}

main();
