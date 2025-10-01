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

const WorkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

function BottomBar({ activeTab }: BottomBarProps) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'work', label: 'Work', icon: <WorkIcon /> },
    { id: 'login-demo', label: 'Auth', icon: <LoginIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> }
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