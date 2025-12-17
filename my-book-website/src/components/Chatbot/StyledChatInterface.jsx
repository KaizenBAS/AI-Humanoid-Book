import React, { useState, useRef, useEffect } from 'react';

const StyledChatInterface = ({ backendUrl = 'http://localhost:8000' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);

  // Function to get selected text from the page
  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        setSelectedText(selectedText);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message to the chat
    const userMessage = { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare the request body
      const requestBody = {
        question: inputValue,
        selected_text: selectedText || null,
      };

      // Call the backend API
      const response = await fetch(`${backendUrl}/api/v1/chat/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response to the chat
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        sources: data.sources,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedText(''); // Clear selected text after sending
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Define styles as objects
  const buttonStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '60px',
    height: '60px',
    backgroundColor: '#3B82F6', // Tailwind blue-500
    color: 'white',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    fontSize: '16px',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#2563EB', // Tailwind blue-600
    transform: 'scale(1.1)',
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  };

  const windowStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '320px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#3B82F6',
    color: 'white',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  };

  const headerTextStyle = {
    fontSize: '14px',
    fontWeight: '600',
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const chatAreaStyle = {
    flexGrow: 1,
    padding: '12px',
    overflowY: 'auto',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
  };

  const welcomeStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontSize: '14px',
    textAlign: 'center',
  };

  const messageContainerStyle = {
    display: 'flex',
    marginBottom: '12px',
  };

  const userMessageStyle = {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '18px',
    maxWidth: '85%',
    wordWrap: 'break-word',
    borderBottomRightRadius: '4px',
  };

  const botMessageStyle = {
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    padding: '8px 12px',
    borderRadius: '18px',
    maxWidth: '85%',
    wordWrap: 'break-word',
    borderBottomLeftRadius: '4px',
  };

  const inputAreaStyle = {
    borderTop: '1px solid #e5e7eb',
    padding: '8px',
    backgroundColor: 'white',
  };

  const formStyle = {
    display: 'flex',
    gap: '4px',
  };

  const textareaStyle = {
    flexGrow: 1,
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '8px 12px',
    resize: 'none',
    fontSize: '14px',
    maxHeight: '80px',
  };

  const submitBtnStyle = {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const submitBtnDisabledStyle = {
    ...submitBtnStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const [isHovered, setIsHovered] = useState(false);

  // Floating button that appears in bottom right
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={isHovered ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  // Chat window when open
  return (
    <div style={chatWindowStyle}>
      <div style={windowStyle}>
        <div style={headerStyle}>
          <div style={headerTextStyle}>Book Assistant</div>
          <button 
            onClick={() => setIsOpen(false)}
            style={closeBtnStyle}
          >
            ×
          </button>
        </div>
        
        <div style={chatAreaStyle}>
          {messages.length === 0 ? (
            <div style={welcomeStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px', marginBottom: '8px' }} fill="none" viewBox="0 0 24 24" stroke="#9CA3AF">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p>Ask me about the book content!</p>
              {selectedText && (
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#3B82F6' }}>
                  Selected: "{selectedText.substring(0, 30)}{selectedText.length > 30 ? '...' : ''}"
                </p>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {messages.map((message) => (
                <div key={message.id} style={messageContainerStyle}>
                  <div style={message.sender === 'user' ? userMessageStyle : botMessageStyle}>
                    <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{message.text}</div>
                    
                    {message.sources && message.sources.length > 0 && (
                      <div style={{ marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: '10px' }}>
                        <p style={{ fontWeight: '600', marginBottom: '2px' }}>Sources:</p>
                        <ul style={{ paddingLeft: '10px' }}>
                          {message.sources.slice(0, 2).map((source, idx) => (
                            <li key={idx} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              • {source.metadata?.title || 'Reference'}
                            </li>
                          ))}
                          {message.sources.length > 2 && (
                            <li>• And {message.sources.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={messageContainerStyle}>
                  <div style={botMessageStyle}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%', animation: 'bounce 1s infinite' }}> </div>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.2s' }}> </div>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.4s' }}> </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div style={inputAreaStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedText ? "Ask about selection..." : "Ask about book..."}
              style={textareaStyle}
              disabled={isLoading}
              rows="1"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              style={inputValue.trim() && !isLoading ? submitBtnStyle : submitBtnDisabledStyle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          
          {selectedText && (
            <div style={{ marginTop: '4px', fontSize: '11px', color: '#3B82F6', backgroundColor: '#dbeafe', padding: '4px', borderRadius: '4px' }}>
              Using: "{selectedText.substring(0, 40)}{selectedText.length > 40 ? '...' : ''}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyledChatInterface;