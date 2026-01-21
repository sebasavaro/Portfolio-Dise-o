
export interface Project {
  id: string;
  title: string;
  category: string;
  concept: string;
  details: string[];
  image: string;
  gallery?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}
