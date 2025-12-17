from typing import List, Dict, Optional
from .vector_store import VectorStoreService
from cohere import Client
from core.config import settings
import logging


logger = logging.getLogger(__name__)


class RAGService:
    def __init__(self):
        self.vector_store = VectorStoreService()
        self.cohere_client = Client(api_key=settings.COHERE_API_KEY)
    
    def generate_answer(self, query: str, selected_text: Optional[str] = None) -> Dict:
        """
        Generate an answer to the query using RAG.
        
        Args:
            query: The user's question
            selected_text: Optional text selected by user for focused context
        
        Returns:
            Dictionary containing the answer and source information
        """
        try:
            # If specific text is selected, use it as context
            if selected_text:
                # Generate response based on the selected text as context
                context = selected_text
                message = f"Based on the following context, please answer the question. If the context doesn't contain enough information to answer, please say so.\n\nContext: {context}\n\nQuestion: {query}"

                response = self.cohere_client.chat(
                    model='command-r7b-12-2024',  # Using the specific command model you provided
                    message=message,
                    max_tokens=500,
                    temperature=0.3
                )

                return {
                    "response": response.text.strip(),
                    "sources": [{"content": context[:200] + "...", "relevance_score": 1.0}],
                    "query": query
                }
            else:
                # Perform vector search to find relevant documents
                search_results = self.vector_store.search_documents(query, limit=5)
                
                if not search_results:
                    return {
                        "response": "I couldn't find any relevant information in the book to answer your question.",
                        "sources": [],
                        "query": query
                    }
                
                # Combine the content of the most relevant documents as context
                context_parts = []
                sources = []
                
                for result in search_results:
                    context_parts.append(result["content"])
                    sources.append({
                        "id": result["id"],
                        "content": result["content"][:200] + "...",  # Truncate for display
                        "relevance_score": result["score"],
                        "metadata": result["metadata"]
                    })
                
                # Combine context parts
                context = "\n\n".join(context_parts)
                
                # Generate response using Cohere's Chat API
                message = f"Based on the following context, please answer the question. If the context doesn't contain enough information to answer, please say so.\n\nContext: {context}\n\nQuestion: {query}"

                response = self.cohere_client.chat(
                    model='command-r7b-12-2024',
                    message=message,
                    max_tokens=500,
                    temperature=0.3
                )

                return {
                    "response": response.text.strip(),
                    "sources": sources,
                    "query": query
                }
        except Exception as e:
            logger.error(f"Error generating answer: {str(e)}")
            return {
                "response": "Sorry, I encountered an error while processing your question. Please try again.",
                "sources": [],
                "query": query
            }
    
    def add_document_to_knowledge_base(self, doc_id: str, content: str, metadata: Dict):
        """
        Add a document to the knowledge base for future queries.
        
        Args:
            doc_id: Unique identifier for the document
            content: The text content of the document
            metadata: Additional metadata about the document
        """
        try:
            self.vector_store.add_document(doc_id, content, metadata)
            logger.info(f"Added document {doc_id} to knowledge base")
        except Exception as e:
            logger.error(f"Error adding document {doc_id} to knowledge base: {str(e)}")
            raise e