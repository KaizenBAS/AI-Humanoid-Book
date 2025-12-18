import { RAGService } from '../../../backend/rag_chatbot/services/rag_service.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, selected_text } = req.body;

    // Validate input
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Initialize RAG service (this will use environment variables)
    const ragService = new RAGService();
    
    // Generate answer using the RAG service
    const result = await ragService.generateAnswer(question, selected_text);

    // Return the response
    res.status(200).json({
      response: result.response,
      sources: result.sources || [],
      session_id: req.body.session_id || 'default-session',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing chat query:', error);
    res.status(500).json({
      response: 'Sorry, I encountered an error while processing your question. Please try again.',
      sources: [],
      session_id: req.body.session_id || 'default-session',
      timestamp: new Date().toISOString()
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};