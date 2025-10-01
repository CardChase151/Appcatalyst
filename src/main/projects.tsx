import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../menu/bottombar';

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  screenshots: string[];
  isPrivate: boolean;
}

const projects: Project[] = [
  {
    id: 'cardchase',
    title: 'CardChase',
    type: 'Web & Mobile',
    description: 'Trading card collection management platform with inventory tracking, pricing, and marketplace features.',
    techStack: ['React', 'Node.js', 'Supabase'],
    liveUrl: 'https://cardchase.org/',
    screenshots: ['/projects/CardChase1.png', '/projects/CardChase2.png'],
    isPrivate: false
  },
  {
    id: 'narcotictrack',
    title: 'NarcoticTrack',
    type: 'Web & Mobile',
    description: 'Pharmaceutical tracking and management system for controlled substances with compliance features.',
    techStack: ['React Native', 'Node.js'],
    liveUrl: 'https://narcotictrack.com/',
    screenshots: ['/projects/NarcoticTrack1.png', '/projects/NarcoticTrack12.png'],
    isPrivate: false
  },
  {
    id: 'teaminspire',
    title: 'TeamInspire',
    type: 'Mobile App',
    description: 'Team collaboration and motivation platform with goal tracking and performance metrics.',
    techStack: ['React Native', 'Node.js'],
    liveUrl: '',
    screenshots: ['/projects/TeamInspire1.png', '/projects/TeamInspire2.png'],
    isPrivate: true
  },
  {
    id: 'freeqrcoding',
    title: 'FreeQRCoding',
    type: 'Web App',
    description: 'Free QR code generator with customization options and analytics tracking.',
    techStack: ['React', 'Node.js'],
    liveUrl: 'https://freeqrcoding.com/',
    screenshots: ['/projects/qrcode.png'],
    isPrivate: false
  },
  {
    id: 'secondopinion',
    title: 'SecondOpinion',
    type: 'Mobile App',
    description: 'Medical consultation platform connecting patients with healthcare professionals for second opinions.',
    techStack: ['React Native', 'Node.js'],
    liveUrl: '',
    screenshots: ['/projects/SecondOpinion.png'],
    isPrivate: true
  },
  {
    id: 'bored',
    title: 'BORED',
    type: 'Mobile App',
    description: 'A comprehensive mobile application designed to help users discover and track activities.',
    techStack: ['React Native', 'Node.js', 'MongoDB'],
    liveUrl: '',
    screenshots: ['/projects/BORED.png'],
    isPrivate: true
  }
];

