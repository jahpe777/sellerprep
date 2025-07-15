export interface Property {
  id: number;
  title: string;
  address: string;
  description: string;
  [key: string]: any; // for other optional fields like documents, notes, etc.
}
