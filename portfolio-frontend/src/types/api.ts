/**
 * API Types — mirror the backend Prisma schema exactly.
 * These are the raw shapes returned by the backend, before any UI transformation.
 */

/* ------------------------------------------------------------------ */
/* Enums (match Prisma enums)                                          */
/* ------------------------------------------------------------------ */

export type ProjectStatus = 'LIVE' | 'IN_DEVELOPMENT' | 'ARCHIVED';
export type ProjectCategory = 'FULL_STACK' | 'FRONTEND' | 'BACKEND' | 'ACADEMIC' | 'PERSONAL';
export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'LANGUAGE' | 'TOOL';
export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'FREELANCE';
export type MediaType = 'IMAGE' | 'PDF';

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

export interface ApiMedia {
  id: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  type: MediaType;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export interface Portfolio {
  id: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroDescription: string | null;
  aboutTitle: string | null;
  aboutDescription: string | null;
  resumeId: string | null;
  resume: ApiMedia | null;
  github: string | null;
  linkedin: string | null;
  x: string | null;
  instagram: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  footerText: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  profileImageId: string | null;
  profileImage: ApiMedia | null;
  workspaceImageId: string | null;
  workspaceImage: ApiMedia | null;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ApiProjectTechnology {
  projectId: string;
  technologyId: string;
  technology: ApiTechnology;
}

export interface ApiProjectImage {
  id: string;
  projectId: string;
  mediaId: string;
  displayOrder: number;
  media: ApiMedia;
}

export interface ApiProject {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  shortDescription: string;
  description: string;
  githubUrl: string | null;
  liveUrl: string | null;
  thumbnailId: string | null;
  thumbnail: ApiMedia | null;
  features: string[] | null;
  challenges: string[] | null;
  learnings: string[] | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ApiProjectImage[];
  technologies: ApiProjectTechnology[];
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface ApiSkill {
  id: string;
  name: string;
  category: SkillCategory;
  iconName: string | null;
  proficiency: number | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Technologies                                                        */
/* ------------------------------------------------------------------ */

export interface ApiTechnology {
  id: string;
  name: string;
  iconName: string | null;
}

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export interface ApiEducation {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  location: string | null;
  cgpa: string | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Internships                                                         */
/* ------------------------------------------------------------------ */

export interface ApiInternship {
  id: string;
  company: string;
  position: string;
  employmentType: EmploymentType;
  location: string | null;
  description: string | null;
  companyWebsite: string | null;
  logoId: string | null;
  logo: ApiMedia | null;
  startDate: string | null;
  endDate: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export interface ApiCertification {
  id: string;
  title: string;
  issuer: string;
  credentialId: string | null;
  credentialUrl: string | null;
  verificationUrl: string | null;
  issueDate: string | null;
  certificateImageId: string | null;
  certificateImage: ApiMedia | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export interface ApiAchievement {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  imageId: string | null;
  image: ApiMedia | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ApiContactMessage extends ContactFormData {
  id: string;
  isRead: boolean;
  createdAt: string;
}

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

export interface DashboardStats {
  projects: number;
  skills: number;
  technologies: number;
  education: number;
  internships: number;
  certifications: number;
  achievements: number;
  contactMessages: number;
  unreadMessages: number;
  media: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentProjects: ApiProject[];
  recentMessages: ApiContactMessage[];
  recentMedia: ApiMedia[];
}
