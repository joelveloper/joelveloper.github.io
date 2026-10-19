export interface ProfileLink {
  label: string;
  href: string;
  external: boolean;
}

export const profile = {
  name: 'Joel Cantero',
  monogram: 'JC',
  role: 'Software Developer',
  location: 'Asunción, Paraguay',
  email: 'alfonzojoel@hotmail.com',
  github: 'https://github.com/joelveloper',
  youtube: 'https://www.youtube.com/@joeldeveloper',
  instagram: 'https://www.instagram.com/joel.developer',
  initiative: {
    name: 'Oñondive Software Solutions',
    note: 'Iniciativa e identidad en construcción. No es una entidad legal anunciada.',
  },
} as const;

export const emailHref = `mailto:${profile.email}`;

export const socialLinks: ProfileLink[] = [
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'YouTube', href: profile.youtube, external: true },
  { label: 'Instagram', href: profile.instagram, external: true },
];
