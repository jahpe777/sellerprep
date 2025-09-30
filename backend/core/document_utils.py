import os
import mimetypes
from pathlib import Path
from datetime import datetime


def get_file_metadata(file_path):
    """
    Extract comprehensive file metadata without external dependencies.
    """
    try:
        stat = os.stat(file_path)
        file_size = stat.st_size
        modified_time = datetime.fromtimestamp(stat.st_mtime)

        # Get MIME type
        mime_type, _ = mimetypes.guess_type(file_path)

        return {
            'size': file_size,
            'size_formatted': format_file_size(file_size),
            'modified': modified_time,
            'mime_type': mime_type or 'application/octet-stream'
        }
    except Exception:
        return {
            'size': 0,
            'size_formatted': 'Unknown',
            'modified': None,
            'mime_type': 'unknown'
        }


def format_file_size(size_bytes):
    """Convert bytes to human readable format."""
    if size_bytes == 0:
        return "0 B"

    size_names = ["B", "KB", "MB", "GB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024
        i += 1

    return f"{size_bytes:.1f} {size_names[i]}"


def get_document_description(file_extension, file_name, file_size):
    """
    Generate descriptive information about the document based on file characteristics.
    """
    descriptions = {
        '.pdf': "PDF document - likely contains formatted text, images, or technical drawings. Common for contracts, reports, plans, and official documents.",
        '.doc': "Microsoft Word document - contains formatted text and may include images or tables.",
        '.docx': "Microsoft Word document - contains formatted text and may include images or tables.",
        '.txt': "Plain text document - contains unformatted text information.",
        '.jpg': "JPEG image - photographic image that may show property conditions, features, or documentation.",
        '.jpeg': "JPEG image - photographic image that may show property conditions, features, or documentation.",
        '.png': "PNG image - high-quality image that may contain screenshots, diagrams, or clear photos.",
        '.gif': "GIF image - may be an animated image or simple graphic.",
        '.bmp': "Bitmap image - uncompressed image file.",
        '.tiff': "TIFF image - high-quality image often used for scanned documents.",
        '.xls': "Excel spreadsheet - contains data in rows and columns, possibly financial or analytical information.",
        '.xlsx': "Excel spreadsheet - contains data in rows and columns, possibly financial or analytical information.",
        '.ppt': "PowerPoint presentation - slide-based presentation with text, images, and graphics.",
        '.pptx': "PowerPoint presentation - slide-based presentation with text, images, and graphics.",
        '.zip': "Compressed archive - contains multiple files packaged together.",
        '.rar': "Compressed archive - contains multiple files packaged together.",
        '.csv': "CSV data file - comma-separated values, typically spreadsheet data in plain text format."
    }

    base_description = descriptions.get(file_extension, f"{file_extension.upper()} file - specialized document format.")

    # Add size context
    if file_size > 10 * 1024 * 1024:  # > 10MB
        size_context = " This is a large file, likely containing high-resolution images or extensive content."
    elif file_size > 1 * 1024 * 1024:  # > 1MB
        size_context = " This is a medium-sized file with substantial content."
    elif file_size < 50 * 1024:  # < 50KB
        size_context = " This is a small file, likely containing minimal content or low-resolution data."
    else:
        size_context = ""

    return base_description + size_context


def extract_document_content(document_file):
    """
    Extract meaningful information about documents without requiring external libraries.
    Returns comprehensive metadata and descriptive information.
    """
    try:
        file_path = document_file.path
        file_extension = Path(file_path).suffix.lower()
        file_name = os.path.basename(file_path)

        # Get file metadata
        metadata = get_file_metadata(file_path)

        # For text files, we can still extract content safely
        if file_extension == '.txt':
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content_preview = f.read(2000)  # First 2000 chars
                    if len(content_preview) >= 2000:
                        content_preview += "\n\n[Content truncated for preview...]"
                    text_content = content_preview
                    extractable = True
            except Exception:
                text_content = "Text file content could not be read."
                extractable = False
        else:
            # For other file types, provide descriptive information
            text_content = get_document_description(file_extension, file_name, metadata['size'])
            extractable = False

        return {
            'text': text_content,
            'type': file_extension,
            'extractable': extractable,
            'error': None,
            'metadata': metadata,
            'description': get_document_description(file_extension, file_name, metadata['size']),
            'file_info': {
                'name': file_name,
                'size': metadata['size_formatted'],
                'mime_type': metadata['mime_type']
            }
        }

    except Exception as e:
        return {
            'text': f'Error analyzing document: {str(e)}',
            'type': file_extension if 'file_extension' in locals() else 'unknown',
            'extractable': False,
            'error': str(e),
            'metadata': {},
            'description': 'Document analysis failed.',
            'file_info': {
                'name': 'Unknown',
                'size': 'Unknown',
                'mime_type': 'unknown'
            }
        }


def get_document_preview_summary(document):
    """
    Get a comprehensive summary of document information for PDF inclusion.
    Returns detailed metadata and descriptive content suitable for PDF display.
    """
    try:
        content = extract_document_content(document.file)

        summary = {
            'filename': os.path.basename(document.file.name),
            'uploaded': document.uploaded_at.strftime("%Y-%m-%d"),
            'type': content['type'],
            'extractable': content['extractable'],
            'preview_text': content['text'],
            'description': content['description'],
            'file_info': content['file_info'],
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
            'description': 'Document analysis failed.',
            'file_info': {'name': 'Unknown', 'size': 'Unknown', 'mime_type': 'unknown'},
            'has_error': True
        }