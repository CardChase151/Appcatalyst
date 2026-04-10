#!/usr/bin/env node
/**
 * Publish the next blog post.
 * Moves the next unpublished draft to public/blog/ and commits + pushes.
 * Designed to run every Monday via LaunchAgent.
 *
 * Usage: node scripts/publish-post.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.join(__dirname, '..');
const DRAFTS_DIR = path.join(PROJECT_DIR, 'blog-drafts');
const PUBLIC_BLOG = path.join(PROJECT_DIR, 'public', 'blog');
const PUBLIC_BLOG_CONTENT = path.join(PROJECT_DIR, 'public', 'blog-content');
const POSTS_JSON = path.join(PUBLIC_BLOG, 'posts.json');
const CALENDAR_PATH = path.join(__dirname, 'content-calendar.json');
const SITEMAP_PATH = path.join(PROJECT_DIR, 'public', 'sitemap.xml');

function main() {
  // Load current published posts
  let published = [];
  if (fs.existsSync(POSTS_JSON)) {
    published = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf-8'));
  }
  const publishedSlugs = new Set(published.map(p => p.slug));

  // Load calendar to find next post to publish
  const calendar = JSON.parse(fs.readFileSync(CALENDAR_PATH, 'utf-8'));
  const today = new Date().toISOString().split('T')[0];

  // Find posts that are due (publishDate <= today) and not yet published
  const due = calendar.filter(entry =>
    entry.publishDate <= today && !publishedSlugs.has(entry.slug)
  );

  if (due.length === 0) {
    console.log('No posts due for publishing today.');
    return;
  }

  // Publish each due post
  for (const entry of due) {
    const draftJson = path.join(DRAFTS_DIR, `${entry.slug}.json`);
    const draftContent = path.join(DRAFTS_DIR, `${entry.slug}.content.html`);
    const draftStaticHtml = path.join(DRAFTS_DIR, `${entry.slug}.html`);

    if (!fs.existsSync(draftJson)) {
      console.log(`[SKIP] ${entry.slug} - draft not generated yet. Run generate-posts.js first.`);
      continue;
    }

    // Read draft metadata
    const postMeta = JSON.parse(fs.readFileSync(draftJson, 'utf-8'));

    // Copy content HTML to public/blog-content/ (kept out of public/blog/
    // so it doesn't shadow the prerendered standalone page that Netlify
    // serves to crawlers at /blog/<slug>)
    if (fs.existsSync(draftContent)) {
      if (!fs.existsSync(PUBLIC_BLOG_CONTENT)) {
        fs.mkdirSync(PUBLIC_BLOG_CONTENT, { recursive: true });
      }
      fs.copyFileSync(draftContent, path.join(PUBLIC_BLOG_CONTENT, `${entry.slug}.html`));
    }

    // Copy static HTML for SEO
    if (fs.existsSync(draftStaticHtml)) {
      // Create slug directory for clean URLs
      const slugDir = path.join(PUBLIC_BLOG, entry.slug);
      if (!fs.existsSync(slugDir)) {
        fs.mkdirSync(slugDir, { recursive: true });
      }
      fs.copyFileSync(draftStaticHtml, path.join(slugDir, 'index.html'));
    }

    // Add to published list
    published.push(postMeta);
    console.log(`[PUBLISHED] ${entry.title}`);
  }

  // Sort by date descending
  published.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  // Write updated posts.json
  fs.writeFileSync(POSTS_JSON, JSON.stringify(published, null, 2));

  // Update sitemap with new blog posts
  updateSitemap(published);

  // Git commit and push (only when running locally, not in GitHub Actions)
  if (!process.env.GITHUB_ACTIONS) {
    try {
      execSync('git add public/blog/ public/blog-content/', { cwd: PROJECT_DIR, stdio: 'pipe' });
      execSync('git add public/sitemap.xml', { cwd: PROJECT_DIR, stdio: 'pipe' });

      const titles = due.map(d => d.title).join(', ');
      const msg = `Publish blog: ${titles}`;
      execSync(`git commit -m "${msg}"`, { cwd: PROJECT_DIR, stdio: 'pipe' });
      execSync('git push', { cwd: PROJECT_DIR, stdio: 'pipe' });

      console.log('[GIT] Committed and pushed. Netlify will auto-deploy.');
    } catch (err) {
      console.error('[GIT] Error:', err.message);
    }
  } else {
    console.log('[CI] Running in GitHub Actions - git handled by workflow.');
  }
}

function updateSitemap(published) {
  if (!fs.existsSync(SITEMAP_PATH)) return;

  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');

  // Add blog listing page if not present
  if (!sitemap.includes('appcatalyst.org/blog')) {
    const blogEntry = `  <url>
    <loc>https://appcatalyst.org/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    sitemap = sitemap.replace('</urlset>', `${blogEntry}\n</urlset>`);
  }

  // Add each published post
  for (const post of published) {
    const postUrl = `https://appcatalyst.org/blog/${post.slug}`;
    if (!sitemap.includes(postUrl)) {
      const postEntry = `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${post.publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

      sitemap = sitemap.replace('</urlset>', `${postEntry}\n</urlset>`);
    }
  }

  fs.writeFileSync(SITEMAP_PATH, sitemap);
  console.log('[SITEMAP] Updated with blog posts.');
}

main();
