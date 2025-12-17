import os
import glob
from pathlib import Path
from typing import Dict, List
import hashlib

from utils.text_processing import extract_text_from_mdx, chunk_text
from services.rag_service import RAGService


def get_all_mdx_files(docs_dir: str) -> List[str]:
    """
    Get all MDX files from the docs directory.

    Args:
        docs_dir: Path to the docs directory

    Returns:
        List of paths to MDX files
    """
    # First, let's check if the directory exists
    if not os.path.exists(docs_dir):
        print(f"Directory does not exist: {docs_dir}")
        return []

    # Check what's in the directory
    print(f"Contents of {docs_dir}:")
    for root, dirs, files in os.walk(docs_dir):
        level = root.replace(docs_dir, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 2 * (level + 1)
        for file in files:
            print(f"{subindent}{file}")

    # Look for both .mdx and .md files (Docusaurus uses both)
    mdx_pattern = os.path.join(docs_dir, "**", "*.mdx")
    mdx_files = glob.glob(mdx_pattern, recursive=True)

    md_pattern = os.path.join(docs_dir, "**", "*.md")
    md_files = glob.glob(md_pattern, recursive=True)

    print(f"Found {len(mdx_files)} .mdx files and {len(md_files)} .md files")

    # Return both types
    return mdx_files + md_files


def generate_document_id(file_path: str, content: str) -> str:
    """
    Generate a unique document ID based on file path and content.

    Args:
        file_path: Path to the document
        content: Content of the document

    Returns:
        Unique document ID
    """
    # Using UUID to ensure Qdrant compatibility
    import uuid
    doc_id = str(uuid.uuid4())
    return doc_id


def process_book_content(docs_dir: str, rag_service: RAGService):
    """
    Process all book content and add it to the knowledge base.

    Args:
        docs_dir: Path to the docs directory
        rag_service: RAG service instance to add documents to
    """
    print(f"Processing book content from: {docs_dir}")

    mdx_files = get_all_mdx_files(docs_dir)
    print(f"Found {len(mdx_files)} MDX files")

    for file_path in mdx_files:
        print(f"Processing: {file_path}")

        # Read the content of the MDX file
        with open(file_path, 'r', encoding='utf-8') as f:
            mdx_content = f.read()

        # Extract plain text from MDX
        plain_text = extract_text_from_mdx(mdx_content)

        # Break down file path to get chapter/section info
        relative_path = os.path.relpath(file_path, docs_dir)
        path_parts = relative_path.split(os.sep)
        chapter = path_parts[0] if len(path_parts) > 1 else "intro"
        section = Path(file_path).stem  # filename without extension

        # Create metadata
        metadata = {
            "title": section.replace('-', ' ').title(),
            "chapter": chapter,
            "section": section,
            "source_file": relative_path,
            "processed_at": "2025-12-17T00:00:00Z"
        }

        # Chunk the text if it's too long
        text_chunks = chunk_text(plain_text, chunk_size=1000, overlap=100)

        print(f"  - Generated {len(text_chunks)} chunks")

        # Add each chunk to the knowledge base
        for i, chunk in enumerate(text_chunks):
            # Create a unique ID for each chunk
            chunk_content = f"{chunk}"
            doc_id = generate_document_id(f"{file_path}_chunk_{i}", chunk_content)

            # Add to knowledge base
            try:
                rag_service.add_document_to_knowledge_base(
                    doc_id=doc_id,
                    content=chunk,
                    metadata={**metadata, "chunk_index": i, "total_chunks": len(text_chunks)}
                )
                print(f"    - Added chunk {i+1}/{len(text_chunks)} with ID: {doc_id[:8]}...")
            except Exception as e:
                print(f"    - Error adding chunk {i+1}: {str(e)}")

    print("Finished processing all content")


if __name__ == "__main__":
    # Initialize the RAG service
    rag_service = RAGService()

    # Process the book content - use the mounted path in the container
    docs_directory = "/app/docs"  # Path where docs are mounted in the container
    process_book_content(docs_directory, rag_service)