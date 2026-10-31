import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IDENTITY } from "../lib/data";
import { useWibClock } from "../lib/hooks";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "ABOUT", href: "#biography" },
  { label: "METHOD", href: "#methodology" },
  { label: "WORKS", href: "#works" },
  { label: "CONNECT", href: "#connect" },
];

export default function Header({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const t = useWibClock();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-paper/85 backdrop-blur-xl dark:border-neutral-800 dark:bg-coal/80">
      <div className="flex h-14 items-stretch">
        {/* ── Left · Identity badge ─────────────────────────────── */}
        <a
          href="#top"
          className="flex items-center gap-2.5 border-r border-neutral-200 px-4 transition-colors duration-300 hover:bg-neutral-900 hover:text-white dark:border-neutral-800 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 sm:px-6 lg:px-10"
          aria-label="Back to top"
        >
          <span className="flex h-5 w-5 items-center justify-center bg-signal font-mono text-[10px] font-bold text-white">
            W
          </span>
          <span className="hidden font-mono text-[10px] font-semibold tracking-[0.14em] min-[420px]:inline">
            RYOU&nbsp;//&nbsp;WANGSIT&nbsp;B.&nbsp;SATRIATAMA
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-[0.14em] min-[420px]:hidden">
            RYOU
          </span>
        </a>

        {/* ── Center · Live WIB clock + coordinates ─────────────── */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-3 border-r border-neutral-200 px-2 dark:border-neutral-800 md:gap-4">
          <div className="flex items-baseline gap-[3px] font-mono tabular-nums">
            <span className="text-[13px] font-bold leading-none text-neutral-900 dark:text-neutral-100 sm:text-sm">
              {t.h}
            </span>
            <span className="animate-pulse text-[13px] font-bold leading-none text-signal sm:text-sm">:</span>
            <span className="text-[13px] font-bold leading-none text-neutral-900 dark:text-neutral-100 sm:text-sm">
              {t.m}
            </span>
            <span className="animate-pulse text-[13px] font-bold leading-none text-signal sm:text-sm">:</span>
            <span className="text-[13px] font-bold leading-none text-neutral-900 dark:text-neutral-100 sm:text-sm">
              {t.s}
            </span>
            <span className="ml-1.5 hidden text-[9px] font-semibold tracking-[0.2em] text-signal min-[400px]:inline">
              WIB
            </span>
          </div>
          <span aria-hidden className="hidden h-3 w-px bg-neutral-300 dark:bg-neutral-700 md:block" />
          <p className="hidden truncate font-mono text-[9px] uppercase leading-tight tracking-[0.18em] text-neutral-500 dark:text-neutral-400 md:block">
            {IDENTITY.location} — {IDENTITY.coordinates}
          </p>
        </div>

        {/* ── Right · theme switch + nav ────────────────────────── */}
        <nav aria-label="Section navigation" className="hidden items-stretch lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative flex items-center border-r border-neutral-200 px-5 font-mono text-[10px] font-semibold tracking-[0.22em] text-neutral-600 transition-colors duration-300 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white"
            >
              {item.label}
              <span
                aria-hidden
                className="absolute inset-x-5 bottom-0 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </a>
          ))}
          <div className="flex items-center px-5">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </nav>

        {/* Mobile: theme + menu */}
        <div className="flex items-center gap-2 px-3 lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────── */}
      {open && (
        <div className="border-t border-neutral-200 bg-paper dark:border-neutral-800 dark:bg-coal lg:hidden">
          <div className="grid grid-cols-1 divide-y divide-neutral-200 dark:divide-neutral-800">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-4 font-sans text-lg font-bold uppercase tracking-tight text-neutral-900 transition-colors hover:bg-neutral-100 hover:text-signal dark:text-neutral-100 dark:hover:bg-neutral-900"
              >
                {item.label}
                <span className="font-mono text-[10px] font-medium tracking-[0.25em] text-signal">
                  0{i + 1}
                </span>
              </a>
            ))}
            <p className="px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
              {IDENTITY.location} — {IDENTITY.coordinates} · WIB
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
