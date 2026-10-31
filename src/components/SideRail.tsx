import { useEffect, useState } from "react";
import { SOCIALS } from "../lib/data";

const SECTIONS = [
  { id: "top", label: "TOP" },
  { id: "biography", label: "BIO" },
  { id: "methodology", label: "METHOD" },
  { id: "works", label: "WORKS" },
  { id: "connect", label: "CONNECT" },
];

/** Fixed left rail — visible on wide screens only, pure editorial chrome */
export default function SideRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-hidden
      className="fixed left-0 top-0 z-40 hidden h-full w-14 flex-col items-center justify-between border-r border-neutral-200 pb-6 pt-20 dark:border-neutral-800 min-[1500px]:flex"
    >
      {/* Wordmark, vertical */}
      <span
        className="font-mono text-[9px] font-semibold tracking-[0.35em] text-neutral-400 dark:text-neutral-600"
        style={{ writingMode: "vertical-rl" }}
      >
        WBS / PEK—ID
      </span>

      {/* Section progress ticks */}
      <nav className="flex flex-col items-center gap-3">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-2"
              aria-label={`Go to ${s.label}`}
            >
              <span
                className={`font-mono text-[8px] tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "text-signal opacity-100"
                    : "text-neutral-400 opacity-0 group-hover:opacity-100 dark:text-neutral-500"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive ? "w-6 bg-signal" : "w-3 bg-neutral-300 group-hover:bg-neutral-500 dark:bg-neutral-700"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Social icons */}
      <div className="flex flex-col items-center gap-4">
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-neutral-400 transition-colors duration-200 hover:text-signal dark:text-neutral-600"
          >
            <Icon size={14} strokeWidth={1.8} />
          </a>
        ))}
      </div>
    </aside>
  );
}
