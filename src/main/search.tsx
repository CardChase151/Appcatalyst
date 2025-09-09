import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  venue: string;
  city: string;
  category: string;
  image: string;
  description: string;
}

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  suggestions?: string[];
  events?: Event[];
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Wine & Paint Night',
    venue: 'Canvas & Cork Studio',
    city: 'Long Beach',
    category: 'creative',
    image: 'https://picsum.photos/seed/wine-paint/300/200',
    description: 'Create art while sipping wine in a relaxed atmosphere'
  },
  {
    id: 2,
    title: 'Jazz at the Rooftop',
    venue: 'Sky Lounge',
    city: 'Los Angeles',
    category: 'music',
    image: 'https://picsum.photos/seed/jazz/300/200',
    description: 'Live jazz with city views and craft cocktails'
  },
  {
    id: 3,
    title: 'Food Truck Festival',
    venue: 'Marina Park',
    city: 'Long Beach',
    category: 'food',
    image: 'https://picsum.photos/seed/food-truck/300/200',
    description: 'Diverse cuisines from local food trucks'
  },
  {
    id: 4,
    title: 'Rock Climbing Gym',
    venue: 'Vertical Adventures',
    city: 'Los Angeles',
    category: 'adventure',
    image: 'https://picsum.photos/seed/climbing/300/200',
    description: 'Indoor climbing with routes for all levels'
  },
  {
    id: 5,
    title: 'Sunset Hike',
    venue: 'Runyon Canyon',
    city: 'Los Angeles',
    category: 'outdoor',
    image: 'https://picsum.photos/seed/hike/300/200',
    description: 'Similar to your last hike but with amazing sunset views'
  },
  {
    id: 6,
    title: 'Comedy Night',
    venue: 'Laugh Track',
    city: 'Long Beach',
    category: 'entertainment',
    image: 'https://picsum.photos/seed/comedy/300/200',
    description: 'Stand-up comedy with local and touring comedians'
  }
];

