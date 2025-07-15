import React, { useState, useEffect } from "react";
import api from "../axiosConfig";

interface DocumentsComponentProps {
  propertyId: number;
  topicId: number;
}

interface Document {
  id: number;
  file: string;
  uploaded_at: string;
}

const DocumentsComponent: React.FC<DocumentsComponentProps> = ({
  propertyId,
  topicId,
}) => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchDocs = async () => {
    try {
      const res = await api.get("/api/documents/", {
        params: { property: propertyId, topic: topicId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setDocs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (propertyId && topicId) {
      fetchDocs();
    }
  }, [propertyId, topicId]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("property", String(propertyId));
    form.append("topic", String(topicId));

    try {
      await api.post("/api/documents/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setFile(null);
      fetchDocs();
    } catch (err) {
      setError("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) =>
            e.target.files ? setFile(e.target.files[0]) : undefined
          }
        />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
      {error && <div className="sp-message">{error}</div>}

      <ul>
        {docs.map((d) => (
          <li key={d.id}>
            <a href={d.file} target="_blank" rel="noopener noreferrer">
              {d.file.split("/").pop()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsComponent;
