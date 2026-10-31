import { ArrowRight, Sparkles } from "lucide-react";
import { METHOD_CELLS, WORKFLOW } from "../lib/data";
import SectionHeader from "./SectionHeader";

export default function Methodology() {
  return (
    <section
      id="methodology"
      aria-label="Core methodology"
      className="border-b border-neutral-200 dark:border-neutral-800"
    >
      <SectionHeader
        index="02 //"
        title="Methodology"
        meta="Core focus — how the work actually gets done"
      />

      {/* ── Manifesto block ─────────────────────────────────────────── */}
      <div className="grid grid-cols-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="col-span-12 p-4 sm:p-6 md:col-span-8 lg:p-10">
          <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-signal">
            <Sparkles size={12} strokeWidth={2} /> FOCUS / 01
          </p>
          <h3 className="select-none font-sans font-extrabold uppercase leading-[0.88] tracking-[-0.045em]">
            <span className="block text-[17vw] text-neutral-900 dark:text-neutral-50 sm:text-[13vw] lg:text-[8.2rem]">
              Vibe
            </span>
            <span className="text-outline block text-[17vw] sm:text-[13vw] lg:text-[8.2rem]">
              Coding
            </span>
          </h3>
        </div>
        <div className="col-span-12 flex flex-col justify-between gap-6 border-t border-neutral-200 p-4 dark:border-neutral-800 sm:p-6 md:col-span-4 md:border-l md:border-t-0 lg:p-10">
          <p className="font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
            DEFINITION
          </p>
          <p className="max-w-xs font-sans text-base font-medium leading-snug text-neutral-700 dark:text-neutral-200 sm:text-lg">
            Prompt-guided AI repository architecture, clean code refactoring,
            system orchestration, and cloud deployment —{" "}
            <span className="text-signal">in that order, every time.</span>
          </p>
          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
            AI writes the first draft.<br />A human signs off the final one.
          </p>
        </div>
      </div>

      {/* ── Four practice cells ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 border-b border-neutral-200 dark:border-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
        {METHOD_CELLS.map((cell, i) => (
          <article
            key={cell.n}
            className={`group relative flex flex-col gap-5 p-4 transition-colors duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-900/60 sm:p-6 lg:p-8 ${
              i > 0 ? "border-t border-neutral-200 dark:border-neutral-800 sm:border-t-0 sm:border-l" : ""
            } ${i === 2 ? "sm:border-l-0 lg:border-l" : ""} ${
              i >= 2 ? "sm:border-t sm:border-neutral-200 sm:dark:border-neutral-800 lg:border-t-0" : ""
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-signal">
                {cell.n}
              </span>
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="text-neutral-300 transition-all duration-300 group-hover:-rotate-45 group-hover:text-signal dark:text-neutral-700"
              />
            </div>
            <h4 className="font-sans text-lg font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
              {cell.title}
            </h4>
            <p className="text-[12.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {cell.body}
            </p>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </article>
        ))}
      </div>

      {/* ── Pipeline strip ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row">
        <p className="flex shrink-0 items-center gap-2 border-b border-neutral-200 px-4 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-500 dark:border-neutral-800 sm:border-b-0 sm:border-r sm:px-6 lg:px-10">
          WORKFLOW PIPELINE
        </p>
        <ol className="flex flex-1 items-stretch overflow-x-auto">
          {WORKFLOW.map((step, i) => (
            <li
              key={step}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap border-r border-neutral-200 px-4 py-3 font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-700 last:border-r-0 dark:border-neutral-800 dark:text-neutral-300 sm:text-[11px]"
            >
              <span className="text-[8px] text-signal">{i + 1}</span>
              {step}
              {i < WORKFLOW.length - 1 && (
                <ArrowRight size={11} strokeWidth={2.5} className="text-neutral-300 dark:text-neutral-700" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
