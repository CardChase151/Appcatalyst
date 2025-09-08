import React from 'react';

interface BottomBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function BottomBar({ activeTab, onTabChange }: BottomBarProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'search', label: 'Search', icon: '⌕' },
    { id: 'saved', label: 'Saved', icon: '♡' },
    { id: 'calendar', label: 'Calendar', icon: '☰' },
    { id: 'profile', label: 'Profile', icon: '◉' }
  ];

  const containerStyle = {
    position: 'fixed' as const,
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
  };

  const tabStyle = (isActive: boolean) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? 'rgba(0, 209, 255, 0.1)' : 'transparent'
  });

  const iconStyle = (isActive: boolean) => ({
    fontSize: '20px',
    color: isActive ? '#00D1FF' : '#9FBAD1',
    marginBottom: '4px',
    transition: 'color 0.2s ease'
  });

  const labelStyle = (isActive: boolean) => ({
    fontSize: '12px',
    color: isActive ? '#00D1FF' : '#9FBAD1',
    fontWeight: isActive ? '800' : '600',
    transition: 'color 0.2s ease'
  });

  return (
    <div style={containerStyle}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          style={tabStyle(activeTab === tab.id)}
          onClick={() => onTabChange(tab.id)}
        >
          <div style={iconStyle(activeTab === tab.id)}>
            {tab.icon}
          </div>
          <span style={labelStyle(activeTab === tab.id)}>
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BottomBar;