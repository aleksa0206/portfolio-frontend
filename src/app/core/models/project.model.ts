export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  techStack: string;
  order: number;
  createdAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  techStack: string;
  order?: number;
}