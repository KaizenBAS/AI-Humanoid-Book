# RAG Chatbot Integration: Architectural Plan

## 1. Scope and Dependencies

### 1.1 In Scope
- Frontend chat interface component integrated with Docusaurus
- Backend FastAPI service for RAG orchestration
- Vector database integration with Qdrant Cloud
- PostgreSQL database for chat history using Neon Serverless
- Book content ingestion and embedding pipeline
- Selected text query functionality
- OpenAI API integration for question answering

### 1.2 Out of Scope
- New book content creation
- Major changes to existing Docusaurus site structure
- Infrastructure hosting management
- Payment processing (using free tiers)

### 1.3 External Dependencies
- OpenAI API: For LLM functionality and embeddings
- Qdrant Cloud: Vector database for book content embeddings
- Neon Serverless Postgres: For chat history and metadata storage
- Docusaurus: Existing static site framework
- Cloudflare/Netlify/Vercel: Site hosting (existing)

## 2. Key Decisions and Rationale

### 2.1 Technology Choices
**Option Considered 1: Client-side only solution**
- Pro: Simpler deployment
- Con: Would expose API keys to clients; limited control over query processing

**Option Considered 2: Hybrid approach with backend service**
- Pro: Secure API key management; full control over RAG process; proper logging and analytics
- Con: More complex infrastructure

**Rationale**: Choose Option 2 as it provides better security and control over the RAG process.

### 2.2 Architecture Pattern
**Option Considered 1: Serverless functions**
- Pro: Pay-per-use; auto-scaling
- Con: Cold starts; potential complexity in state management

**Option Considered 2: Deployed FastAPI service**
- Pro: Better performance; easier debugging; simpler state management
- Con: Always-on cost

**Rationale**: Choose Option 2 (FastAPI service) for better performance and debugging capabilities.

### 2.3 Integration Approach
**Option Considered 1: Embedded iframe**
- Pro: Isolated from main site; easier to develop independently
- Con: Integration not seamless; potential styling conflicts

**Option Considered 2: Native React component**
- Pro: Seamless integration with existing UI; shared styling system
- Con: More complex to integrate with Docusaurus

**Rationale**: Choose Option 2 (Native React component) for better user experience and design consistency.

### 2.4 Principles
- Minimal invasive changes to existing site
- Clear separation of concerns between frontend and backend
- Robust error handling and graceful degradation
- Data privacy and security by default

## 3. Interfaces and API Contracts

### 3.1 Public APIs

#### Chat Query API (POST /api/chat/query)
**Input:**
```json
{
  "question": "What is embodied intelligence?",
  "selected_text": "Embodied intelligence refers to AI systems that interact with the physical world...",
  "session_id": "uuid-string",
  "document_context": {
    "chapter": "weeks-1-2/foundations",
    "section": "introduction-to-physical-ai"
  }
}
```

**Output:**
```json
{
  "response": "Embodied intelligence refers to...",
  "sources": [
    {
      "document_id": "doc-123",
      "chapter": "weeks-1-2/foundations",
      "section": "introduction-to-physical-ai",
      "relevance_score": 0.87
    }
  ],
  "session_id": "uuid-string",
  "timestamp": "2023-06-15T10:30:00Z"
}
```

**Errors:**
- 400: Invalid request format
- 429: Rate limit exceeded
- 500: Internal server error

#### Content Embedding API (POST /api/admin/embed)
**Input:**
```json
{
  "content": "Full text of book chapter...",
  "document_id": "ch-1-2-foundations",
  "metadata": {
    "title": "Foundations of Physical AI",
    "chapter": "weeks-1-2/foundations",
    "section": "introduction"
  }
}
```

**Output:**
```json
{
  "status": "success",
  "document_id": "ch-1-2-foundations",
  "chunks_embedded": 24
}
```

**Errors:**
- 400: Invalid content format
- 401: Unauthorized
- 500: Embedding service error

### 3.2 Versioning Strategy
- API versioning using URI path: `/api/v1/chat/query`
- Backward compatibility maintained for 6 months after new version release
- Deprecation notices provided 30 days before removing old versions