function ConversationalSearch() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [conversationState, setConversationState] = useState('initial');
  const [isTyping, setIsTyping] = useState(false);
  const messageIdCounter = useRef(0);
  const hasStarted = useRef(false);

  // Start conversation on first render
  React.useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startConversation();
    }
  }, []);

  const generateId = () => {
    messageIdCounter.current += 1;
    return `msg-${messageIdCounter.current}`;
  };

  const startConversation = React.useCallback(() => {
    setTimeout(() => {
      const initialMessage: ChatMessage = {
        id: generateId(),
        type: 'ai',
        content: "Hey! Last time you went hiking at Griffith Park. Want to try something similar or completely different?",
        suggestions: ['Similar', 'Different', 'Surprise me']
      };
      setMessages([initialMessage]);
    }, 1000);
  }, []);

  const addUserMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      type: 'user',
      content
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const addAIMessage = (content: string, suggestions?: string[], events?: Event[]) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: generateId(),
        type: 'ai',
        content,
        suggestions,
        events
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    processResponse(suggestion.toLowerCase());
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    addUserMessage(userInput);
    processResponse(userInput.toLowerCase());
    setUserInput('');
  };

  const processResponse = (response: string) => {
    if (conversationState === 'initial') {
      if (response.includes('similar')) {
        setConversationState('similar');
        const similarEvents = mockEvents.filter(e => e.category === 'outdoor');
        addAIMessage(
          'Great! Here are some outdoor activities similar to your last hike:',
          ['Show me more', 'Try something different'],
          similarEvents
        );
      } else if (response.includes('different')) {
        setConversationState('exploring');
        addAIMessage(
          'Adventure mode! What vibe are you feeling today?',
          ['Creative & artsy', 'Social & energetic', 'Chill & relaxing', 'Something active']
        );
      } else if (response.includes('surprise')) {
        setConversationState('surprise');
        const randomEvents = [...mockEvents].sort(() => 0.5 - Math.random()).slice(0, 3);
        addAIMessage(
          'Here are some totally random picks that caught my eye:',
          ['Love these!', 'Show me something else'],
          randomEvents
        );
      }
    } else if (conversationState === 'exploring') {
      if (response.includes('creative') || response.includes('artsy')) {
        const creativeEvents = mockEvents.filter(e => e.category === 'creative');
        addAIMessage(
          'Perfect! Here are some creative spots where you can unleash your artistic side:',
          ['Book one of these', 'What about music instead?'],
          creativeEvents
        );
      } else if (response.includes('social') || response.includes('energetic')) {
        const socialEvents = mockEvents.filter(e => ['music', 'entertainment'].includes(e.category));
        addAIMessage(
          'Let\'s get social! Here are some energetic spots perfect for meeting people:',
          ['These look fun!', 'Any food involved?'],
          socialEvents
        );
      } else if (response.includes('chill') || response.includes('relaxing')) {
        const chillEvents = mockEvents.filter(e => e.category === 'food');
        addAIMessage(
          'Time to unwind! Here are some laid-back spots to relax:',
          ['Perfect!', 'Maybe something more active?'],
          chillEvents
        );
      } else if (response.includes('active')) {
        const activeEvents = mockEvents.filter(e => e.category === 'adventure');
        addAIMessage(
          'Let\'s get moving! Here are some active adventures:',
          ['Sign me up!', 'Show me easier options'],
          activeEvents
        );
      }
    } else {
      // General fallback responses
      addAIMessage(
        'Want to explore more options or start a new search?',
        ['Show me more', 'Start over', 'I\'m all set']
      );
    }
  };

  const EventCard = ({ event }: { event: Event }) => (
    <div
      style={{
        backgroundColor: '#101A2B',
        border: '1px solid #1b2a44',
        borderRadius: '12px',
        padding: '12px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
      }}
    >
      <img
        src={event.image}
        alt={event.title}
        style={{
          width: '100%',
          height: '120px',
          borderRadius: '8px',
          objectFit: 'cover',
          marginBottom: '8px'
        }}
      />
      <h4 style={{
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '700',
        margin: '0 0 4px 0'
      }}>
        {event.title}
      </h4>
      <p style={{
        color: '#9FBAD1',
        fontSize: '12px',
        margin: '0 0 6px 0'
      }}>
        {event.venue} • {event.city}
      </p>
      <p style={{
        color: '#CFE8FF',
        fontSize: '11px',
        margin: 0,
        lineHeight: '1.3'
      }}>
        {event.description}
      </p>
    </div>
  );

  return (
    <div style={{
      backgroundColor: '#0F1623',
      minHeight: '100vh',
      color: '#E2F4FF',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 16px',
        borderBottom: '1px solid #1b2a44',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '800',
          margin: 0,
          color: '#FFFFFF'
        }}>
          BORED
        </h1>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#101A2B',
            color: '#E2F4FF',
            border: '1px solid #1b2a44',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Home
        </button>
      </header>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        padding: '20px 16px',
        paddingBottom: '120px',
        overflowY: 'auto'
      }}>
        {messages.map(message => (
          <div key={message.id} style={{
            marginBottom: '24px',
            display: 'flex',
            flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
          }}>
            {/* Avatar */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '16px',
              backgroundColor: message.type === 'ai' ? '#00D1FF' : '#8B5CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: message.type === 'ai' ? '12px' : '0',
              marginLeft: message.type === 'user' ? '12px' : '0',
              fontSize: '16px',
              flexShrink: 0
            }}>
              {message.type === 'ai' ? '🤖' : '👤'}
            </div>

            {/* Message Content */}
            <div style={{
              backgroundColor: message.type === 'ai' ? '#1a2332' : '#2D1B69',
              border: `1px solid ${message.type === 'ai' ? '#00D1FF' : '#8B5CF6'}`,
              borderRadius: '16px',
              padding: '16px',
              maxWidth: '80%'
            }}>
              <p style={{
                color: '#E2F4FF',
                fontSize: '14px',
                margin: '0 0 12px 0',
                lineHeight: '1.4'
              }}>
                {message.content}
              </p>

              {/* Quick Reply Suggestions */}
              {message.suggestions && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={`${message.id}-suggestion-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#00D1FF',
                        border: '1px solid #00D1FF',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Event Cards */}
              {message.events && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}>
                  {message.events.map(event => (
                    <EventCard key={`${message.id}-event-${event.id}`} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '16px',
              backgroundColor: '#00D1FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              fontSize: '16px'
            }}>
              🤖
            </div>
            <div style={{
              backgroundColor: '#1a2332',
              border: '1px solid #00D1FF',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              gap: '4px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#00D1FF',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#00D1FF',
                animation: 'pulse 1.5s ease-in-out infinite 0.2s'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#00D1FF',
                animation: 'pulse 1.5s ease-in-out infinite 0.4s'
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0B1220',
        borderTop: '1px solid #1b2a44',
        padding: '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response or use the suggestions above..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              backgroundColor: '#101A2B',
              border: '1px solid #1b2a44',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#FFFFFF',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              backgroundColor: '#00D1FF',
              color: '#0F1623',
              border: 'none',
              padding: '12px 20px',
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

      <style>{`
        @keyframes pulse {
          0%, 70%, 100% { 
            transform: scale(1);
            opacity: 0.5;
          }
          35% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
        
        input::placeholder {
          color: #9FBAD1;
        }
      `}</style>
    </div>
  );
}

export default ConversationalSearch;