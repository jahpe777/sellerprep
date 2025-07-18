// src/types.ts

/** A document belonging to a section. */
export interface Document {
  id: number;
  title: string;
  url: string;
  [key: string]: any; // for any extra metadata
}

/** An image belonging to a section. */
export interface Image {
  id: number;
  url: string;
  caption?: string;
  [key: string]: any; // for any extra metadata
}

/** A note belonging to a section. */
export interface Note {
  id: number;
  text: string;
  [key: string]: any; // for any extra metadata
}

/** A property in the dashboard. */
export interface Property {
  id: number;
  title?: string; // optional if some responses don’t include it
  address: string;
  description?: string;
  [key: string]: any; // for other optional fields
}

/** A section belonging to a property, with its documents, images, and notes. */
export interface Section {
  id: number;
  property: number; // the Property.id this section belongs to
  title: string;
  created_at: string; // ISO timestamp

  documents: Document[];
  images: Image[];
  notes: Note[];

  [key: string]: any; // for any additional metadata
}
