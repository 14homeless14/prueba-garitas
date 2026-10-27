"use client";

import clsx from "clsx";

export interface TabItem {
  label: string;
  active: boolean;
  onSelect: () => void;
}

export function Tabs({ items }: { items: TabItem[] }) {
  return (
    <nav className="flex gap-2" role="tablist">
      {items.map((t) => (
        <button
          key={t.label}
          type="button"
          role="tab"
          aria-selected={t.active}
          onClick={t.onSelect}
          className={clsx(
            "flex-1 rounded-xl px-4 py-3 text-center text-lg font-semibold transition-colors",
            t.active
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          )}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
