"use client";

export default function RoomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 flex items-center justify-center p-8">
      <div className="max-w-lg space-y-4">
        <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
        <pre className="text-xs text-stone-400 bg-stone-900 p-4 rounded-lg overflow-auto max-h-[50vh] whitespace-pre-wrap">
          {error.message}
          {"\n\n"}
          {error.stack}
        </pre>
        <button
          onClick={reset}
          className="px-4 py-2 bg-amber-500 text-stone-950 rounded-lg font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
