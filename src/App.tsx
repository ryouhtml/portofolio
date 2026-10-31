import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import Header from "./components/Header";
import SideRail from "./components/SideRail";
import Hero from "./components/Hero";
import Biography from "./components/Biography";
import Methodology from "./components/Methodology";
import Works from "./components/Works";
import Connect from "./components/Connect";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("wbs-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  /* Sync <html> class + persist */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("wbs-theme", theme);
  }, [theme]);

  /* Lenis — buttery inertia scrolling */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -60 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return (
    <div className="grain min-h-screen bg-paper font-sans text-neutral-900 antialiased transition-colors duration-500 dark:bg-coal dark:text-neutral-100">
      <SideRail />
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative">
        {/* Structural outer frame — Google Sports-style grid chrome */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-neutral-200 min-[1500px]:left-14 min-[1500px]:block dark:bg-neutral-800"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-neutral-200 min-[1500px]:block dark:bg-neutral-800"
        />

        <Hero />
        <Biography />
        <Methodology />
        <Works />
        <Connect />
      </main>
    </div>
  );
}
