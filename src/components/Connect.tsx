import { useState } from "react";
import { Copy, Check, ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { IDENTITY, SOCIALS } from "../lib/data";
import { useWibClock } from "../lib/hooks";
import SectionHeader from "./SectionHeader";

export default function Connect() {
  const [copied, setCopied] = useState(false);
  const t = useWibClock();

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(IDENTITY.email);
      } else {
        // Fallback for locked-down contexts
        const ta = document.createElement("textarea");
        ta.value = IDENTITY.email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="connect" aria-label="Connect" className="relative">
      <SectionHeader
        index="04 //"
        title="Connect"
        meta="Direct channels — email & social matrix"
      />

      {/* ── Email — the big move ────────────────────────────────────── */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <p className="flex items-center gap-2 px-4 pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 sm:px-6 lg:px-10">
          <Mail size={11} /> DIRECT LINE — RESPONSE WITHIN 24H (WIB)
        </p>
        <div className="px-4 pb-6 pt-2 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <a
              href={`mailto:${IDENTITY.email}`}
              className="group w-fit max-w-full"
              aria-label={`Email ${IDENTITY.email}`}
            >
              {IDENTITY.email.split("@").map((part, i) => (
                <span
                  key={i}
                  className="block select-all break-all font-sans text-[8.6vw] font-extrabold leading-[1.02] tracking-[-0.04em] text-neutral-900 transition-colors duration-300 group-hover:text-signal dark:text-neutral-50 sm:text-[6.2vw] lg:text-[4.6vw] xl:text-[4vw]"
                >
                  {i === 0 ? part : `@${part}`}
                </span>
              ))}
            </a>

            <button
              type="button"
              onClick={copyEmail}
              aria-live="polite"
              className="group/copy inline-flex w-fit shrink-0 cursor-pointer items-center gap-3 border border-neutral-900 px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-900 transition-all duration-300 hover:border-signal hover:bg-signal hover:text-white dark:border-neutral-100 dark:text-neutral-100 dark:hover:border-signal dark:hover:bg-signal dark:hover:text-white"
            >
              {copied ? (
                <>
                  COPIED TO CLIPBOARD <Check size={14} strokeWidth={2.5} />
                </>
              ) : (
                <>
                  COPY ADDRESS <Copy size={14} strokeWidth={2} className="transition-transform duration-300 group-hover/copy:-translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Social matrix ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIALS.map(({ label, handle, note, href, Icon }, i) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`group relative flex min-h-[168px] flex-col justify-between gap-6 p-4 transition-colors duration-300 hover:bg-neutral-900 dark:hover:bg-neutral-100 sm:p-6 lg:p-7 ${
              i > 0 ? "border-t border-neutral-200 dark:border-neutral-800 sm:border-t-0 sm:border-l" : ""
            } ${i === 2 ? "sm:border-l-0 lg:border-l" : ""} ${
              i >= 2 ? "sm:border-t" : ""
            } lg:border-t-0`}
          >
            <div className="flex items-start justify-between">
              <Icon
                size={26}
                strokeWidth={1.6}
                className="text-neutral-800 transition-colors duration-300 group-hover:text-white dark:text-neutral-100 dark:group-hover:text-neutral-900"
              />
              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
                className="text-neutral-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
              />
            </div>
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-400 transition-colors duration-300 group-hover:text-white/60 dark:text-neutral-500 dark:group-hover:text-neutral-600">
                {label} — 0{i + 1}
              </p>
              <p className="mt-1.5 font-sans text-xl font-extrabold tracking-[-0.02em] text-neutral-900 transition-colors duration-300 group-hover:text-white dark:text-neutral-50 dark:group-hover:text-neutral-900">
                {handle}
              </p>
              <p className="mt-1 font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-neutral-400 transition-colors duration-300 group-hover:text-white/50 dark:text-neutral-600 dark:group-hover:text-neutral-600">
                {note}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* ── Giant wordmark ──────────────────────────────────────────── */}
      <div
        aria-hidden
        className="select-none overflow-hidden border-t border-neutral-200 dark:border-neutral-800"
      >
        <p className="text-outline whitespace-nowrap px-2 pt-6 text-center font-sans text-[22vw] font-extrabold uppercase leading-[0.78] tracking-[-0.05em] lg:text-[19vw]">
          WANGSIT
        </p>
      </div>

      {/* ── Structural footer ───────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-2 font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500 md:grid-cols-4">
          <p className="border-r border-neutral-200 px-4 py-4 dark:border-neutral-800 sm:px-6 lg:px-10">
            © 2026 WANGSIT BAGUS
            <br />
            SATRIATAMA
          </p>
          <p className="border-r border-neutral-200 px-4 py-4 dark:border-neutral-800 sm:px-6 lg:px-10">
            ALL RIGHTS RESERVED.
            <br />
            BUILT BY HAND & PROMPT
          </p>
          <p className="flex items-start gap-1.5 border-r border-neutral-200 px-4 py-4 dark:border-neutral-800 sm:px-6 lg:px-10">
            <MapPin size={10} className="mt-0.5 shrink-0 text-signal" />
            <span>
              PEKALONGAN, ID
              <br />
              {IDENTITY.coordinates}
            </span>
          </p>
          <div className="flex items-start justify-end gap-1.5 px-4 py-4 sm:px-6 lg:px-10">
            <Clock size={10} className="mt-0.5 shrink-0 text-signal" />
            <p className="tabular-nums">
              {t.full}
              <br />
              {t.h}:{t.m}:{t.s} WIB
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
