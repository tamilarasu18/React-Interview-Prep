interface MemoryHookProps {
  hook: string;
  className?: string;
}

/**
 * The single line that makes an answer stick. Rendered as a distinct amber
 * block so the eye finds it before anything else on the page.
 */
export default function MemoryHook({ hook, className = '' }: MemoryHookProps) {
  return (
    <div
      className={`not-prose flex gap-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4 ${className}`}
    >
      <span className="text-xl leading-none pt-0.5" aria-hidden="true">
        🧠
      </span>
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
          Memory hook
        </div>
        <p className="text-[15px] font-medium text-amber-900 leading-snug">{hook}</p>
      </div>
    </div>
  );
}
