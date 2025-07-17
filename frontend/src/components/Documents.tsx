// src/components/Documents.tsx
import React, { useState, useEffect, useRef } from "react";
import api from "../axiosConfig";

interface DocumentsProps {
  propertyId: number;
  sectionId: number;
}

interface Doc {
  id: number;
  filename: string;
  url: string;
}

const Documents: React.FC<DocumentsProps> = ({ propertyId, sectionId }) => {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!propertyId || !sectionId) return;
    fetchDocuments();
  }, [propertyId, sectionId]);

  async function fetchDocuments() {
    try {
      const res = await api.get<Doc[]>("/api/documents/", {
        params: { property: propertyId, section: sectionId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to load documents", err);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("property", String(propertyId));
    formData.append("section", String(sectionId));

    try {
      await api.post("/api/documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      await fetchDocuments();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Upload failed.");
    }
    setUploading(false);
  }

  async function handleDelete(docId: number) {
    if (!window.confirm("Delete this document?")) return;
    try {
      await api.delete(`/api/documents/${docId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setDocuments((docs) => docs.filter((d) => d.id !== docId));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {documents.map((doc) => {
          const viewUrl = `${window.location.origin}/api/documents/${doc.id}/view/`;
          const googlePreviewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
            viewUrl
          )}&embedded=true`;

          return (
            <li key={doc.id} style={{ marginBottom: 12 }}>
              <span style={{ marginRight: 8 }}>{doc.filename}</span>

              {/* Preview via Google Docs Viewer */}
              <a
                href={googlePreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: 8 }}
              >
                Preview
              </a>

              {/* Direct Download */}
              <a href={doc.url} download style={{ marginRight: 8 }}>
                Download
              </a>

              {/* Delete Action */}
              <button
                className="sp-property-card-action-btn"
                onClick={() => handleDelete(doc.id)}
                title="Delete"
              >
                🗑️
              </button>
            </li>
          );
        })}
        {documents.length === 0 && (
          <li className="sp-properties-empty">No documents yet</li>
        )}
      </ul>

      <form className="sp-docs-form" onSubmit={handleUpload}>
        <input
          ref={inputRef}
          type="file"
          className="sp-property-form-input"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="sp-property-btn"
          disabled={!file || uploading}
        >
          {uploading ? "Uploading…" : "Upload Document"}
        </button>
        {error && <div className="sp-message">{error}</div>}
      </form>
    </div>
  );
};

export default Documents;
