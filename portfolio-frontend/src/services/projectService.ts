import type { Project } from '../types/portfolio';
import { projects } from '../data/projects';

export async function getProjects(): Promise<Project[]> {
  return Promise.resolve(projects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return Promise.resolve(projects.filter((project) => project.featured));
}

export async function getProject(id: string): Promise<Project | undefined> {
  return Promise.resolve(projects.find((project) => project.id === id));
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  if (category === 'All') {
    return Promise.resolve(projects);
  }

  return Promise.resolve(projects.filter((project) => project.category === category));
}
