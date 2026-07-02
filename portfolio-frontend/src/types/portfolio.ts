export interface Project {
  id: string;
  title: string;

  category:
    | "Full Stack"
    | "Frontend"
    | "Backend"
    | "Academic"
    | "Personal";

  featured: boolean;

  shortDescription: string;
  description: string;

  image?: string;
  gallery?: string[];

  status: "Live" | "In Development" | "Archived";

  technologies: string[];

  features: string[];
  challenges: string[];
  learnings: string[];

  githubUrl?: string;
  liveUrl?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  coursework?: string[];
  description?: string;
}

export interface InternshipEntry {
  id: string;
  company: string;
  position: string;
  duration?: string;
  location?: string;
  responsibilities: string[];
  logo?: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  status?: string;
  icon?: 'cloud' | 'security' | 'architecture' | 'default';
  image?: string;
  credentialUrl?: string;
  issueDate?: string;
}