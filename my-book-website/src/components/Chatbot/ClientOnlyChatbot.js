import React, { useState, useEffect } from 'react';
import StyledChatInterface from './StyledChatInterface';

// This component only renders in the browser
const ClientOnlyChatbot = ({ backendUrl }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing on the server, empty fragment in browser until hydrated
    return <></>;
  }

  return <StyledChatInterface backendUrl={backendUrl} />;
};

export default ClientOnlyChatbot;