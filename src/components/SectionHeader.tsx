interface SectionHeaderProps {
  index: string;
  title: string;
  meta: string;
}

/** Editorial section index: "01 // ABOUT"-style coordinate header */
export default function SectionHeader({ index, title, meta }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-12 items-end gap-x-4 gap-y-4 border-b border-neutral-200 px-4 pb-5 pt-10 dark:border-neutral-800 sm:px-6 md:pt-14 lg:px-10">
      <div className="col-span-12 flex items-center gap-3 sm:col-span-7 lg:col-span-8">
        <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-signal">
          {index}
        </span>
        <span aria-hidden className="h-px w-8 bg-signal sm:w-14" />
        <h2 className="font-sans text-3xl font-extrabold uppercase leading-none tracking-[-0.03em] text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      <p className="col-span-12 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-neutral-500 dark:text-neutral-500 sm:col-span-5 sm:text-right lg:col-span-4">
        {meta}
      </p>
    </div>
  );
}
