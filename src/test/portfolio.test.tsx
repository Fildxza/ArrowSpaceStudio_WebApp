import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Work } from "@/components/site/Work";
import { projectCategories, projects } from "@/config/portfolio";
import { categoriesInUse, filterProjects, stepIndex } from "@/lib/portfolio";

describe("portfolio data", () => {
  it("marks every unverified item as demonstration content", () => {
    for (const p of projects) {
      if (!p.verified) expect(p.image.alt).toMatch(/demonstration/i);
      expect(p.image.width).toBeGreaterThan(0);
      expect(p.image.srcSet).toContain("w,");
    }
  });

  it("filters by category", () => {
    expect(filterProjects(projects, "All")).toHaveLength(projects.length);
    for (const c of projectCategories) {
      expect(filterProjects(projects, c).every((p) => p.category === c)).toBe(true);
    }
    expect(categoriesInUse([], projectCategories)).toEqual([]);
  });

  it("wraps lightbox navigation", () => {
    expect(stepIndex(0, -1, 4)).toBe(3);
    expect(stepIndex(3, 1, 4)).toBe(0);
    expect(stepIndex(0, 1, 0)).toBe(0);
  });
});

describe("<Work /> gallery", () => {
  afterEach(() => vi.useRealTimers());
  const settle = () => act(() => vi.advanceTimersByTime(300));
  const tiles = () => screen.getAllByRole("button", { name: /^View / });

  it("filters projects and reflects the active filter", () => {
    render(<Work />);
    expect(tiles()).toHaveLength(projects.length);

    const hospitality = screen.getByRole("button", { name: /^Hospitality/ });
    fireEvent.click(hospitality);

    expect(hospitality).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /^All/ })).toHaveAttribute("aria-pressed", "false");
    const expected = projects.filter((p) => p.category === "Hospitality");
    expect(tiles()).toHaveLength(expected.length);
    expect(
      screen.getByText(`Showing ${expected.length} projects in Hospitality.`),
    ).toBeInTheDocument();
  });

  it("opens the lightbox, navigates with the keyboard and closes with Escape, restoring focus", () => {
    vi.useFakeTimers();
    render(<Work />);
    const first = tiles()[0]!;
    first.focus();
    fireEvent.click(first);

    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("open");
    const view = within(dialog);
    expect(view.getByRole("heading", { level: 2 })).toHaveTextContent(projects[0]!.title);
    expect(view.getByText(/not a completed client project/i)).toBeInTheDocument();
    expect(view.getByRole("button", { name: "Close project viewer" })).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(view.getByRole("heading", { level: 2 })).toHaveTextContent(projects[1]!.title);
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(view.getByRole("heading", { level: 2 })).toHaveTextContent(projects.at(-1)!.title);

    // Native dialogs fire "cancel" on Escape.
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    settle();
    expect(dialog).not.toHaveAttribute("open");
    expect(document.activeElement).toBe(first);
  });

  it("closes from the visible close button", () => {
    vi.useFakeTimers();
    render(<Work />);
    fireEvent.click(tiles()[1]!);
    const dialog = document.querySelector("dialog")!;
    fireEvent.click(within(dialog).getByRole("button", { name: "Close project viewer" }));
    settle();
    expect(dialog).not.toHaveAttribute("open");
  });
});
