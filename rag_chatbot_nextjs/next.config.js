/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COHERE_API_KEY: process.env.COHERE_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
  },
  // Enable compression for faster load times
  compress: true,
};

module.exports = nextConfig;