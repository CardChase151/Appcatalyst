import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomBarProps {
  activeTab: string;
}

// Icons as SVG components (iOS style)
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoginIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PricingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function BottomBar({ activeTab }: BottomBarProps) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'pricing', label: 'Pricing', icon: <PricingIcon /> },
    { id: 'login-demo', label: 'Auth', icon: <LoginIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactIcon /> },
    { id: 'pwa', label: 'App', icon: <AppIcon /> }
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId === 'home') {
      navigate('/');
    } else {
      navigate(`/${tabId}`);
    }
  };

  const containerStyle = {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    borderTop: '1px solid #333333',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '12px 0 24px 0',
    zIndex: 1000
  };

  const tabStyle = (isActive: boolean) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
  });

  const iconStyle = (isActive: boolean) => ({
    color: isActive ? '#FFFFFF' : '#FFFFFF',
    marginBottom: '4px',
    transition: 'color 0.2s ease'
  });

  const labelStyle = (isActive: boolean) => ({
    fontSize: '12px',
    color: isActive ? '#FFFFFF' : '#FFFFFF',
    fontWeight: isActive ? '600' : '400',
    transition: 'color 0.2s ease'
  });

  return (
    <div style={containerStyle}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          style={tabStyle(activeTab === tab.id)}
          onClick={() => handleTabChange(tab.id)}
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