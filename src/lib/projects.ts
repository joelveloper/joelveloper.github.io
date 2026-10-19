import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.featuredOrder - b.data.featuredOrder);
}

export async function getPublicProjects(): Promise<ProjectEntry[]> {
  return (await getProjects()).filter((project) => project.data.publicApproved);
}
