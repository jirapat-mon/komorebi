"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ background: "#0c0a09", color: "#fafaf9", padding: "2rem", fontFamily: "monospace" }}>
        <h2 style={{ color: "#f87171" }}>Global Error</h2>
        <pre style={{ fontSize: "12px", color: "#a8a29e", background: "#1c1917", padding: "1rem", borderRadius: "8px", overflow: "auto", maxHeight: "60vh", whiteSpace: "pre-wrap" }}>
          {error.message}
          {"\n\n"}
          {error.stack}
        </pre>
        <button
          onClick={reset}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#f59e0b", color: "#0c0a09", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
