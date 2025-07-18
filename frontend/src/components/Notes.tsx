// src/components/Notes.tsx
import React, { useState, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import api from "../axiosConfig";

interface NotesProps {
  propertyId: number;
  sectionId: number;
}

interface Note {
  id: number;
  content: string;
  created_at: string;
}

const Notes: React.FC<NotesProps> = ({ propertyId, sectionId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch notes when propertyId or sectionId changes
  useEffect(() => {
    if (!propertyId || !sectionId) return;
    api
      .get<Note[]>("/api/notes/", {
        params: { property: propertyId, section: sectionId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Failed to load notes", err));
  }, [propertyId, sectionId]);

  // Add a new note
  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = content.trim();
    if (!text) return;
    setError("");
    try {
      await api.post(
        "/api/notes/",
        { property: propertyId, section: sectionId, content: text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setContent("");
      if (textareaRef.current) textareaRef.current.value = "";
      // Refresh list
      const res = await api.get<Note[]>("/api/notes/", {
        params: { property: propertyId, section: sectionId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setNotes(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add note.");
    }
  }

  // Delete a note
  async function handleDelete(id: number) {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/api/notes/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setNotes((ns) => ns.filter((n) => n.id !== id));
    } catch {
      console.error("Failed to delete note");
    }
  }

  // Submit on Ctrl+Enter
  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      // Treat as form submission
      handleAdd(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  }

  return (
    <div>
      <ul className="sp-note-list">
        {notes.map((note) => (
          <li key={note.id} className="sp-note-item">
            <div className="sp-note-content">{note.content}</div>
            <button
              className="sp-note-delete-btn"
              onClick={() => handleDelete(note.id)}
              title="Delete"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="sp-docs-form">
        <textarea
          ref={textareaRef}
          className="sp-property-form-input"
          placeholder="Add a note…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onKeyDown}
          style={{ minHeight: 60, marginBottom: 8 }}
        />
        <button
          type="submit"
          className="sp-property-btn"
          disabled={!content.trim()}
        >
          Add Note
        </button>
        {error && <div className="sp-message">{error}</div>}
      </form>
    </div>
  );
};

export default Notes;
