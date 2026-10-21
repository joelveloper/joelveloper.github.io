import type { ImageMetadata } from 'astro';
import type { IconName } from '@/components/ui/Icon.astro';

export interface ProfileLink {
  label: string;
  href: string;
  external: boolean;
  icon?: IconName;
}

export interface ProfilePortrait {
  src: ImageMetadata;
  alt: string;
}

/*
 * Textos del Hero aprobados por el propietario (docs/01-PRD.md §2.5).
 * No se reescriben: cualquier problema de longitud se resuelve con diseño.
 */
export const profile = {
  name: 'Joel Cantero',
  monogram: 'JC',
  role: 'Full Stack .NET Developer',
  location: 'Asunción, Paraguay',
  greeting: 'Hola, soy Joel Cantero.',
  intro:
    'Construyo aplicaciones web y sistemas de gestión con C# y .NET. Me apasiona resolver problemas reales mediante código bien estructurado, desde la arquitectura hasta el despliegue.',
  summary: 'Desarrollador de software en Asunción, Paraguay.',
  availability: 'Abierto a oportunidades profesionales y proyectos a tiempo parcial.',
  email: 'alfonzojoel@hotmail.com',
  github: 'https://github.com/joelveloper',
  youtube: 'https://www.youtube.com/@joeldeveloper',
  instagram: 'https://www.instagram.com/joel.developer',
  continuingEducation: {
    title: 'Diplomado en Ingeniería de Software Aplicada',
    status: 'En curso',
  },
  initiative: {
    name: 'Oñondive',
    note: 'Iniciativa personal',
    description:
      'Oñondive es una iniciativa personal que estoy desarrollando para dar forma a nuevas ideas y proyectos de software en Paraguay.',
  },
} as const;

/*
 * Fotografía del Hero. Mientras sea `undefined`, el Hero muestra el monograma
 * provisional. Para usar la fotografía definitiva (aportada y autorizada por
 * el propietario, sin EXIF), guardarla en `src/assets/` e importarla aquí:
 *
 *   import portraitImage from '@/assets/profile/joel-cantero.jpg';
 *   export const portrait = { src: portraitImage, alt: 'Fotografía de Joel Cantero' };
 */
export const portrait: ProfilePortrait | undefined = undefined;

export const emailHref = `mailto:${profile.email}`;

export const socialLinks: ProfileLink[] = [
  { label: 'GitHub', href: profile.github, external: true, icon: 'github' },
  { label: 'YouTube', href: profile.youtube, external: true, icon: 'youtube' },
  { label: 'Instagram', href: profile.instagram, external: true, icon: 'instagram' },
];
