import { processBookContent } from '../../scripts/ingest-content'; // Adjusted import path
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Use the absolute path to the docs directory
    const docsDir = 'F:\\bas Important projects\\qwen\\my-book-website\\docs';

    await processBookContent(docsDir);

    res.status(200).json({
      message: 'Content ingestion completed successfully!',
      docsProcessed: docsDir
    });
  } catch (error) {
    console.error('Error during content ingestion:', error);
    res.status(500).json({
      error: 'Failed to ingest content',
      details: (error as Error).message
    });
  }
}