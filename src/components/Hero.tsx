import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowDownRight } from "lucide-react";
import { IDENTITY, TICKER } from "../lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

function Line({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%", rotate: 1.5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex flex-col overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
    >
      {/* Registration crosses */}
      <span aria-hidden className="pointer-events-none absolute left-3 top-[4.5rem] select-none font-mono text-sm text-neutral-300 dark:text-neutral-700">+</span>
      <span aria-hidden className="pointer-events-none absolute right-3 top-[4.5rem] select-none font-mono text-sm text-neutral-300 dark:text-neutral-700">+</span>

      <div className="flex flex-1 flex-col justify-end px-4 pt-[6.5rem] sm:px-6 md:pt-28 lg:px-10">
        {/* Status + meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 border border-neutral-900 px-2.5 py-1.5 font-mono text-[9px] font-semibold tracking-[0.22em] text-neutral-900 dark:border-neutral-100 dark:text-neutral-100 sm:text-[10px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {IDENTITY.availabilityStatus}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 sm:text-[10px]">
            EST. {IDENTITY.established} — {IDENTITY.educationShort}
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 min-[480px]:inline sm:text-[10px]">
            {IDENTITY.timezone}
          </span>
        </motion.div>

        {/* Display type */}
        <h1 className="select-none font-sans font-extrabold uppercase leading-[0.88] tracking-[-0.045em]">
          <span className="text-[15.5vw] min-[480px]:text-[14.5vw] sm:text-[13vw] lg:text-[10.5vw] xl:text-[9.5vw]">
            <Line delay={0.2}>
              <span className="text-neutral-900 dark:text-neutral-50">Vibe</span>
            </Line>
          </span>
          <span className="text-[15.5vw] min-[480px]:text-[14.5vw] sm:text-[13vw] lg:text-[10.5vw] xl:text-[9.5vw]">
            <Line delay={0.32}>
              <span className="text-outline">Coder</span>
              <span className="text-signal">&nbsp;&amp;</span>
              <span className="text-neutral-900 dark:text-neutral-50">&nbsp;Web</span>
            </Line>
          </span>
          <span className="text-[15.5vw] min-[480px]:text-[14.5vw] sm:text-[13vw] lg:text-[10.5vw] xl:text-[9.5vw]">
            <Line delay={0.44}>
              <span className="text-neutral-900 dark:text-neutral-50">Architect</span>
              <sup className="align-top font-mono text-[0.16em] font-medium tracking-widest text-signal">
                ®
              </sup>
            </Line>
          </span>
        </h1>

        {/* Statement row */}
        <div className="mt-8 grid grid-cols-12 gap-x-4 gap-y-6 border-t border-neutral-200 pt-6 dark:border-neutral-800 sm:mt-10 sm:pt-7">
          <p className="col-span-12 max-w-md font-sans text-[15px] font-medium leading-snug text-neutral-700 dark:text-neutral-300 sm:col-span-6 sm:text-base lg:col-span-5">
            {IDENTITY.statement}
          </p>
          <div className="col-span-12 flex items-end justify-between gap-4 sm:col-span-6 lg:col-span-7 lg:justify-end lg:gap-16">
            <dl className="hidden font-mono text-[9px] uppercase leading-loose tracking-[0.18em] text-neutral-500 dark:text-neutral-500 md:block">
              <div className="flex gap-3"><dt className="text-neutral-400 dark:text-neutral-600">ROLE</dt><dd>{IDENTITY.orgRole} @ {IDENTITY.orgShort}</dd></div>
              <div className="flex gap-3"><dt className="text-neutral-400 dark:text-neutral-600">BASE</dt><dd>{IDENTITY.location}</dd></div>
              <div className="flex gap-3"><dt className="text-neutral-400 dark:text-neutral-600">FOCUS</dt><dd>WEB SYSTEMS / API ECOSYSTEMS</dd></div>
            </dl>
            <a
              href="#works"
              className="group inline-flex shrink-0 items-center gap-3 border border-neutral-900 bg-neutral-900 py-3 pl-5 pr-4 font-mono text-[10px] font-semibold tracking-[0.25em] text-white transition-colors duration-300 hover:bg-signal hover:border-signal dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:border-signal dark:hover:bg-signal dark:hover:text-white"
            >
              VIEW WORKS
              <ArrowRight
                size={14}
                strokeWidth={2.2}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Ticker + scroll cue */}
      <div className="relative mt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex">
          <div className="hidden w-40 shrink-0 items-center gap-2 border-r border-neutral-200 px-4 dark:border-neutral-800 md:flex lg:px-10">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              STACK / INDEX
            </span>
            <ArrowDownRight size={12} className="text-signal" />
          </div>
          <div className="relative flex-1 overflow-hidden py-2.5" aria-hidden>
            <div className="animate-marquee flex w-max whitespace-nowrap">
              {[0, 1].map((copy) => (
                <span
                  key={copy}
                  className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400"
                >
                  {TICKER.map((item) => (
                    <span key={item} className="mx-5">
                      {item} <span className="ml-5 text-signal">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-paper to-transparent dark:from-coal" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent dark:from-coal" />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#biography"
          style={{ opacity: cueOpacity }}
          className="absolute -top-14 right-4 flex h-12 w-12 flex-col items-center justify-center gap-0.5 border border-neutral-200 text-neutral-500 transition-colors hover:border-signal hover:text-signal dark:border-neutral-800 dark:text-neutral-400 sm:right-6 lg:right-10"
          aria-label="Scroll to biography"
        >
          <ArrowDown size={14} strokeWidth={2} className="animate-bounce" />
          <span className="font-mono text-[7px] font-semibold tracking-[0.3em]">SCROLL</span>
        </motion.a>
      </div>
    </section>
  );
}
