import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomBar from '../menu/bottombar';

function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Check if it's demo user
  const isDemoUser = user?.email === 'viewer@gmail.com' || localStorage.getItem('demoAuth') === 'true';

  // User info - demo or real
  const userInfo = isDemoUser ? {
    name: 'Demo User',
    email: 'viewer@gmail.com',
    joinDate: 'January 1, 2024',
    accountType: 'Demo Account',
    avatar: '👤',
    stats: {
      savedItems: 12,
      searchHistory: 45,
      eventsCreated: 8
    }
  } : {
    name: user?.user_metadata?.full_name || 'User',
    email: user?.email || '',
    joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'Recently',
    accountType: 'Standard Account',
    avatar: '👤',
    stats: {
      savedItems: 0,
      searchHistory: 0,
      eventsCreated: 0
    }
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleReset = () => {
    localStorage.removeItem('onboardingCompleted');
    localStorage.removeItem('demoAuth');
    signOut();
    window.location.href = '/';
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          Profile
        </h1>

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
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Home
        </button>
      </header>

      {/* Profile Card */}
      <div style={{
        backgroundColor: '#000000',
        border: '1px solid #333333',
        borderRadius: '16px',
        padding: '40px',
        marginBottom: '24px'
      }}>
        {/* Avatar and Basic Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '80px',
            marginBottom: '16px',
            backgroundColor: '#000000',
            border: '2px solid #FFFFFF',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {userInfo.avatar}
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            color: '#FFFFFF'
          }}>
            {userInfo.name}
          </h2>

          <p style={{
            color: '#FFFFFF',
            fontSize: '16px',
            margin: '0 0 4px 0',
            fontWeight: '500'
          }}>
            {userInfo.email}
          </p>

          <p style={{
            color: '#FFFFFF',
            fontSize: '14px',
            margin: 0
          }}>
            Member since {userInfo.joinDate}
          </p>

          {isDemoUser && (
            <span style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '600',
              marginTop: '8px'
            }}>
              {userInfo.accountType}
            </span>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: '#000000',
            border: '1px solid #333333',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '4px'
            }}>
              {userInfo.stats.savedItems}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#FFFFFF'
            }}>
              Saved Items
            </div>
          </div>

          <div style={{
            backgroundColor: '#000000',
            border: '1px solid #333333',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '4px'
            }}>
              {userInfo.stats.searchHistory}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#FFFFFF'
            }}>
              Searches
            </div>
          </div>

          <div style={{
            backgroundColor: '#000000',
            border: '1px solid #333333',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '4px'
            }}>
              {userInfo.stats.eventsCreated}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#FFFFFF'
            }}>
              Events
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #333333',
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Edit Profile
          </button>

          <button
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #333333',
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Settings
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleLogout}
              style={{
                flex: 1,
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid #333333',
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Logout
            </button>

            {isDemoUser && (
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '1px solid #333333',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Reset Demo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div style={{
        backgroundColor: '#000000',
        border: '1px solid #333333',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          margin: '0 0 20px 0',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          Connect With Me
        </h3>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <a
            href="https://www.facebook.com/chasemkellis"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #333333',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333333';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
        </div>
      </div>

      {/* Additional Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '80px'
      }}>
        <p style={{
          color: '#FFFFFF',
          fontSize: '14px',
          margin: 0
        }}>
          {isDemoUser
            ? 'This is demo profile data. In a real app, this would show actual user information.'
            : 'Your profile information from Supabase authentication.'
          }
        </p>
      </div>

      <BottomBar activeTab="profile" />
    </div>
  );
}

export default Profile;