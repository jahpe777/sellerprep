import React, { useState, useEffect, useRef } from "react";
import api from "../axiosConfig";

interface ImagesProps {
  propertyId: number;
  sectionId: number;
}

interface Img {
  id: number;
  filename: string;
  url: string;
}

const Images: React.FC<ImagesProps> = ({ propertyId, sectionId }) => {
  const [images, setImages] = useState<Img[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // load only this section’s images
  useEffect(() => {
    if (!propertyId || !sectionId) return;
    api
      .get<Img[]>("/api/images/", {
        params: { property: propertyId, section: sectionId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Failed to load images", err));
  }, [propertyId, sectionId]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const sel = e.target.files?.[0] ?? null;
    if (sel && /\.heic$/i.test(sel.name)) {
      setFile(null);
      setPreviewUrl(null);
      setError("HEIC not supported; please convert to JPEG/PNG.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setError("");
    setFile(sel);
    setPreviewUrl(sel ? URL.createObjectURL(sel) : null);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("image", file);
    form.append("property", String(propertyId));
    form.append("section", String(sectionId));
    try {
      await api.post("/api/images/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setFile(null);
      setPreviewUrl(null);
      if (inputRef.current) inputRef.current.value = "";
      const res = await api.get<Img[]>("/api/images/", {
        params: { property: propertyId, section: sectionId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setImages(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Upload failed.");
    }
    setUploading(false);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api.delete(`/api/images/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setImages((imgs) => imgs.filter((i) => i.id !== id));
    } catch {
      console.error("Delete failed");
    }
  }

  return (
    <div>
      {previewUrl && (
        <div className="sp-image-preview">
          <img
            src={previewUrl}
            alt="Preview"
            className="sp-image-preview-img"
          />
        </div>
      )}

      <form onSubmit={handleUpload} className="sp-docs-form">
        <div className="sp-image-upload-row">
          <input
            ref={inputRef}
            type="file"
            accept=".heic,.HEIC,image/*"
            onChange={handleFileChange}
            className="sp-tab-button sp-image-input"
          />
          <button
            type="submit"
            className="sp-tab-button sp-image-upload-btn"
            disabled={!file || uploading}
          >
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
        </div>
        {error && <div className="sp-message">{error}</div>}
      </form>

      <ul className="sp-image-list">
        {images.map((img) => (
          <li key={img.id} className="sp-image-item">
            <img src={img.url} alt={img.filename} className="sp-image-thumb" />
            <button
              onClick={() => handleDelete(img.id)}
              title="Delete"
              className="sp-image-delete-btn"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Images;
