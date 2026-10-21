import type { PortfolioProject, ProjectCategory } from "@/config/portfolio";

export type ProjectFilter = "All" | ProjectCategory;

export function filterProjects(
  list: readonly PortfolioProject[],
  filter: ProjectFilter,
): PortfolioProject[] {
  return filter === "All" ? [...list] : list.filter((p) => p.category === filter);
}

/** Only categories that actually contain projects, so a filter never yields an empty gallery. */
export function categoriesInUse(
  list: readonly PortfolioProject[],
  all: readonly ProjectCategory[],
): ProjectCategory[] {
  return all.filter((c) => list.some((p) => p.category === c));
}

/** Wrap-around index step used by lightbox previous/next. */
export function stepIndex(current: number, delta: number, length: number): number {
  if (length <= 0) return 0;
  return (((current + delta) % length) + length) % length;
}
