import type { NavItem } from '@/components/layout/SiteHeader.astro';
import { emailHref, socialLinks, type ProfileLink } from '@/data/profile';

export const mainNavigation: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Tipografía', href: '#tipografia' },
  { label: 'Superficies', href: '#superficies' },
  { label: 'Componentes', href: '#componentes' },
  { label: 'Contacto', href: '#contacto' },
];

export const contactLinks: ProfileLink[] = [
  { label: 'Correo', href: emailHref, external: false },
  ...socialLinks,
];
