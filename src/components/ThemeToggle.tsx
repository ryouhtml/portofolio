import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      className="group relative flex h-9 w-[68px] shrink-0 cursor-pointer items-center border border-neutral-200 bg-white px-1 transition-colors duration-300 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
    >
      <Sun
        size={13}
        strokeWidth={2}
        className="absolute left-[7px] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-600 dark:group-hover:text-neutral-300"
      />
      <Moon
        size={13}
        strokeWidth={2}
        className="absolute right-[7px] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-600 dark:group-hover:text-neutral-300"
      />
      <span
        aria-hidden
        className={`relative z-10 flex h-[26px] w-[26px] items-center justify-center border border-neutral-900 bg-neutral-900 text-[10px] text-white shadow-[2px_2px_0_0_var(--color-signal)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 ${
          dark ? "translate-x-[32px]" : "translate-x-0"
        }`}
      >
        {dark ? <Moon size={12} strokeWidth={2.4} /> : <Sun size={12} strokeWidth={2.4} />}
      </span>
    </button>
  );
}
