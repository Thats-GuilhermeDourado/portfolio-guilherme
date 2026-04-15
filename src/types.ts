export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  videoUrl: string;
  posterUrl: string;
  caseLink: string;
}

export interface TechStackItem {
  category: string;
  items: string[];
  description: string;
  gridSpan?: string;
}
