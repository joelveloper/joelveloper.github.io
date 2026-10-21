import type { NavItem } from '@/components/layout/SiteHeader.astro';
import { emailHref, socialLinks, type ProfileLink } from '@/data/profile';

/*
 * Navegación principal limitada a cuatro accesos (ADR-002). Las secciones
 * «Especialidades» (#especialidades) y «Cómo trabajo» (#proceso) siguen en la
 * página con sus anclas, pero no aparecen en el header ni en el menú móvil.
 */
export const mainNavigation: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

export const detailNavigation: NavItem[] = mainNavigation.map((item) => ({
  ...item,
  href: item.href.startsWith('#') ? `/${item.href}` : item.href,
}));

export const contactLinks: ProfileLink[] = [
  { label: 'Correo', href: emailHref, external: false, icon: 'mail' },
  ...socialLinks,
];
