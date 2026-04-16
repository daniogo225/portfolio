/**
 * Project metadata — language-independent (URLs, slugs, status colors).
 * Translated content (title, description, stack labels) lives in i18n.tsx.
 * Order here must match the order of t.projects.items.
 */

export interface ProjectMeta {
  slug: string;
  url?: string;
  statusColor: string;
}

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "contracttchecker",
    url: "https://contracttchecker.laravel.cloud/",
    statusColor: "text-emerald-400",
  },
  {
    slug: "comafrique",
    statusColor: "text-accent-light",
  },
  {
    slug: "school-management",
    statusColor: "text-gold",
  },
  {
    slug: "divine-grace",
    statusColor: "text-accent-light",
  },
];

/**
 * Projects that are live in production — used in the Footer to surface
 * direct links to running products.
 */
export const liveProjects = projectsMeta.filter((p) => p.url);
