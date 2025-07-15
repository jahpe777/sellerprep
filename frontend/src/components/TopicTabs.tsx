import React, { useState } from "react";

export interface Topic {
  id: number;
  property: number;
  name: string;
}

interface TopicTabsProps {
  propertyId: number;
  topics: Topic[];
  activeTopicId: number | null;
  onSelectTopic: (topicId: number) => void;
  onAddTopic: (name: string) => void;
}

const TopicTabs: React.FC<TopicTabsProps> = ({
  propertyId,
  topics,
  activeTopicId,
  onSelectTopic,
  onAddTopic,
}) => {
  const [newName, setNewName] = useState("");

  return (
    <div>
      <div className="sp-tabs">
        {topics.map((t) => (
          <button
            key={t.id}
            className={`sp-tab ${activeTopicId === t.id ? "active" : ""}`}
            onClick={() => onSelectTopic(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="New tab name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="sp-property-form-input"
          style={{ width: "200px", marginRight: 8 }}
        />
        <button
          className="sp-property-btn"
          onClick={() => {
            if (newName.trim()) {
              onAddTopic(newName.trim());
              setNewName("");
            }
          }}
        >
          + Add Tab
        </button>
      </div>
    </div>
  );
};

export default TopicTabs;
