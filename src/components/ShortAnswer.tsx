interface ShortAnswerProps {
  text: string;
  className?: string;
}

/**
 * The answer you actually say out loud in the room. Roughly 15 seconds of
 * speech — long enough to be complete, short enough to recall under pressure.
 */
export default function ShortAnswer({ text, className = '' }: ShortAnswerProps) {
  return (
    <div
      className={`not-prose rounded-lg border-l-4 border-primary-500 bg-primary-50 p-5 ${className}`}
    >
      <div className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-2">
        Say this in the interview
      </div>
      <p className="text-lg text-gray-900 leading-relaxed">{text}</p>
    </div>
  );
}
