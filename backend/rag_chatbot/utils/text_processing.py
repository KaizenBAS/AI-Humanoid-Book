import re
from typing import List


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks.
    
    Args:
        text: The text to chunk
        chunk_size: Maximum size of each chunk
        overlap: Number of characters to overlap between chunks
    
    Returns:
        List of text chunks
    """
    if len(text) <= chunk_size:
        return [text]
    
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        
        # Make sure we don't go beyond the text
        if end > len(text):
            end = len(text)
        
        chunk = text[start:end]
        chunks.append(chunk)
        
        # Move start forward by chunk_size minus overlap
        start = end - overlap
        
        # If the remaining text is less than chunk_size, take it all
        if len(text) - start < chunk_size:
            if start < len(text):
                chunks.append(text[start:])
            break
    
    # Remove any empty chunks
    chunks = [chunk for chunk in chunks if chunk.strip()]
    
    return chunks


def extract_text_from_mdx(content: str) -> str:
    """
    Extract plain text from MDX content by removing MDX syntax.

    Args:
        content: The MDX content to extract text from

    Returns:
        Plain text content
    """
    # Remove MDX/JSX components (anything between {} that looks like component props)
    text = re.sub(r'\{[^}]*\}', ' ', content)

    # Remove markdown-style links [text](url)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

    # Remove markdown-style images ![alt text](url)
    text = re.sub(r'!\[[^\]]+\]\([^)]+\)', '', text)

    # Remove markdown headers
    text = re.sub(r'^#+\s+', '', text, flags=re.MULTILINE)

    # Remove italic and bold formatting
    text = re.sub(r'\*{1,2}([^*]+)\*{1,2}', r'\1', text)
    text = re.sub(r'_{1,2}([^_]+)_{1,2}', r'\1', text)

    # Remove inline code - fixed: replace with the actual content, not \1
    text = re.sub(r'`([^`]+)`', r'\1', text)  # Using a capture group to keep the content

    # Remove blockquotes
    text = re.sub(r'^>\s+', '', text, flags=re.MULTILINE)

    # Remove code blocks
    text = re.sub(r'```[\s\S]+?```', '', text)

    # Remove horizontal rules
    text = re.sub(r'^\s*[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)

    # Clean up extra whitespace
    text = re.sub(r'\s+', ' ', text)

    # Strip leading/trailing whitespace
    text = text.strip()

    return text