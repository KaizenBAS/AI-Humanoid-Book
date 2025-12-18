import { NextApiRequest, NextApiResponse } from 'next';
import { CohereClient } from 'cohere-ai';
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize services
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // In production, replace with your specific domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, selected_text } = req.body;

    // Validate input
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    let context = '';
    let sources = [];

    if (selected_text) {
      // Use selected text as context
      context = selected_text;
      sources = [{
        content: selected_text.substring(0, 200) + '...',
        relevance_score: 1.0,
        metadata: { type: 'selection' }
      }];
    } else {
      // Query vector database for relevant content
      const queryEmbedding = await cohere.embed({
        texts: [question],
        model: 'embed-english-v3.0', // Cohere's latest embedding model
        inputType: 'search_query',
      });

      // Extract the first embedding vector
      // The embeddings property is an array of float arrays
      let queryVector: number[];
      if (Array.isArray(queryEmbedding.embeddings) &&
          queryEmbedding.embeddings.length > 0 &&
          Array.isArray(queryEmbedding.embeddings[0])) {

        queryVector = queryEmbedding.embeddings[0] as number[];
      } else {
        throw new Error('Could not extract embedding vector from Cohere response');
      }

      // Query Pinecone for similar vectors
      const queryResponse = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
      });

      console.log(`Found ${queryResponse.matches.length} matches in vector store`);

      // Extract the most relevant content
      context = queryResponse.matches
        .filter(match => match.metadata) // Only matches with metadata
        .map(match => {
          // Try different possible content field names
          const content = match.metadata?.content ||
                         match.metadata?.text ||
                         match.metadata?.raw_content ||
                         match.metadata?.chunk_content ||
                         '';
          return typeof content === 'string' ? content : '';
        })
        .join('\n\n');

      // If no context found, log this
      if (!context.trim()) {
        console.log('No relevant content found in vector store for this query');
        console.log('Query response details:', queryResponse);
      }

      sources = queryResponse.matches.map(match => ({
        id: match.id,
        content: (() => {
          // Try different possible content field names
          const content = match.metadata?.content ||
                         match.metadata?.text ||
                         match.metadata?.raw_content ||
                         match.metadata?.chunk_content ||
                         JSON.stringify(match.metadata || {});
          const text = typeof content === 'string' ? content : JSON.stringify(content);
          return text.substring(0, 200) + '...';
        })(),
        relevance_score: match.score || 0,
        metadata: match.metadata
      }));
    }

    // Generate response using Cohere
    const response = await cohere.chat({
      message: `
        Based on the following context, please answer the question.
        If the context doesn't contain enough information to answer, please say so.

        Context: ${context}

        Question: ${question}
      `,
      model: 'command-r-plus-08-2024', // Updated model name
      temperature: 0.3,
    });

    // Return the response
    res.status(200).json({
      response: response.text || 'I could not generate a response at this time.',
      sources: sources,
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