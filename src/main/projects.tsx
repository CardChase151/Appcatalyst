import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../menu/bottombar';
import SEO from '../components/SEO';

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
    id: 'tacosmiranda',
    title: 'Tacos Miranda',
    type: 'Web & Mobile',
    description: 'Direct-to-customer Order Online system for a local restaurant. Integrated Stripe and Square for payments, the DoorDash Drive API for delivery, and a network kitchen printer that auto-prints tickets the moment an order lands.',
    techStack: ['React', 'Supabase', 'Stripe', 'Square API', 'DoorDash API'],
    liveUrl: 'https://tacosmiranda.com/',
    screenshots: [
      '/projects/tacosmiranda-menu-desktop.png',
      '/projects/tacosmiranda-order-online-mobile.png',
      '/projects/tacosmiranda-burrito-customizer.png',
      '/projects/tacosmiranda-cart-checkout.png'
    ],
    isPrivate: false
  },
  {
    id: 'biltapp',
    title: 'Biltapp',
    type: 'Web & Mobile',
    description: 'Multi-tenant white-label SaaS. One approved app shell dynamically loads each subscriber’s branding, content, and features at runtime, eliminating per-client App Store submissions and cutting onboarding from weeks to minutes.',
    techStack: ['React', 'Capacitor', 'Supabase', 'Stripe'],
    liveUrl: 'https://bilt.appcatalyst.org/',
    screenshots: [
      '/projects/biltapp-features-pricing.png',
      '/projects/biltapp-instance-blue-players-club.png',
      '/projects/biltapp-instance-every1-eats.png',
      '/projects/biltapp-instance-powerhouse.png'
    ],
    isPrivate: false
  },
  {
    id: 'fieldortho',
    title: 'FieldOrtho',
    type: 'Mobile App',
    description: 'B2B sales enablement app for orthopedic device reps. Native iOS and Android via Capacitor with offline content library, an AI chat assistant, downloadable reference docs, and a custom admin dashboard that lets the internal team manage AI behavior and training data without engineering involvement.',
    techStack: ['React', 'Capacitor', 'Supabase', 'AI / LLM', 'Custom Admin'],
    liveUrl: '',
    screenshots: [
      '/projects/fieldortho-02-home.png',
      '/projects/fieldortho-04-ai-chat.png',
      '/projects/fieldortho-03-sales-tools.png',
      '/projects/fieldortho-06-content-viewer.png',
      '/projects/fieldortho-05-downloads.png',
      '/projects/fieldortho-01-login.png'
    ],
    isPrivate: true
  },
  {
    id: 'medulochub',
    title: 'MedulocHub',
    type: 'Mobile App',
    description: 'B2B medical content and training hub built on the same architecture as FieldOrtho. AI assistant, sales tools, content viewer, and an admin-facing dashboard for non-technical staff to update AI training data and manage model behavior on the fly.',
    techStack: ['React', 'Capacitor', 'Supabase', 'AI / LLM', 'Custom Admin'],
    liveUrl: '',
    screenshots: [
      '/projects/medulochub-02-home.png',
      '/projects/medulochub-04-ai-chat.png',
      '/projects/medulochub-03-sales-tools.png',
      '/projects/medulochub-06-content-viewer.png',
      '/projects/medulochub-05-downloads.png',
      '/projects/medulochub-01-login.png'
    ],
    isPrivate: true
  },
  {
    id: 'bandofbrothers',
    title: 'Band of Brothers',
    type: 'Mobile App',
    description: 'Men\'s discipleship and brotherhood app. Daily Scripture, Declaration, and Prayer cards on the home screen, a Bootcamp flow for praying-reaching-inviting other men, group chat for connected brotherhoods, a public prayer feed categorized by life battles (War Room), structured training sessions, and retreat registration. Native iOS and Android via Capacitor.',
    techStack: ['React', 'Capacitor', 'Supabase', 'OneSignal'],
    liveUrl: '',
    screenshots: [
      '/projects/bob-01-home.png',
      '/projects/bob-04-war-room.png',
      '/projects/bob-03-brotherhood-chat.png',
      '/projects/bob-05-training-ground.png',
      '/projects/bob-02-bootcamp-list.png',
      '/projects/bob-06-retreats.png'
    ],
    isPrivate: false
  },
  {
    id: 'centerchurch',
    title: 'Center Church',
    type: 'Web App',
    description: 'Custom church website rebuild for a multiethnic congregation on Boston’s North Shore. Replaced a generic Squarespace template with a brand-driven editorial-feel React site, including palette, typography system, and Planning Center plus live-stream integrations.',
    techStack: ['React', 'Vite', 'Framer Motion', 'Netlify'],
    liveUrl: 'https://centerchurchne.com/',
    screenshots: [
      '/projects/centerchurch-home-hero.png',
      '/projects/centerchurch-about.png',
      '/projects/centerchurch-visit.png'
    ],
    isPrivate: false
  },
  {
    id: 'trainercenter',
    title: 'Pokemon Trainer Center HB',
    type: 'Web App',
    description: 'Pokemon TCG store and league site rebuild. Replaced Squarespace with a custom React stack including a markdown blog, build-time prerendering for SEO, calendar of events, and a buy/sell consignment funnel.',
    techStack: ['React', 'Supabase', 'Netlify', 'Prerendering'],
    liveUrl: 'https://pokemontrainercenter.com/',
    screenshots: [
      '/projects/trainercenter-home-hero.png',
      '/projects/trainercenter-mission.png',
      '/projects/trainercenter-calendar.png',
      '/projects/trainercenter-buy-sell.png',
      '/projects/trainercenter-blog.png'
    ],
    isPrivate: false
  },
  {
    id: 'mrfixitalloc',
    title: 'MrFixItAllOC',
    type: 'Web App',
    description: 'Local Orange County handyman site with full SEO infrastructure: structured data (JSON-LD), sitemap with lastmod, canonical metadata, Open Graph tags, and category gallery pages built for local search visibility.',
    techStack: ['HTML', 'CSS', 'JSON-LD', 'GitHub Pages'],
    liveUrl: 'https://mrfixitalloc.com/',
    screenshots: [
      '/projects/mrfixitalloc-home-hero.png',
      '/projects/mrfixitalloc-services.png'
    ],
    isPrivate: false
  },
  {
    id: 'westcoastmarriagecamp',
    title: 'West Coast Marriage Camp',
    type: 'Web App',
    description: 'Marriage retreat site for West Coast Ministries. Editorial-feel hero, story page, photo gallery of past camps, and a registration funnel.',
    techStack: ['React', 'Netlify'],
    liveUrl: 'https://westcoastmarriagecamp.com/',
    screenshots: [
      '/projects/westcoastmarriagecamp-home.png',
      '/projects/westcoastmarriagecamp-gallery.png'
    ],
    isPrivate: false
  },
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
      <SEO
        title="Our Work - App Portfolio"
        description="See 25+ apps and websites built by AppCatalyst. Real projects for real businesses including healthcare apps, trading platforms, and business tools. React Native and React development."
        keywords="app development portfolio, mobile app examples, react native apps, app developer work samples, custom app projects, startup app portfolio"
        path="/work"
      />
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
          Showcasing 15 of my 25+ apps and 30+ websites
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

      {/* FAQ Button */}
      <div style={{
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => navigate('/faq')}
          style={{
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            padding: '16px 32px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0A0A0A';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          📚 FAQs & Blog
        </button>
      </div>

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
