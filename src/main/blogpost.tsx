import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import BottomBar from '../menu/bottombar';
import SEO from '../components/SEO';

interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  publishDate: string;
  readTime: string;
  content: string;
}

function BlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blog/posts.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: BlogPostData) => p.slug === slug);
        if (found) {
          // Load the full content
          fetch(`/blog-content/${slug}.html`)
            .then(res => res.text())
            .then(html => {
              setPost({ ...found, content: html });
              setLoading(false);
            })
            .catch(() => {
              setPost(found);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // Title handled by SEO component

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleShare = async () => {
    const url = `https://appcatalyst.org/blog/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, url });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#666666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#FFFFFF', padding: '40px 20px', textAlign: 'center' }}>
        <h1>Post not found</h1>
        <button onClick={() => navigate('/blog')} style={{ color: '#FFFFFF', background: 'none', border: '1px solid #333', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingBottom: '100px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <SEO
        title={post.title}
        description={post.description}
        keywords={post.keyword}
        path={`/blog/${slug}`}
        type="article"
      />
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => navigate('/blog')}
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid #333333',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ArrowLeft size={14} /> Blog
        </button>
        <button
          onClick={handleShare}
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid #333333',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Share2 size={14} /> Share
        </button>
      </header>

      <article style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
          color: '#666666',
          fontSize: '13px'
        }}>
          <span>{formatDate(post.publishDate)}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          margin: '0 0 16px 0',
          lineHeight: '1.2',
          letterSpacing: '-0.5px'
        }}>
          {post.title}
        </h1>

        <p style={{
          color: '#999999',
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '0 0 32px 0',
          borderBottom: '1px solid #222222',
          paddingBottom: '32px'
        }}>
          {post.description}
        </p>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
          style={{
            color: '#CCCCCC',
            fontSize: '16px',
            lineHeight: '1.8'
          }}
        />

        <div style={{
          marginTop: '48px',
          padding: '32px',
          border: '1px solid #333333',
          borderRadius: '12px',
          textAlign: 'center',
          backgroundColor: '#0A0A0A'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0' }}>
            Ready to build your app?
          </h3>
          <p style={{ color: '#999999', fontSize: '14px', margin: '0 0 20px 0' }}>
            Get a free quote for your project. Apps from $5K, websites from $1K.
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
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Get a Free Quote
          </button>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '24px',
          borderTop: '1px solid #222222',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <img src="/profile.png" alt="Chase Kellis" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 2px 0' }}>Chase Kellis</p>
            <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>Senior Full Stack Developer at AppCatalyst. 25+ apps shipped since 2019.</p>
          </div>
        </div>
      </article>

      <style>{`
        .blog-content h2 {
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 40px 0 16px 0;
        }
        .blog-content h3 {
          font-size: 18px;
          font-weight: 600;
          color: #FFFFFF;
          margin: 32px 0 12px 0;
        }
        .blog-content p {
          margin: 0 0 16px 0;
        }
        .blog-content ul, .blog-content ol {
          margin: 0 0 16px 0;
          padding-left: 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content strong {
          color: #FFFFFF;
        }
        .blog-content a {
          color: #FFFFFF;
          text-decoration: underline;
        }
        .blog-content blockquote {
          border-left: 3px solid #333333;
          padding: 12px 20px;
          margin: 16px 0;
          color: #999999;
          font-style: italic;
        }
      `}</style>

      <BottomBar activeTab="blog" />
    </div>
  );
}

export default BlogPost;
