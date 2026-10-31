import { useEffect, useRef, useState, type ReactNode } from "react";
import { CircleCheck, ArrowRight, Quote } from "lucide-react";
import { IDENTITY, getAge, getDaysAlive } from "../lib/data";
import { useTweenedNumber } from "../lib/hooks";
import SectionHeader from "./SectionHeader";

function IndexRow({
  label,
  children,
  valueClass = "",
}: {
  label: string;
  children: ReactNode;
  valueClass?: string;
}) {
  return (
    <div className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-neutral-200 py-3 transition-colors duration-300 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900/60 sm:py-3.5">
      <dt className="col-span-4 flex items-center gap-2 pl-4 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 sm:col-span-3 sm:pl-6 lg:pl-10">
        <span aria-hidden className="h-px w-3 bg-signal" />
        {label}
      </dt>
      <dd
        className={`col-span-8 pr-4 font-sans text-[13px] font-semibold leading-snug text-neutral-800 dark:text-neutral-100 sm:col-span-9 sm:pr-6 lg:pr-10 ${valueClass}`}
      >
        {children}
      </dd>
    </div>
  );
}

function DaysAlive({ active }: { active: boolean }) {
  const target = getDaysAlive();
  const { value, setInView } = useTweenedNumber(target, 1.8);
  useEffect(() => {
    if (active) setInView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <p className="font-sans text-6xl font-extrabold leading-none tracking-[-0.04em] tabular-nums text-neutral-900 dark:text-neutral-50 sm:text-7xl xl:text-[5.5rem]">
      {value.toLocaleString("en-US")}
    </p>
  );
}

export default function Biography() {
  const age = getAge();
  const [metricsOn, setMetricsOn] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setMetricsOn(true)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="biography"
      aria-label="Biography and index"
      className="border-b border-neutral-200 dark:border-neutral-800"
    >
      <SectionHeader
        index="01 //"
        title="Biography"
        meta="Personal index — identity, education & trajectory"
      />

      <div className="grid grid-cols-12">
        {/* ── Portrait dossier ───────────────────────────────────────── */}
        <figure className="relative col-span-12 border-b border-neutral-200 dark:border-neutral-800 md:col-span-5 md:border-b-0 md:border-r lg:col-span-4">
          <img
            src={IDENTITY.portraitSrc}
            alt={IDENTITY.portraitAlt}
            className="h-full min-h-[420px] w-full object-cover object-[50%_15%] grayscale contrast-[1.05] md:min-h-[560px]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-signal opacity-[0.06] mix-blend-color" />
          <span aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/80" />
          <span aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/80" />

          <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70">
              FIG.01 — SUBJECT
            </p>
            <p className="mt-1.5 font-sans text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-3xl">
              {IDENTITY.name.split(" ").map((part) => (
                <span key={part} className="block">{part}</span>
              ))}
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/75">
              {IDENTITY.alias} · {IDENTITY.handle}
            </p>
          </figcaption>
        </figure>

        {/* ── Editorial intro cell ───────────────────────────────────── */}
        <div className="col-span-12 flex flex-col justify-between gap-6 border-b border-neutral-200 p-4 dark:border-neutral-800 sm:p-6 md:col-span-7 lg:col-span-8 lg:p-8">
          <Quote size={22} strokeWidth={1.5} className="text-signal" aria-hidden />
          <div>
            <p className="font-sans text-xl font-bold leading-[1.15] tracking-[-0.02em] text-neutral-900 dark:text-neutral-100 sm:text-2xl lg:text-[2rem] xl:text-4xl">
              {IDENTITY.bioIntro(age).replace(
                "production web systems",
                ""
              ).trimEnd()}{" "}
              <span className="text-signal">production web systems</span>
              {" "}— prompting, shipping and iterating from the school workbench to the cloud.
            </p>
            <p className="mt-4 max-w-md font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
              {IDENTITY.bioSubline}
            </p>
          </div>
          <a
            href="#connect"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-900 transition-colors hover:text-signal dark:text-neutral-100"
          >
            Start a conversation
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* ── Index table ───────────────────────────────────────────── */}
        <dl className="col-span-12 border-b border-neutral-200 dark:border-neutral-800 md:col-span-7 lg:col-span-8 md:border-b-0">
          <IndexRow label="Full Name">{IDENTITY.name}</IndexRow>
          <IndexRow label="Alias">
            {IDENTITY.alias}{" "}
            <span className="text-neutral-400 dark:text-neutral-500">· {IDENTITY.handle}</span>
          </IndexRow>
          <IndexRow label="Born">
            {IDENTITY.birthLabel}
            <span className="text-neutral-400 dark:text-neutral-500"> — {IDENTITY.birthPlace}</span>
          </IndexRow>
          <IndexRow label="Education">
            {IDENTITY.education}
            <span className="mt-0.5 block text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
              {IDENTITY.educationDetail}
            </span>
          </IndexRow>
          <IndexRow label="Role">
            {IDENTITY.orgRole}{" "}
            <span className="text-neutral-400 dark:text-neutral-500">@ {IDENTITY.orgShort}</span>
            <span className="mt-0.5 block text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
              {IDENTITY.org}
            </span>
          </IndexRow>
          <IndexRow label="Interests">
            <span className="flex flex-wrap gap-1.5">
              {IDENTITY.interests.map((interest) => (
                <span
                  key={interest}
                  className="border border-neutral-300 px-2 py-[3px] font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
                >
                  {interest}
                </span>
              ))}
            </span>
          </IndexRow>
          <IndexRow label="Vision" valueClass="text-signal">
            {IDENTITY.vision}
          </IndexRow>
        </dl>

        {/* ── Metrics rail ──────────────────────────────────────────── */}
        <div
          ref={metricsRef}
          className="col-span-12 flex flex-col divide-y divide-neutral-200 border-t border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800 md:col-span-5 md:border-t-0 lg:col-span-4 lg:border-l"
        >
          <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
            <p className="font-mono text-[9px] font-semibold uppercase leading-relaxed tracking-[0.25em] text-neutral-500 dark:text-neutral-500">
              Days alive — and counting
            </p>
            <DaysAlive active={metricsOn} />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
              B. {IDENTITY.birthLabel} · {IDENTITY.birthPlace.split(",")[0].toUpperCase()}, ID
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-6 lg:p-8">
            <p className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              <CircleCheck size={12} className="text-emerald-500" /> Status — available
            </p>
            <p className="font-sans text-lg font-bold leading-tight tracking-tight text-neutral-800 dark:text-neutral-100">
              Open to pilot projects, internships & collaborations.
            </p>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="w-fit font-mono text-[10px] font-semibold tracking-[0.06em] text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
            >
              {IDENTITY.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
