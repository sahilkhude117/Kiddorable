// app/error.tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
      <div>
        <h1>An error occurred</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    );
  }