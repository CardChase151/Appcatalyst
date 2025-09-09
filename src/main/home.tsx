import React, { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  venue: string;
  city: string;
  category: string;
}

interface TopTab {
  id: string;
  label: string;
}

interface BottomTab {
  id: string;
  label: string;
  icon: React.ReactElement;
}

// Icons as SVG components (iOS style) - MOVED TO TOP
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

function Home() {
  const [activeTab, setActiveTab] = useState<string>('recommended');
  const [activeBottomTab, setActiveBottomTab] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [showAIResponse, setShowAIResponse] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');

  // Cache for each tab's content
  const [tabCache, setTabCache] = useState<Record<string, Event[]>>({});

  const mockEvents: Event[] = [
    { id: 1, title: 'Live Music Friday', venue: 'The Pike', city: 'Long Beach', category: 'music' },
    { id: 2, title: 'Comedy Night', venue: 'Laugh Hub', city: 'Los Angeles', category: 'comedy' },
    { id: 3, title: 'Food Truck Fiesta', venue: 'Marina Lot', city: 'Long Beach', category: 'food' },
    { id: 4, title: 'Indie Film Pop-up', venue: 'Art House', city: 'Long Beach', category: 'film' },
    { id: 5, title: 'Sunset Yoga', venue: 'Griffith Park', city: 'Los Angeles', category: 'wellness' },
    { id: 6, title: 'Jazz & Wine Night', venue: 'Rooftop Lounge', city: 'Long Beach', category: 'music' },
    { id: 7, title: 'Stand-up Comedy', venue: 'Comedy Club', city: 'Los Angeles', category: 'comedy' },
    { id: 8, title: 'Art Gallery Opening', venue: 'Downtown Gallery', city: 'Long Beach', category: 'art' },
  ];

  const topTabs: TopTab[] = [
    { id: 'recommended', label: 'For You' },
    { id: 'music', label: 'Music' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'saved', label: 'Saved' },
    { id: 'nearby', label: 'Nearby' }
  ];

  const bottomTabs: BottomTab[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon /> },
    { id: 'saved', label: 'Saved', icon: <HeartIcon /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> }
  ];

  // Get category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'music': return { bg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', accent: '#8B5CF6' };
      case 'comedy': return { bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', accent: '#F59E0B' };
      case 'saved': return { bg: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', accent: '#EF4444' };
      case 'nearby': return { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', accent: '#10B981' };
      default: return { bg: 'linear-gradient(135deg, #00D1FF 0%, #0B7A9B 100%)', accent: '#00D1FF' };
    }
  };

  const handleAISubmit = () => {
    if (!chatInput.trim()) return;
    
    setAiResponse("Last time you wanted to find a hiking spot to explore, want to do that again? or something new?");
    setShowAIResponse(true);
    setChatInput('');
  };

  // Filter events based on active tab
  const getFilteredEvents = (tabId: string): Event[] => {
    switch (tabId) {
      case 'music':
        return mockEvents.filter(e => e.category === 'music');
      case 'comedy':
        return mockEvents.filter(e => e.category === 'comedy');
      case 'saved':
        return mockEvents.slice(0, 3); // Mock saved events
      case 'nearby':
        return mockEvents.filter(e => e.city === 'Long Beach');
      default:
        return mockEvents; // Recommended shows all
    }
  };

  const handleTabChange = (newTab: string) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 150);
  };

  const EventCard = ({ event }: { event: Event }) => {
    const colors = getCategoryColor(event.category);
    
    return (
      <div 
        style={{
          backgroundColor: '#101A2B',
          border: '1px solid #1b2a44',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '16px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLDivElement;
          target.style.transform = 'translateY(-2px)';
          target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLDivElement;
          target.style.transform = 'translateY(0)';
          target.style.boxShadow = 'none';
        }}
      >
        {/* Image with caching */}
        <img 
          src={`https://picsum.photos/seed/${event.id}/400/240`}
          alt={event.title}
          style={{
            width: '100%',
            height: '180px',
            borderRadius: '12px',
            objectFit: 'cover',
            marginBottom: '16px',
            background: colors.bg
          }}
          loading="lazy"
          onError={(e) => {
            // Fallback to gradient if image fails
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        
        {/* Fallback gradient */}
        <div style={{
          width: '100%',
          height: '180px',
          borderRadius: '12px',
          background: colors.bg,
          marginBottom: '16px',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {event.title}
        </div>
        
        <div>
          <h3 style={{
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            lineHeight: '1.3'
          }}>
            {event.title}
          </h3>
          <p style={{
            color: '#9FBAD1',
            fontSize: '14px',
            margin: '0 0 12px 0'
          }}>
            {event.venue} • {event.city}
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button style={{
              backgroundColor: colors.accent,
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer'
            }}>
              Save
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: colors.accent,
              border: `1px solid ${colors.accent}`,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer'
            }}>
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TopTabBar = () => (
    <div style={{
      backgroundColor: '#0B1220',
      borderBottom: '1px solid #1b2a44',
      padding: '0 16px',
      position: 'sticky',
      top: '80px',
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {topTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: activeTab === tab.id ? '#00D1FF' : '#9FBAD1',
              padding: '16px 20px',
              fontSize: '16px',
              fontWeight: activeTab === tab.id ? '700' : '500',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '2px solid #00D1FF' : '2px solid transparent',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  const BottomBar = () => (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#0B1220',
      borderTop: '1px solid #1b2a44',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '12px 0 24px 0',
      zIndex: 1000
    }}>
      {bottomTabs.map(tab => (
        <div
          key={tab.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '12px',
            backgroundColor: activeBottomTab === tab.id ? 'rgba(0, 209, 255, 0.1)' : 'transparent',
            transition: 'all 0.2s ease'
          }}
          onClick={() => setActiveBottomTab(tab.id)}
        >
          <div style={{
            color: activeBottomTab === tab.id ? '#00D1FF' : '#9FBAD1',
            marginBottom: '4px',
            transition: 'color 0.2s ease'
          }}>
            {tab.icon}
          </div>
          <span style={{
            fontSize: '12px',
            color: activeBottomTab === tab.id ? '#00D1FF' : '#9FBAD1',
            fontWeight: activeBottomTab === tab.id ? '600' : '400',
            transition: 'all 0.2s ease'
          }}>
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{
      backgroundColor: '#0F1623',
      minHeight: '100vh',
      color: '#E2F4FF',
      paddingBottom: '100px'
    }}>
      {/* Header with AI Chat */}
      <header style={{
        padding: '20px 16px 16px',
        borderBottom: '1px solid #1b2a44',
        position: 'sticky',
        top: 0,
        backgroundColor: '#0F1623',
        zIndex: 200
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            margin: 0,
            color: '#FFFFFF'
          }}>
            What's good?
          </h1>
          <p style={{
            margin: '4px 0 0',
            color: '#9FBAD1',
            fontSize: '16px'
          }}>
            Long Beach
          </p>
        </div>

        {/* AI Chat Interface */}
        <div style={{
          backgroundColor: '#101A2B',
          border: '1px solid #1b2a44',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: showAIResponse ? '16px' : '0',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type 'I'm bored'"
              onKeyPress={(e) => e.key === 'Enter' && handleAISubmit()}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleAISubmit}
              style={{
                backgroundColor: '#00D1FF',
                color: '#0F1623',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>

        {/* AI Response */}
        {showAIResponse && (
          <div style={{
            backgroundColor: '#1a2332',
            border: '1px solid #00D1FF',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '16px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#00D1FF',
                borderRadius: '50%',
                marginRight: '8px'
              }} />
              <span style={{
                color: '#00D1FF',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                AI Assistant
              </span>
            </div>
            <p style={{
              color: '#E2F4FF',
              fontSize: '14px',
              margin: 0,
              lineHeight: '1.4'
            }}>
              {aiResponse}
            </p>
          </div>
        )}

        <button 
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.reload();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '16px',
            backgroundColor: '#101A2B',
            color: '#E2F4FF',
            border: '1px solid #1b2a44',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Logout
        </button>
      </header>

      <TopTabBar />

      {/* Content with fade animation */}
      <div style={{
        padding: '24px 16px',
        opacity: isTransitioning ? 0.3 : 1,
        transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}>
        {getFilteredEvents(activeTab).map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <BottomBar />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        input::placeholder {
          color: #9FBAD1;
        }
      `}</style>
    </div>
  );
}

export default Home;