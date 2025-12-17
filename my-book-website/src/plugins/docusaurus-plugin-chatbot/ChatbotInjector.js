import React from 'react';
import { createRoot } from 'react-dom/client';
import StyledChatInterface from '../../components/Chatbot/StyledChatInterface';

// Create a root element for the chatbot
function injectChatbot() {
  // Configuration - you can change the backend URL here
  // Default URL for the backend API
  const backendUrl = 'http://localhost:8000'; // Change this if your backend runs on a different port

  let container = document.getElementById('chatbot-root');

  // If the container doesn't exist, create it
  if (!container) {
    container = document.createElement('div');
    container.id = 'chatbot-root';
    document.body.appendChild(container);
  }

  if (container) {
    const root = createRoot(container);
    root.render(<StyledChatInterface backendUrl={backendUrl} />);

    // Debug: Log that the chatbot has been injected
    console.log("Chatbot injected successfully");
  } else {
    console.error("Chatbot container element not found or created");
  }
}

// Wait for the DOM to be fully loaded before injecting the chatbot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectChatbot);
} else {
  // DOM is already ready, so execute immediately
  injectChatbot();
}

// Debug: Log that the script has loaded
console.log("Chatbot plugin loaded");