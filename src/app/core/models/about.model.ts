export interface About {
  id: number;
  fullName: string;
  title: string;
  bio: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  updatedAt: string;
}

export interface AboutInput {
  fullName: string;
  title: string;
  bio: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
}