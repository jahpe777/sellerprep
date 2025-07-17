// src/types.ts

/** A property in the dashboard, with flexible extra fields (documents, notes, images, etc.). */
export interface Property {
  id: number;
  title?: string; // optional if some responses don’t include it
  address: string;
  description?: string;
  [key: string]: any; // for other optional fields like documents, notes, images, etc.
}

/** A section belonging to a property. */
export interface Section {
  id: number;
  property: number; // the Property.id this section belongs to
  title: string;
  created_at: string; // ISO timestamp
  [key: string]: any; // for any additional metadata
}
