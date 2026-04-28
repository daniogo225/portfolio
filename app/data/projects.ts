/**
 * Project metadata — language-independent (URLs, slugs).
 * Translated content (title, description, stack, status) lives in i18n.tsx.
 * Order here must match the order of t.work.items.
 */

export interface ProjectMeta {
  slug: string;
  url?: string;
}

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "contracttchecker",
    url: "https://contracttchecker.laravel.cloud/",
  },
  {
    slug: "comafrique",
  },
  {
    slug: "divine-grace",
  },
];

export const liveProjects = projectsMeta.filter((p) => p.url);