### 3.3 Error Taxonomy
- 400 Bad Request: Client sent invalid request data
- 401 Unauthorized: Missing or invalid authentication
- 403 Forbidden: Insufficient permissions
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Unexpected server error
- 502 Bad Gateway: Downstream service error (OpenAI, Qdrant, etc.)

## 4. Non-Functional Requirements and Budgets

### 4.1 Performance
- p95 latency: < 5 seconds for chat responses
- Throughput: Support up to 50 concurrent users
- Resource caps: < 2GB memory, < 1 CPU core during normal operation

### 4.2 Reliability
- SLO: 99% availability for chat functionality
- Error budget: 1% monthly error allowance
- Degradation strategy: Graceful degradation to read-only when LLM unavailable

### 4.3 Security
- Authentication: JWT tokens for admin endpoints only
- Data encryption: All data at rest and in transit encrypted
- Secrets management: Environment variables for API keys
- Auditing: Log all query attempts with IP and timestamp

### 4.4 Cost
- Qdrant Cloud Free Tier: Up to 5GB storage, 1M vectors
- Neon Serverless: Pay-per-use with free tier options
- OpenAI API: Usage-based pricing dependent on queries

## 5. Data Management and Migration

### 5.1 Source of Truth
- Book content: MDX files in `docs/` directory
- Chat history: Neon Serverless Postgres
- Document embeddings: Qdrant Cloud

### 5.2 Schema Evolution
- Database schemas managed with Alembic migrations
- Document schema changes documented in version control
- Backward-compatible changes only (additive changes)

### 5.3 Migration Strategy
- Phase 1: Deploy backend services and databases
- Phase 2: Run content ingestion pipeline to populate vector DB
- Phase 3: Deploy frontend components
- Phase 4: Enable feature flag for public access

### 5.4 Data Retention
- Chat history: Retained for 365 days, then anonymized
- Logs: Retained for 90 days
- Embeddings: Permanently retained but updated when content changes

## 6. Operational Readiness

### 6.1 Observability
- Logging: Structured logs with request IDs for tracing
- Metrics: Response times, error rates, active sessions
- Tracing: Full request tracing through frontend → backend → external services

### 6.2 Alerting
- Response time alerts: Trigger if p95 latency > 10s
- Error rate alerts: Trigger if error rate > 5%
- Availability alerts: Trigger if service unavailable

### 6.3 Runbooks
- Service degradation: Steps to scale resources or disable features
- Data inconsistency: Steps to rebuild vector embeddings
- API key rotation: Steps to update credentials across services

### 6.4 Deployment and Rollback
- Blue-green deployment to eliminate downtime
- Automated rollback if health checks fail
- Gradual rollout with feature flags

## 7. Risk Analysis and Mitigation

### 7.1 Top 3 Risks

1. **External API Reliability (High Impact)**
   - Blast Radius: Complete service outage
   - Mitigation: Implement circuit breaker pattern, cache responses, provide fallbacks

2. **Content Freshness (Medium Impact)**
   - Blast Radius: Chatbot provides outdated answers
   - Mitigation: Automated content sync triggers, manual refresh option

3. **Rate Limits (Medium Impact)**
   - Blast Radius: Denial of service during peak usage
   - Mitigation: Request queuing, usage quotas per session, caching

### 7.2 Kill Switches/Guardrails
- Feature flag to disable chatbot functionality while keeping site operational
- Circuit breaker to bypass RAG process if external services unavailable
- Manual override to disable new chat sessions during maintenance

## 8. Evaluation and Validation

### 8.1 Definition of Done
- [ ] Backend API endpoints implemented and tested
- [ ] Frontend chat component integrated with Docusaurus
- [ ] Content ingestion pipeline operational
- [ ] All API endpoints properly documented
- [ ] Unit and integration tests passing (>90% coverage)
- [ ] Performance benchmarks met (<5s response time)
- [ ] Security scanning passed
- [ ] User acceptance testing completed

### 8.2 Output Validation
- Format: Response must conform to JSON schema
- Requirements: Answers must be grounded in book content
- Safety: Content filtering to prevent inappropriate responses