function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'private'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cardImageIndices, setCardImageIndices] = useState<{[key: string]: number}>({});

  // Auto-slide through images for cards with multiple screenshots
  React.useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    projects.forEach((project, idx) => {
      if (project.screenshots.length > 1) {
        // Stagger the start times for each project
        const startDelay = idx * 1000; // 1 second stagger

        const timeout = setTimeout(() => {
          const interval = setInterval(() => {
            setCardImageIndices(prev => {
              const currentIndex = prev[project.id] || 0;
              const nextIndex = (currentIndex + 1) % project.screenshots.length;
              return { ...prev, [project.id]: nextIndex };
            });
          }, 3000); // Change image every 3 seconds

          intervals.push(interval);
        }, startDelay);

        intervals.push(timeout as any);
      }
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'web') return project.type.includes('Web');
    if (filter === 'mobile') return project.type.includes('Mobile');
    if (filter === 'private') return project.isPrivate;
    return true;
  });

  const isMobile = window.innerWidth <= 768;
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '20px',
      paddingTop: isPWA ? 'max(env(safe-area-inset-top), 20px)' : '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #333333',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333333';
            }}
          >
            ← Back
          </button>

          <div style={{ textAlign: 'right' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '800',
              margin: 0,
              color: '#FFFFFF'
            }}>
              My Work
            </h1>
          </div>
        </div>
        <p style={{
          color: '#999999',
          fontSize: '14px',
          margin: '0 0 24px 0',
          textAlign: 'right'
        }}>
          Showcasing 6 of my 25+ apps and 30+ websites
        </p>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {(['all', 'web', 'mobile', 'private'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              style={{
                backgroundColor: filter === filterType ? '#FFFFFF' : 'transparent',
                color: filter === filterType ? '#000000' : '#FFFFFF',
                border: '1px solid #FFFFFF',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize'
              }}
            >
              {filterType}
            </button>
          ))}
        </div>
      </header>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px',
        marginBottom: '100px'
      }}>
        {filteredProjects.map((project) => {
          const cardImageIndex = cardImageIndices[project.id] || 0;

          return (
            <div
              key={project.id}
              style={{
                backgroundColor: '#0A0A0A',
                border: '1px solid #1A1A1A',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#333333';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1A1A1A';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Project Image */}
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(cardImageIndex);
                  setSelectedImage(project.screenshots[cardImageIndex]);
                }}
              >
                {/* Render all images with absolute positioning for crossfade effect */}
                {project.screenshots.map((screenshot, idx) => (
                  <img
                    key={idx}
                    src={screenshot}
                    alt={`${project.title} ${idx + 1}`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '10px',
                      transition: 'opacity 0.8s ease-in-out',
                      opacity: idx === cardImageIndex ? 1 : 0,
                      pointerEvents: idx === cardImageIndex ? 'auto' : 'none'
                    }}
                  />
                ))}

                {/* Previous button for card */}
                {project.screenshots.length > 1 && cardImageIndex > 0 && (
                  <button
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      border: '1px solid #FFFFFF',
                      color: '#FFFFFF',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '50%',
                      transition: 'all 0.2s ease',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardImageIndices({...cardImageIndices, [project.id]: cardImageIndex - 1});
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }}
                  >
                    ‹
                  </button>
                )}

                {/* Next button for card */}
                {project.screenshots.length > 1 && cardImageIndex < project.screenshots.length - 1 && (
                  <button
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      border: '1px solid #FFFFFF',
                      color: '#FFFFFF',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '50%',
                      transition: 'all 0.2s ease',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardImageIndices({...cardImageIndices, [project.id]: cardImageIndex + 1});
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }}
                  >
                    ›
                  </button>
                )}

                {/* Image counter for card */}
                {project.screenshots.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {cardImageIndex + 1} / {project.screenshots.length}
                  </div>
                )}
              </div>

            {/* Project Info */}
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0,
                  color: '#FFFFFF'
                }}>
                  {project.title}
                </h3>
                {project.isPrivate && (
                  <span style={{
                    backgroundColor: '#1A1A1A',
                    color: '#999999',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    PRIVATE
                  </span>
                )}
              </div>

              <p style={{
                color: '#666666',
                fontSize: '11px',
                margin: '0 0 12px 0',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {project.type}
              </p>

              <p style={{
                color: '#CCCCCC',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: '0 0 16px 0'
              }}>
                {project.description}
              </p>

              {/* Tech Stack */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '16px'
              }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Live Button */}
              {project.liveUrl && (
                <button
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid #FFFFFF',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  View Live →
                </button>
              )}
            </div>
          </div>
          );
        }
        )}
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImage && selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'pointer'
          }}
          onClick={() => {
            setSelectedImage(null);
            setSelectedProject(null);
            setCurrentImageIndex(0);
          }}
        >
          {/* Close button */}
          <button
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '32px',
              cursor: 'pointer',
              padding: '10px',
              lineHeight: '1'
            }}
            onClick={() => {
              setSelectedImage(null);
              setSelectedProject(null);
              setCurrentImageIndex(0);
            }}
          >
            ×
          </button>

          {/* Previous button */}
          {selectedProject.screenshots.length > 1 && currentImageIndex > 0 && (
            <button
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #FFFFFF',
                color: '#FFFFFF',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = currentImageIndex - 1;
                setCurrentImageIndex(newIndex);
                setSelectedImage(selectedProject.screenshots[newIndex]);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ‹
            </button>
          )}

          {/* Next button */}
          {selectedProject.screenshots.length > 1 && currentImageIndex < selectedProject.screenshots.length - 1 && (
            <button
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #FFFFFF',
                color: '#FFFFFF',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = currentImageIndex + 1;
                setCurrentImageIndex(newIndex);
                setSelectedImage(selectedProject.screenshots[newIndex]);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ›
            </button>
          )}

          {/* Image */}
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image counter */}
          {selectedProject.screenshots.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {currentImageIndex + 1} / {selectedProject.screenshots.length}
            </div>
          )}
        </div>
      )}

      <BottomBar activeTab="work" />
    </div>
  );
}

export default Projects;
