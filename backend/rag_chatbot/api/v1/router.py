from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import uuid4
from datetime import datetime

from .models import ChatRequest, ChatResponse, Source, DocumentPayload, DocumentResponse
from services.rag_service import RAGService
from database.session import get_db
from models.chat import ChatSession, ChatMessage


router = APIRouter()


@router.post("/chat/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Endpoint to handle chat queries using RAG.
    """
    try:
        # Create or retrieve chat session
        session_id = request.session_id or str(uuid4())

        # Check if session exists
        session = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
        if not session:
            # Create new session
            session = ChatSession(session_id=session_id)
            db.add(session)
            db.commit()
            db.refresh(session)

        # Save user message to database
        user_message = ChatMessage(
            session_id=session_id,
            role="user",
            content=request.question
        )
        db.add(user_message)
        db.commit()

        # Initialize RAG service and generate response
        rag_service = RAGService()
        result = rag_service.generate_answer(request.question, request.selected_text)

        # Create source objects from results
        sources = [Source(**source) for source in result.get("sources", [])]

        # Create assistant message in database
        assistant_message = ChatMessage(
            session_id=session_id,
            role="assistant",
            content=result["response"]
        )
        db.add(assistant_message)
        db.commit()

        # Return the response
        return ChatResponse(
            response=result["response"],
            sources=sources,
            session_id=session_id,
            timestamp=datetime.utcnow()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing chat query: {str(e)}"
        )


@router.post("/admin/embed", response_model=DocumentResponse)
async def embed_document(payload: DocumentPayload):
    """
    Admin endpoint to embed document content into the vector store.
    """
    try:
        # Initialize RAG service
        rag_service = RAGService()

        # Add document to knowledge base
        rag_service.add_document_to_knowledge_base(
            doc_id=payload.document_id,
            content=payload.content,
            metadata=payload.metadata
        )

        # For simplicity, we're treating the entire content as one chunk
        # In a real implementation, you might want to chunk the content
        return DocumentResponse(
            status="success",
            document_id=payload.document_id,
            chunks_embedded=1
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error embedding document: {str(e)}"
        )