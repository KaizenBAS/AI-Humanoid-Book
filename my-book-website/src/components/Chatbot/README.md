# Chatbot Component

This is the frontend chatbot interface that integrates with the Docusaurus book website.

## Overview

The chatbot component provides:
- A floating button that appears on all pages
- A modal interface for chatting with the RAG system
- Text selection functionality to ask questions about specific content
- Integration with the backend RAG API

## Features

- **Floating Chat Button**: Always accessible chat button on every page
- **Text Selection Context**: Users can select text on the page and ask questions about it
- **Responsive Design**: Works well on both desktop and mobile devices
- **Real-time Chat**: Interactive chat experience with loading indicators
- **Source Attribution**: Shows sources for the bot's responses

## Integration

The chatbot is integrated into Docusaurus via a custom plugin that:
1. Injects the chatbot UI into every page
2. Provides a root element for the React component
3. Handles communication with the backend API

## Configuration

To change the backend API URL:
1. Set the `BACKEND_URL` environment variable when building the site
2. Or modify the default URL in `ChatbotInjector.js`

## Components

- `ChatInterface.jsx`: Main React component for the chat interface
- `ChatbotInjector.js`: Docusaurus plugin to inject the chatbot into the page
- `index.js`: Docusaurus plugin entry point

## Styling

The chatbot uses the site's existing Tailwind CSS configuration and custom styles defined in `src/css/custom.css`. The component is designed to match the site's aesthetic.