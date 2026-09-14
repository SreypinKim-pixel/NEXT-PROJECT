"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-10">
      <p role="alert">Unable to load products.</p>
      <button type="button" onClick={reset} className="mt-4 rounded-lg bg-foreground px-4 py-2 text-background">Try again</button>
    </div>
  );
}
