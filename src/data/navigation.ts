import type { NavItem } from '@/components/layout/SiteHeader.astro';
import { emailHref, socialLinks, type ProfileLink } from '@/data/profile';

export const mainNavigation: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Cómo trabajo', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

export const detailNavigation: NavItem[] = mainNavigation.map((item) => ({
  ...item,
  href: item.href.startsWith('#') ? `/${item.href}` : item.href,
}));

export const contactLinks: ProfileLink[] = [
  { label: 'Correo', href: emailHref, external: false },
  ...socialLinks,
];
