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




def get_document_preview_summary(document, request=None):
    """
    Get document summary with preview link for PDF inclusion.
    Creates a clickable link that takes users directly to the document preview.
    """
    try:
        file_path = document.file.path
        file_extension = Path(file_path).suffix.lower()
        file_name = os.path.basename(document.file.name)

        # Get file metadata
        metadata = get_file_metadata(file_path)

        # Create preview link
        if request:
            preview_url = request.build_absolute_uri(f'/api/documents/{document.id}/view/')
        else:
            preview_url = f"https://sellerprep.app/api/documents/{document.id}/view/"

        summary = {
            'filename': file_name,
            'uploaded': document.uploaded_at.strftime("%Y-%m-%d"),
            'type': file_extension,
            'file_size': metadata['size_formatted'],
            'preview_url': preview_url,
            'has_error': False
        }

        return summary

    except Exception as e:
        return {
            'filename': os.path.basename(document.file.name) if hasattr(document, 'file') else 'Unknown',
            'uploaded': document.uploaded_at.strftime("%Y-%m-%d") if hasattr(document, 'uploaded_at') else 'Unknown',
            'type': 'unknown',
            'file_size': 'Unknown',
            'preview_url': '#',
            'has_error': True
        }