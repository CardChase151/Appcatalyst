import React, { useState } from 'react';

function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const mockEvents = [
    { id: 1, title: 'Live Music Friday', venue: 'The Pike', city: 'Long Beach', image: 'https://picsum.photos/300/200?random=1' },
    { id: 2, title: 'Comedy Night', venue: 'Laugh Hub', city: 'Los Angeles', image: 'https://picsum.photos/300/200?random=2' },
    { id: 3, title: 'Food Truck Fiesta', venue: 'Marina Lot', city: 'Long Beach', image: 'https://picsum.photos/300/200?random=3' },
    { id: 4, title: 'Indie Film Pop-up', venue: 'Art House', city: 'Long Beach', image: 'https://picsum.photos/300/200?random=4' },
    { id: 5, title: 'Sunset Yoga', venue: 'Griffith Park', city: 'Los Angeles', image: 'https://picsum.photos/300/200?random=5' },
  ];

  const EventCard = ({ event }: { event: any }) => (
    <div style={{
      backgroundColor: '#101A2B',
      border: '1px solid #1b2a44',
      borderRadius: '12px',
      padding: '12px',
      marginRight: '12px',
      minWidth: '280px',
      cursor: 'pointer'
    }}>
      <img 
        src={event.image} 
        alt={event.title} 
        style={{
          width: '100%',
          height: '160px',
          borderRadius: '8px',
          objectFit: 'cover',
          marginBottom: '12px'
        }}
      />
      <div>
        <h4 style={{
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: '800',
          margin: '0 0 4px 0'
        }}>
          {event.title}
        </h4>
        <p style={{
          color: '#9FBAD1',
          fontSize: '14px',
          margin: 0
        }}>
          {event.venue} • {event.city}
        </p>
      </div>
    </div>
  );

  const EventRow = ({ title, events }: { title: string; events: any[] }) => (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: '800',
        marginBottom: '16px',
        paddingLeft: '4px'
      }}>
        {title}
      </h3>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '8px',
        gap: '0px',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none'  /* IE and Edge */
      }}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );

  // Bottom Navigation Component
  const BottomBar = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: '⌂' },
      { id: 'search', label: 'Search', icon: '⌕' },
      { id: 'saved', label: 'Saved', icon: '♡' },
      { id: 'calendar', label: 'Calendar', icon: '☰' },
      { id: 'profile', label: 'Profile', icon: '◉' }
    ];

    return (
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
        padding: '12px 0',
        zIndex: 1000
      }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: activeTab === tab.id ? 'rgba(0, 209, 255, 0.1)' : 'transparent'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <div style={{
              fontSize: '20px',
              color: activeTab === tab.id ? '#00D1FF' : '#9FBAD1',
              marginBottom: '4px'
            }}>
              {tab.icon}
            </div>
            <span style={{
              fontSize: '12px',
              color: activeTab === tab.id ? '#00D1FF' : '#9FBAD1',
              fontWeight: activeTab === tab.id ? '800' : '600'
            }}>
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#0F1623',
      minHeight: '100vh',
      color: '#E2F4FF',
      paddingBottom: '80px'
    }}>
      <header style={{
        padding: '20px 16px 16px',
        borderBottom: '1px solid #1b2a44',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            margin: 0,
            color: '#FFFFFF'
          }}>
            What's good
          </h1>
          <p style={{
            margin: '4px 0 0',
            color: '#9FBAD1',
            fontSize: '16px'
          }}>
            Long Beach
          </p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.reload();
          }}
          style={{
            backgroundColor: '#101A2B',
            color: '#E2F4FF',
            border: '1px solid #1b2a44',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </header>

      <div style={{ padding: '16px' }}>
        <EventRow title="Recommended for you" events={mockEvents} />
        <EventRow title="Because you liked live music" events={mockEvents.slice(0, 3)} />
        <EventRow title="Because you liked comedy" events={mockEvents.slice(1, 4)} />
        <EventRow title="Saved near you" events={mockEvents.slice(2, 5)} />
      </div>

      <BottomBar />
    </div>
  );
}

export default Home;