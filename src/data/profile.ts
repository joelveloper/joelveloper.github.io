export interface ProfileLink {
  label: string;
  href: string;
  external: boolean;
}

export const profile = {
  name: 'Joel Cantero',
  monogram: 'JC',
  role: 'Full Stack .NET Developer',
  location: 'Asunción, Paraguay',
  headline: 'Software para problemas reales. Diseñado para evolucionar.',
  description:
    'Desarrollo soluciones empresariales de extremo a extremo, desde el análisis del problema y el diseño de arquitectura hasta la implementación, seguridad y despliegue. Especializado en C#, .NET y tecnologías web.',
  availability: 'Abierto a oportunidades profesionales y colaboraciones',
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
    note: 'Una iniciativa que estoy construyendo',
  },
} as const;

export const emailHref = `mailto:${profile.email}`;

export const socialLinks: ProfileLink[] = [
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'YouTube', href: profile.youtube, external: true },
  { label: 'Instagram', href: profile.instagram, external: true },
];
