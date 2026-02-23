import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Search } from 'lucide-react';
import BottomBar from '../menu/bottombar';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  publishDate: string;
  readTime: string;
}

function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blog/posts.json')
      .then(res => res.json())
      .then(data => {
        const today = new Date().toISOString().split('T')[0];
        const published = data.filter((p: BlogPost) => p.publishDate <= today);
        published.sort((a: BlogPost, b: BlogPost) => b.publishDate.localeCompare(a.publishDate));
        setPosts(published);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingBottom: '100px',
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
            cursor: 'pointer'
          }}
        >
          Home
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Blog</h1>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{
          color: '#999999',
          fontSize: '16px',
          lineHeight: '1.6',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Insights on app development, pricing, technology, and growing your business with custom software.
        </p>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666666' }}>Loading...</p>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#666666', fontSize: '16px' }}>New articles coming soon.</p>
            <p style={{ color: '#444444', fontSize: '14px', marginTop: '8px' }}>Check back every Monday for fresh content.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map(post => (
              <article
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}`)}
                style={{
                  border: '1px solid #222222',
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#0A0A0A'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#444444';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  color: '#666666',
                  fontSize: '12px'
                }}>
                  <span>{formatDate(post.publishDate)}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '0 0 8px 0',
                  color: '#FFFFFF',
                  lineHeight: '1.3'
                }}>
                  {post.title}
                </h2>

                <p style={{
                  color: '#999999',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0 0 16px 0'
                }}>
                  {post.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  Read more <ArrowRight size={14} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <BottomBar activeTab="blog" />
    </div>
  );
}

export default Blog;
