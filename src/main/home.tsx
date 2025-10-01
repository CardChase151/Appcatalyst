import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomBar from '../menu/bottombar';

function Home() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  // Detect device and PWA mode
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;
  const isDesktop = !isMobile;

  const [showWelcomeButton, setShowWelcomeButton] = useState(() => {
    // Initialize from localStorage to prevent flash
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    console.log('Initial check - hasSeenWelcome:', hasSeenWelcome);
    console.log('Will show welcome button:', !hasSeenWelcome);
    return !hasSeenWelcome;
  });
  const [isPressed, setIsPressed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showContent, setShowContent] = useState(() => {
    // Content visible only if welcome was already seen
    return !!localStorage.getItem('hasSeenWelcome');
  });

  // Determine welcome button text
  const getWelcomeText = () => {
    if (isPWA) {
      return 'WELCOME TO\nAPP VERSION';
    } else if (isDesktop) {
      return 'WELCOME TO\nDESKTOP VERSION';
    } else {
      return 'ENTER';
    }
  };

  const handleReset = () => {
    console.log('Clearing cache...');
    // Clear all localStorage items for a complete reset
    localStorage.clear();

    // Sign out if using Supabase
    signOut();

    // Reload page to show welcome button again
    window.location.href = '/';
  };

  const handleWelcomeClick = () => {
    console.log('Welcome button clicked!');
    setIsPressed(true);
    setShowAnimation(true);

    // Save immediately so it doesn't show again
    localStorage.setItem('hasSeenWelcome', 'true');

    // Step 1: After ripples finish, hide button overlay and show black screen (2s)
    setTimeout(() => {
      console.log('Hiding button overlay, showing black screen');
      setShowWelcomeButton(false);
      setShowBlackScreen(true);
    }, 2000);

    // Step 2: Start fading in content after short delay (2s total)
    setTimeout(() => {
      console.log('Fading in content under black screen');
      setShowContent(true);
    }, 2000);

    // Step 3: Remove black screen after content fades in (4.5s total)
    setTimeout(() => {
      console.log('Removing black screen');
      setShowBlackScreen(false);
    }, 4500);
  };

  console.log('Render - showWelcomeButton:', showWelcomeButton, 'showAnimation:', showAnimation, 'showContent:', showContent, 'showBlackScreen:', showBlackScreen);

  return (
    <>
      {/* Welcome Button Overlay - MUST BE FIRST */}
      {showWelcomeButton && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          opacity: showAnimation ? 0 : 1,
          transition: 'opacity 2s ease'
        }}>
          {/* Ripple Effects */}
          {showAnimation && (
            <>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                transform: 'translate(-50%, -50%)',
                animation: 'ripple1 2s ease-out',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                transform: 'translate(-50%, -50%)',
                animation: 'ripple2 2s ease-out 0.2s',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                transform: 'translate(-50%, -50%)',
                animation: 'ripple3 2s ease-out 0.4s',
                pointerEvents: 'none'
              }} />
            </>
          )}

          <button
            onClick={handleWelcomeClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '3px solid #FFFFFF',
              backgroundColor: isPressed ? '#1A1A1A' : '#0A0A0A',
              color: '#FFFFFF',
              fontSize: isPWA || isDesktop ? '18px' : '24px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: isPressed
                ? '0 0 30px #FFFFFF, inset 0 0 20px #FFFFFF'
                : '0 0 60px #FFFFFF, 0 0 100px rgba(255, 255, 255, 0.8)',
              transform: isPressed ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.2s ease',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-100px',
              marginLeft: '-100px',
              zIndex: 10000,
              animation: 'breathe 3s ease-in-out infinite',
              opacity: showAnimation ? 0 : 1,
              whiteSpace: 'pre-line',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              lineHeight: '1.3'
            }}
          >
            {getWelcomeText()}
          </button>

          <p style={{
            color: '#FFFFFF',
            marginTop: '30px',
            fontSize: '16px',
            textAlign: 'center',
            opacity: showAnimation ? 0 : 0.8,
            transition: 'opacity 0.3s ease'
          }}>
            {isPWA ? 'Enjoying the app experience!' : isDesktop ? 'Click to explore my portfolio' : 'Click to explore my portfolio'}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        color: '#FFFFFF',
        padding: '20px',
        paddingTop: isPWA ? 'max(env(safe-area-inset-top), 20px)' : '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        opacity: showContent ? 1 : 0,
        transition: 'opacity 2s ease',
        pointerEvents: showContent ? 'auto' : 'none'
      }}>
        {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={handleReset}
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
          Reset Intro
        </button>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          AppCatalyst
        </h1>
      </header>

      {/* Main Content */}
      <div style={{
        backgroundColor: '#000000',
        borderRadius: '16px',
        padding: '40px 20px',
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
      }}>
        {/* Left Side - Text Content */}
        <div style={{
          flex: window.innerWidth <= 768 ? '1' : '0 0 50%',
          paddingLeft: window.innerWidth <= 768 ? '0' : '40px',
          position: 'relative',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: window.innerWidth <= 768 ? '32px' : '48px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            color: '#FFFFFF',
            textAlign: 'left',
            letterSpacing: '-1px'
          }}>
            Senior Full Stack App Developer
          </h1>

          <p style={{
            color: '#999999',
            fontSize: window.innerWidth <= 768 ? '14px' : '16px',
            lineHeight: '1.6',
            margin: '0 0 16px 0',
            textAlign: 'left',
            maxWidth: '500px'
          }}>
            Crafting digital experiences since 2019 — 25+ apps, 30+ websites. Powered by <strong style={{ color: '#FFFFFF' }}>AppCatalyst</strong>.
          </p>

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: window.innerWidth <= 768 ? '20px' : '40px',
            width: '100%',
            flexWrap: 'wrap'
          }}>
            <button
              className="sleek-btn"
              onClick={() => navigate('/work')}
              style={{
                position: 'relative',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1.5px solid #FFFFFF',
                padding: '14px 32px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                overflow: 'hidden',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 1
              }}>
                View My Work
              </span>
            </button>

            <img
              src="/signature.png"
              alt="Signature"
              style={{
                height: window.innerWidth <= 768 ? '120px' : '200px',
                width: 'auto',
                opacity: 0.95,
                transform: 'rotate(-15deg)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div style={{
          flex: '0 0 auto',
          maxWidth: window.innerWidth <= 768 ? '100%' : '400px',
          width: '100%'
        }}>
          <img
            src="/profile.png"
            alt="Profile"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              maxWidth: window.innerWidth <= 768 ? '300px' : '400px',
              margin: window.innerWidth <= 768 ? '0 auto' : '0',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Spacer for mobile to add padding below profile image */}
      <div style={{
        height: window.innerWidth <= 768 ? '100px' : '0',
        backgroundColor: '#000000'
      }}></div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes ripple1 {
          0% { width: 200px; height: 200px; opacity: 1; }
          100% { width: 600px; height: 600px; opacity: 0; }
        }

        @keyframes ripple2 {
          0% { width: 200px; height: 200px; opacity: 1; }
          100% { width: 900px; height: 900px; opacity: 0; }
        }

        @keyframes ripple3 {
          0% { width: 200px; height: 200px; opacity: 1; }
          100% { width: 1200px; height: 1200px; opacity: 0; }
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
      `}</style>

      <BottomBar activeTab="home" />
      </div>

      {/* Black Screen Layer */}
      {showBlackScreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000000',
          zIndex: 9998,
          opacity: showContent ? 0 : 1,
          transition: 'opacity 2s ease'
        }} />
      )}
    </>
  );
}

export default Home;