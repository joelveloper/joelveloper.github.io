import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;
export type ProjectCategory = ProjectEntry['data']['category'];
export type ProjectStatus = ProjectEntry['data']['status'];

export interface ApprovedProjectCard {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  image?: {
    src: string;
    alt: string;
  };
}

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.featuredOrder - b.data.featuredOrder);
}

export async function getPublicProjects(): Promise<ProjectEntry[]> {
  return (await getProjects()).filter((project) => project.data.publicApproved);
}

export async function getApprovedProjectCards(): Promise<ApprovedProjectCard[]> {
  const projects = await getProjects();

  return projects
    .filter((project) => project.data.cardApproved)
    .sort((a, b) => a.data.featuredOrder - b.data.featuredOrder)
    .map((project) => ({
      id: project.id,
      title: project.data.cardTitle,
      summary: project.data.summary,
      category: project.data.category,
      status: project.data.status,
      technologies: project.data.technologies,
      image:
        project.data.image?.usageApproved === true
          ? { src: project.data.image.src, alt: project.data.image.alt }
          : undefined,
    }));
}
