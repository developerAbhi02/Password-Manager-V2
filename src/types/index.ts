export interface PasswordEntry {
  id: string;
  _id?: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  category?: string;
  createdAt: number;
  updatedAt: number;
  user?: string;
} 