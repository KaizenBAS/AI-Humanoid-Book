import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ 
    status: 'healthy',
    message: 'RAG Chatbot API is running!',
    timestamp: new Date().toISOString()
  });
}