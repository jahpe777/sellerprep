// src/components/PropertyCard.tsx
import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import PropertyTabs from "./PropertyTabs";

interface Property {
  id: number;
  address: string;
  description: string;
}

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="sp-property-card">
      <div className="sp-property-card-header">
        <div className="sp-property-card-icons">
          <PencilSquareIcon
            onClick={() => onEdit(property)}
            className="sp-icon sp-icon-edit"
          />
          <TrashIcon
            onClick={() => onDelete(property.id)}
            className="sp-icon sp-icon-delete"
          />
        </div>
      </div>

      <div className="sp-property-card-details">
        <p>{property.address}</p>
        <p>{property.description}</p>
      </div>

      {/* Render tabs for Documents, Notes, Images */}
      <PropertyTabs
        renderDocuments={() => <p>Document management interface goes here.</p>}
        renderNotes={() => <p>Notes editor goes here.</p>}
        renderImages={() => (
          <div className="sp-image-grid">
            <img src="/example1.jpg" alt="Example 1" />
            <img src="/example2.jpg" alt="Example 2" />
          </div>
        )}
      />
    </div>
  );
};

export default PropertyCard;
