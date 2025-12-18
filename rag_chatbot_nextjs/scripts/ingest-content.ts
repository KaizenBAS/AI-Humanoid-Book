import { CohereClient } from 'cohere-ai';
import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import 'dotenv/config'; // Load environment variables

// Verify environment variables exist
if (!process.env.COHERE_API_KEY) {
  throw new Error('Missing required environment variable: COHERE_API_KEY');
}

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing required environment variable: PINECONE_API_KEY');
}

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Missing required environment variable: PINECONE_INDEX_NAME');
}

// Initialize services
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

// Function to extract text from MDX content
function extractTextFromMdx(content: string): string {
  // Remove JSX components and markdown syntax
  return content
    .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove markdown links
    .replace(/!\[.*?\]\(.+?\)/g, '') // Remove images
    .replace(/^#{1,6}\s*(.*?)$/gm, '$1') // Remove headers
    .replace(/\*\*?(.+?)\*\*?/g, '$1') // Remove bold/italic
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/^>\s+(.*?)$/gm, '$1') // Remove blockquotes
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Function to chunk text
function chunkText(text: string, chunkSize: number = 1000, overlap: number = 100): string[] {
  if (text.length <= chunkSize) {
    return [text];
  }

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = start + chunkSize;

    // Make sure we don't go beyond the text
    if (end > text.length) {
      end = text.length;
    }

    chunks.push(text.slice(start, end));
    start = end - overlap;

    // If the remaining text is less than chunkSize, take it all
    if (text.length - start < chunkSize) {
      if (start < text.length) {
        chunks.push(text.slice(start));
      }
      break;
    }
  }

  return chunks.filter(chunk => chunk.trim().length > 0);
}

// Recursive function to get all MDX files
function getAllMdxFiles(dir: string, files: string[] = []): string[] {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getAllMdxFiles(fullPath, files);
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main function to process the book content
export async function processBookContent(docsDir: string): Promise<void> {
  console.log(`Processing book content from: ${docsDir}`);

  const mdxFiles = getAllMdxFiles(docsDir);
  console.log(`Found ${mdxFiles.length} MDX files`);

  for (const file of mdxFiles) {
    console.log(`Processing: ${file}`);

    // Read the content of the MDX file
    const mdxContent = fs.readFileSync(file, 'utf8');
    const parsed = matter(mdxContent);
    
    // Extract plain text from MDX
    const plainText = extractTextFromMdx(parsed.content);

    // Break down file path to get chapter/section info
    const relativePath = path.relative(docsDir, file);
    const pathParts = relativePath.split(path.sep);
    const chapter = pathParts[0] || "intro";
    const section = path.basename(file, '.mdx'); // filename without extension

    // Create metadata
    const metadata = {
      title: section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      chapter: chapter,
      section: section,
      source_file: relativePath,
      processed_at: new Date().toISOString()
    };

    // Chunk the text if it's too long
    const textChunks = chunkText(plainText, 1000, 100);
    console.log(`  - Generated ${textChunks.length} chunks`);

    // Add each chunk to Pinecone
    for (let i = 0; i < textChunks.length; i++) {
      const chunk = textChunks[i];
      const chunkId = `${file}_chunk_${i}`;

      // Generate embeddings for the content with rate limiting
      const embedResponse = await cohere.embed({
        texts: [chunk],
        model: 'embed-english-v3.0', // Cohere's latest embedding model
        inputType: 'search_document',
      });

      // Extract the embedding vector properly
      let embedding: number[];
      const embeddings = embedResponse.embeddings;

      if (Array.isArray(embeddings) && embeddings.length > 0 && Array.isArray(embeddings[0])) {
        // If embeddings is an array of arrays, take the first one
        embedding = embeddings[0] as number[];
      } else {
        // Fallback case
        throw new Error('Invalid embedding format received from Cohere');
      }

      // Create the document ID and metadata
      const docId = `${file}_chunk_${i}`;
      const docMetadata = {
        ...metadata,
        chunk_index: i,
        total_chunks: textChunks.length,
        content: chunk, // Store the actual content
        content_preview: chunk.substring(0, 200) + '...', // Also store a preview of the content
      };

      // Upsert the document in Pinecone
      await index.upsert([
        {
          id: docId,
          values: embedding,
          metadata: docMetadata
        }
      ]);

      console.log(`    - Added chunk ${i + 1}/${textChunks.length} with ID: ${docId}`);

      // Add a delay to respect rate limits (especially important for free tier)
      // Free tier allows 40 requests per minute, so approximately 1.5 second delay between requests
      if (i < textChunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  }

  console.log('Finished processing all content');
}

// If running this script directly
if (require.main === module) {
  const docsDirectory = process.argv[2] || '../../../my-book-website/docs'; // Default path relative to this script
  
  processBookContent(docsDirectory)
    .then(() => {
      console.log('Content ingestion completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during content ingestion:', error);
      process.exit(1);
    });
}