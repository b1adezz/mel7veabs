export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  videoUrl: string;
  thumbnail?: string;
  uploadedAt: string;
}

export interface VideoIdea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}
