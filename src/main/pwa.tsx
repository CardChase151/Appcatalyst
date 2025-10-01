import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../menu/bottombar';

function PWA() {
  const navigate = useNavigate();

  // Detect device type
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;

  // Detect if running in PWA mode and skip to success if already installed
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const [step, setStep] = useState(1);
  const [checkedStep2, setCheckedStep2] = useState(false);
  const [showStep2Next, setShowStep2Next] = useState(false);

  // Add body class for fullscreen onboarding
  useEffect(() => {
    document.body.classList.add('pwa-active');
    return () => {
      document.body.classList.remove('pwa-active');
    };
  }, []);

  // Step 1: Welcome screen (Desktop shows profile, Mobile shows install or already installed)
  if (step === 1) {
    // Already in PWA mode: Show "Already Installed" message
    if (isPWA) {
      return (
        <>
          <div style={{
            backgroundColor: '#000000',
            minHeight: '100vh',
            color: '#FFFFFF',
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#FFFFFF'
            }}>
              You're Already in App Mode! 🎉
            </h1>

            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              maxWidth: '400px',
              lineHeight: '1.6',
              color: '#FFFFFF'
            }}>
              You're currently using the installed app version. Enjoy the full experience!
            </p>

            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
                padding: '16px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }}
            >
              Back to Home
            </button>
          </div>
          <BottomBar activeTab="pwa" />
        </>
      );
    }

    // Desktop: Show profile picture
    if (!isMobile) {
      return (
        <>
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
                About
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

            {/* Profile Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '600px',
              margin: '0 auto',
              marginBottom: '100px'
            }}>
              <img
                src="/profile.png"
                alt="Chase Kellis"
                style={{
                  width: 'auto',
                  height: '400px',
                  maxWidth: '100%',
                  marginBottom: '30px'
                }}
              />

              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '10px',
                color: '#FFFFFF'
              }}>
                Chase Kellis
              </h2>

              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                Senior Full Stack App Developer
              </p>

              <p style={{
                fontSize: '16px',
                color: '#FFFFFF',
                lineHeight: '1.6',
                textAlign: 'center',
                maxWidth: '500px'
              }}>
                Crafting digital experiences since 2019 — 25+ apps, 30+ websites.
                Passionate about building innovative solutions that make a difference.
              </p>
            </div>

            <BottomBar activeTab="pwa" />
          </div>
        </>
      );
    }

    // Mobile: Show install welcome
    return (
      <>
        <div
          className="pwa-fullscreen"
          style={{
            background: '#000000',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 20px 100px 20px',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>

          {/* Header with Home button */}
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
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

          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '20px',
            color: '#FFFFFF'
          }}>
            Install as App 📱
          </h2>

          <p style={{
            fontSize: '18px',
            marginBottom: '40px',
            maxWidth: '400px',
            lineHeight: '1.6',
            color: '#FFFFFF'
          }}>
            Get the best experience by installing this portfolio as an app on your device!
          </p>

          <button
            onClick={() => setStep(2)}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              padding: '16px 40px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
            }}
          >
            Get Started
          </button>

          {/* CSS for fullscreen override */}
          <style dangerouslySetInnerHTML={{
            __html: `
              body.pwa-active {
                background: #000000 !important;
                padding: 0 !important;
                margin: 0 !important;
              }

              html, body.pwa-active {
                background: #000000 !important;
              }

              .pwa-fullscreen {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 9999 !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              body.pwa-active #root {
                background: #000000 !important;
              }

              @media all and (display-mode: standalone) {
                .pwa-fullscreen {
                  padding-top: 160px !important;
                }
              }

              @supports (-webkit-touch-callout: none) {
                @media all and (display-mode: standalone) {
                  .pwa-fullscreen {
                    padding-top: 160px !important;
                  }
                }
              }
            `
          }} />
        </div>
        <BottomBar activeTab="pwa" />
      </>
    );
  }

  // Step 2: Device-specific installation instructions
  if (step === 2) {
    return (
      <>
        <div
          className="pwa-fullscreen"
          style={{
            background: '#000000',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 20px 100px 20px',
            color: '#FFFFFF',
            position: 'relative'
          }}>

          {/* Header with Back button */}
          <button
            onClick={() => setStep(1)}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
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
            ← Back
          </button>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            marginBottom: '30px',
            textAlign: 'center',
            color: '#FFFFFF'
          }}>
            Installation Steps
          </h2>

          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '350px' }}>
            {/* iOS Instructions */}
            {isIOS && (
              <div style={{
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <p style={{
                  fontSize: '20px',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}>
                  <strong>iOS Installation</strong>
                </p>
                <p style={{
                  fontSize: '16px',
                  marginBottom: '8px',
                  lineHeight: '1.5',
                  color: '#FFFFFF'
                }}>
                  1. Tap the <strong>Share</strong> button ↓
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: '#FFFFFF'
                }}>
                  2. Tap <strong>"Add to Home Screen +"</strong>
                </p>
              </div>
            )}

            {/* Android Instructions */}
            {isAndroid && (
              <div style={{
                backgroundColor: '#000000',
                border: '1px solid #333333',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <p style={{
                  fontSize: '20px',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}>
                  <strong>Android Installation</strong>
                </p>
                <p style={{
                  fontSize: '16px',
                  marginBottom: '8px',
                  lineHeight: '1.5',
                  color: '#FFFFFF'
                }}>
                  1. Tap the <strong>Menu</strong> (⋮)
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: '#FFFFFF'
                }}>
                  2. Tap <strong>"Add to Home screen"</strong>
                </p>
              </div>
            )}
          </div>

          {/* Bouncing arrow pointing down */}
          <div style={{
            position: 'absolute',
            bottom: '180px',
            fontSize: '32px',
            color: '#FFFFFF',
            animation: 'bounce 2s infinite'
          }}>
            ↓
          </div>

          {/* Checkbox fallback */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: 'center',
              marginBottom: '20px',
              color: '#FFFFFF'
            }}>
              <input
                type="checkbox"
                checked={checkedStep2}
                onChange={(e) => {
                  setCheckedStep2(e.target.checked);
                  setShowStep2Next(e.target.checked);
                }}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer'
                }}
              />
              I completed the steps above
            </label>

            <button
              onClick={() => setStep(3)}
              style={{
                backgroundColor: showStep2Next ? '#000000' : '#333333',
                color: '#FFFFFF',
                border: showStep2Next ? '2px solid #FFFFFF' : '1px solid #555555',
                padding: '14px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: showStep2Next ? 'pointer' : 'not-allowed',
                opacity: showStep2Next ? 1 : 0.5,
                transition: 'all 0.3s ease'
              }}
              disabled={!showStep2Next}
            >
              Done!
            </button>
          </div>

          {/* CSS for bounce animation */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
              }
            `
          }} />
        </div>
        <BottomBar activeTab="pwa" />
      </>
    );
  }

  // Step 3: Success (only for mobile after installation)
  if (step === 3) {
    return (
      <>
        <div
          className="pwa-fullscreen"
          style={{
            background: '#000000',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 20px 100px 20px',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>

          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '20px',
            color: '#FFFFFF'
          }}>
            All Set! 🎉
          </h2>

          <p style={{
            fontSize: '18px',
            marginBottom: '40px',
            maxWidth: '400px',
            lineHeight: '1.6',
            color: '#FFFFFF'
          }}>
            You can now access my portfolio directly from your home screen like a native app!
          </p>

          <button
            onClick={() => {
              navigate('/');
            }}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              padding: '16px 40px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
            }}
          >
            Explore Portfolio
          </button>
        </div>
        <BottomBar activeTab="pwa" />
      </>
    );
  }

  return null;
}

export default PWA;
