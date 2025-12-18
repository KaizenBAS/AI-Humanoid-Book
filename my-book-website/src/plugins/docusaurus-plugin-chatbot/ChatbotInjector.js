// Create a root element for the chatbot
function injectChatbot() {
  // Only run in browser environment (not during SSR)
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Configuration - use the backend URL passed from the Docusaurus config
  // For production deployment, set via environment variables in Vercel
  const backendUrl = typeof window !== 'undefined' && window.BACKEND_URL ?
                    window.BACKEND_URL :
                    'https://your-backend-project-name.vercel.app'; // Replace with your actual backend URL after deployment

  let container = document.getElementById('chatbot-root');

  // If the container doesn't exist, create it
  if (!container) {
    container = document.createElement('div');
    container.id = 'chatbot-root';
    document.body.appendChild(container);
  }

  if (container) {
    // Dynamically import React and related modules
    import('react').then(React => {
      import('react-dom/client').then(ReactDOMClient => {
        import('../../components/Chatbot/ClientOnlyChatbot').then(ClientOnlyChatbotModule => {
          const { default: ClientOnlyChatbot } = ClientOnlyChatbotModule;

          const root = ReactDOMClient.createRoot(container);
          root.render(React.createElement(ClientOnlyChatbot, { backendUrl }));

          // Debug: Log that the chatbot has been injected
          console.log("Chatbot injected successfully");
        }).catch(error => {
          console.error('Error loading ClientOnlyChatbot:', error);
        });
      }).catch(error => {
        console.error('Error loading createRoot:', error);
      });
    }).catch(error => {
      console.error('Error loading React:', error);
    });
  } else {
    console.error("Chatbot container element not found or created");
  }
}

// Wait for the DOM to be fully loaded before injecting the chatbot
if (typeof document !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectChatbot);
} else if (typeof document !== 'undefined') {
  // DOM is already ready, so execute immediately
  injectChatbot();
}

// Debug: Log that the script has loaded
console.log("Chatbot plugin loaded");