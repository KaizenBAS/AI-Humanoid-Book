from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime


class ChatRequest(BaseModel):
    question: str
    session_id: Optional[str] = None
    selected_text: Optional[str] = None
    document_context: Optional[Dict] = None


class Source(BaseModel):
    id: Optional[str] = None
    content: str
    relevance_score: Optional[float] = None
    metadata: Optional[Dict] = None


class ChatResponse(BaseModel):
    response: str
    sources: List[Source]
    session_id: str
    timestamp: datetime


class DocumentPayload(BaseModel):
    content: str
    document_id: str
    metadata: Dict


class DocumentResponse(BaseModel):
    status: str
    document_id: str
    chunks_embedded: int