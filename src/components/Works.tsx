import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  X,
  Terminal,
  Github,
} from "lucide-react";
import { PROJECTS, IDENTITY, type ProjectStatus } from "../lib/data";
import SectionHeader from "./SectionHeader";

const STATUS_STYLE: Record<ProjectStatus, string> = {
  LIVE: "text-emerald-600 dark:text-emerald-400 border-emerald-600/40 dark:border-emerald-400/30",
  "IN PRODUCTION": "text-amber-600 dark:text-amber-400 border-amber-600/40 dark:border-amber-400/30",
  CONCEPT: "text-sky-600 dark:text-sky-400 border-sky-600/40 dark:border-sky-400/30",
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  LIVE: "bg-emerald-500",
  "IN PRODUCTION": "bg-amber-500",
  CONCEPT: "bg-sky-500",
};

export default function Works() {
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0].id);

  // Escape closes the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="works"
      aria-label="Selected works"
      className="border-b border-neutral-200 dark:border-neutral-800"
    >
      <SectionHeader
        index="03 //"
        title="Selected Works"
        meta={`Repository index — ${String(PROJECTS.length).padStart(2, "0")} builds · tap a row to expand`}
      />

      {/* Column labels — technical index chrome */}
      <div
        aria-hidden
        className="hidden grid-cols-12 gap-x-4 border-b border-neutral-200 px-4 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:border-neutral-800 dark:text-neutral-600 md:grid lg:px-10"
      >
        <span className="col-span-1">IDX</span>
        <span className="col-span-4">PROJECT / NAME</span>
        <span className="col-span-3">CATEGORY</span>
        <span className="col-span-2">STATUS</span>
        <span className="col-span-1">YEAR</span>
        <span className="col-span-1 text-right">SPEC</span>
      </div>

      <div>
        {PROJECTS.map((p) => {
          const open = openId === p.id;
          return (
            <article
              key={p.id}
              className="border-b border-neutral-200 last:border-b-0 dark:border-neutral-800"
            >
              {/* ── Index row (button) ──────────────────────────────── */}
              <button
                type="button"
                onClick={() => setOpenId(open ? null : p.id)}
                aria-expanded={open}
                aria-controls={`panel-${p.id}`}
                className={`group grid w-full cursor-pointer grid-cols-12 items-center gap-x-4 gap-y-2 px-4 py-4 text-left transition-colors duration-300 sm:py-5 lg:px-10 ${
                  open
                    ? "bg-neutral-100 dark:bg-neutral-900/70"
                    : "hover:bg-neutral-100/70 dark:hover:bg-neutral-900/40"
                }`}
              >
                {/* IDX */}
                <span className="col-span-2 font-mono text-[10px] font-bold tracking-[0.25em] text-signal md:col-span-1">
                  /{p.index}
                </span>

                {/* Name */}
                <span className="col-span-9 md:col-span-4">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span
                      className={`font-sans text-xl font-extrabold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 sm:text-2xl lg:text-3xl ${
                        open ? "text-signal" : "text-neutral-900 group-hover:text-signal dark:text-neutral-50"
                      }`}
                    >
                      {p.name}
                    </span>
                    {p.aka && (
                      <span className="font-mono text-[8px] font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 sm:text-[9px]">
                        {p.aka}
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 line-clamp-1 block text-[11px] font-medium text-neutral-500 dark:text-neutral-400 md:hidden lg:block">
                    {p.desc}
                  </span>
                </span>

                {/* Category */}
                <span className="col-span-6 hidden font-mono text-[9px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-neutral-500 dark:text-neutral-400 md:col-span-3 md:block">
                  {p.category}
                </span>

                {/* Status */}
                <span className="col-span-4 hidden md:col-span-2 md:block">
                  <span
                    className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[8px] font-bold tracking-[0.2em] ${STATUS_STYLE[p.status]}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                    {p.status}
                  </span>
                </span>

                {/* Year */}
                <span className="col-span-1 hidden font-mono text-[10px] font-semibold tabular-nums text-neutral-500 md:block">
                  {p.year}
                </span>

                {/* Toggle */}
                <span className="col-span-1 flex justify-end">
                  <span
                    className={`flex h-8 w-8 items-center justify-center border transition-all duration-300 ${
                      open
                        ? "rotate-180 border-signal text-signal"
                        : "border-neutral-300 text-neutral-500 group-hover:border-neutral-500 group-hover:text-neutral-800 dark:border-neutral-700 dark:group-hover:border-neutral-500 dark:group-hover:text-neutral-200"
                    }`}
                  >
                    <ChevronDown size={14} strokeWidth={2} />
                  </span>
                </span>
              </button>

              {/* ── Expandable spec drawer ───────────────────────────── */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    id={`panel-${p.id}`}
                    role="region"
                    aria-label={`${p.name} specification`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-neutral-100 dark:bg-neutral-900/70"
                  >
                    <div className="grid grid-cols-12 gap-x-4 gap-y-6 border-t border-neutral-200 p-4 dark:border-neutral-800 sm:p-6 lg:px-10 lg:py-8">
                      {/* Left — objective */}
                      <div className="col-span-12 md:col-span-6 lg:col-span-5">
                        <p className="mb-3 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
                          <Terminal size={11} /> OBJECTIVE
                        </p>
                        <p className="max-w-md text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                          {p.objective}
                        </p>
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group/cta mt-5 inline-flex items-center gap-2.5 border border-neutral-900 bg-neutral-900 px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-signal hover:bg-signal dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:border-signal dark:hover:bg-signal dark:hover:text-white"
                          >
                            <Github size={12} strokeWidth={2} />
                            {p.linkLabel}
                            <ArrowUpRight
                              size={13}
                              strokeWidth={2.2}
                              className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                            />
                          </a>
                        ) : (
                          <span className="mt-5 inline-flex items-center gap-2.5 border border-neutral-300 px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 dark:border-neutral-700 dark:text-neutral-600">
                            REPO NOT LINKED YET
                          </span>
                        )}
                        {!p.repoLinked && p.link && (
                          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
                            Links to GitHub profile · direct repo not yet public
                          </p>
                        )}
                      </div>

                      {/* Right — stack manifest */}
                      <div className="col-span-12 md:col-span-6 lg:col-span-7 lg:border-l lg:border-neutral-200 lg:pl-8 dark:lg:border-neutral-800">
                        <p className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
                          STACK MANIFEST
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {p.stack.map((tech) => (
                            <li
                              key={tech}
                              className="border border-neutral-300 bg-paper px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-700 dark:border-neutral-700 dark:bg-coal dark:text-neutral-200"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                        <dl className="mt-6 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 sm:grid-cols-3">
                          {[
                            ["YEAR", p.year],
                            ["STATUS", p.status],
                            ["TYPE", p.category.split(" ")[0]],
                          ].map(([k, v]) => (
                            <div
                              key={k}
                              className="flex flex-col gap-1 bg-paper p-3 dark:bg-coal"
                            >
                              <dt className="font-mono text-[8px] font-semibold uppercase tracking-[0.28em] text-neutral-400 dark:text-neutral-600">
                                {k}
                              </dt>
                              <dd className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-neutral-800 dark:text-neutral-100">
                                {v}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <button
                          type="button"
                          onClick={() => setOpenId(null)}
                          className="mt-5 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-400 transition-colors hover:text-signal"
                        >
                          <X size={11} /> CLOSE SPEC
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      {/* Index footer note */}
      <p className="flex items-center justify-between gap-4 border-t border-neutral-200 px-4 py-3 font-mono text-[8px] font-semibold uppercase tracking-[0.28em] text-neutral-400 dark:border-neutral-800 dark:text-neutral-600 sm:px-6 lg:px-10">
        <span>INDEX {String(PROJECTS.length).padStart(2, "0")}/{String(PROJECTS.length).padStart(2, "0")} — END OF WORKS</span>
        <a
          href={`${IDENTITY.handle.replace("@", "https://github.com/")}?tab=repositories`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-signal"
        >
          FULL REPOSITORY LOG <ExternalLink size={10} />
        </a>
      </p>
    </section>
  );
}
