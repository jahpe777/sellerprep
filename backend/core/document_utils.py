import os
from pathlib import Path
import tempfile


def extract_document_content(document_file):
    """
    Extract text content from various document types for PDF inclusion.
    Returns a dictionary with content and metadata.
    """
    try:
        file_path = document_file.path
        file_extension = Path(file_path).suffix.lower()

        content = {
            'text': '',
            'type': file_extension,
            'extractable': False,
            'error': None
        }

        if file_extension == '.txt':
            content.update({
                'text': extract_text_content(file_path),
                'extractable': True
            })
        elif file_extension == '.pdf':
            content.update({
                'text': extract_pdf_content(file_path),
                'extractable': True
            })
        elif file_extension in ['.doc', '.docx']:
            content.update({
                'text': extract_word_content(file_path),
                'extractable': True
            })
        else:
            content.update({
                'text': f'Document preview not available for {file_extension} files. File can be accessed separately.',
                'extractable': False
            })

        return content

    except Exception as e:
        return {
            'text': f'Error extracting content: {str(e)}',
            'type': file_extension if 'file_extension' in locals() else 'unknown',
            'extractable': False,
            'error': str(e)
        }


def extract_text_content(file_path):
    """Extract content from plain text files."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            # Limit content length for PDF inclusion
            if len(content) > 2000:
                content = content[:2000] + "\n\n[Content truncated for PDF report...]"
            return content
    except UnicodeDecodeError:
        # Try with different encoding
        try:
            with open(file_path, 'r', encoding='latin-1') as file:
                content = file.read()
                if len(content) > 2000:
                    content = content[:2000] + "\n\n[Content truncated for PDF report...]"
                return content
        except Exception:
            return "Unable to read text file content."
    except Exception as e:
        return f"Error reading text file: {str(e)}"


def extract_pdf_content(file_path):
    """Extract text content from PDF files."""
    try:
        # Try to import PyPDF2 or similar library
        import PyPDF2

        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text_content = ""

            # Extract text from first few pages only (for PDF preview)
            max_pages = min(3, len(pdf_reader.pages))

            for page_num in range(max_pages):
                page = pdf_reader.pages[page_num]
                text_content += page.extract_text() + "\n\n"

            if len(pdf_reader.pages) > 3:
                text_content += f"\n[PDF contains {len(pdf_reader.pages)} total pages. First 3 pages shown above.]"

            # Limit content length
            if len(text_content) > 2000:
                text_content = text_content[:2000] + "\n\n[Content truncated for PDF report...]"

            return text_content if text_content.strip() else "PDF contains non-text content or is image-based."

    except ImportError:
        return "PDF text extraction not available. Install PyPDF2 for PDF content preview."
    except Exception as e:
        return f"Error extracting PDF content: {str(e)}"


def extract_word_content(file_path):
    """Extract text content from Word documents."""
    try:
        # Try to import python-docx
        from docx import Document

        doc = Document(file_path)
        text_content = ""

        for paragraph in doc.paragraphs:
            text_content += paragraph.text + "\n"

        # Limit content length
        if len(text_content) > 2000:
            text_content = text_content[:2000] + "\n\n[Content truncated for PDF report...]"

        return text_content if text_content.strip() else "Word document appears to be empty or contains only formatting."

    except ImportError:
        return "Word document text extraction not available. Install python-docx for Word content preview."
    except Exception as e:
        return f"Error extracting Word content: {str(e)}"


def get_document_preview_summary(document):
    """
    Get a summary of document content for PDF inclusion.
    Returns formatted content suitable for PDF display.
    """
    try:
        content = extract_document_content(document.file)

        summary = {
            'filename': os.path.basename(document.file.name),
            'uploaded': document.uploaded_at.strftime("%Y-%m-%d"),
            'type': content['type'],
            'extractable': content['extractable'],
            'preview_text': content['text'],
            'has_error': content.get('error') is not None
        }

        return summary

    except Exception as e:
        return {
            'filename': os.path.basename(document.file.name),
            'uploaded': document.uploaded_at.strftime("%Y-%m-%d"),
            'type': 'unknown',
            'extractable': False,
            'preview_text': f'Error generating preview: {str(e)}',
            'has_error': True
        }