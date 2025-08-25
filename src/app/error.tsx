"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-900 text-white">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-white text-red-900 rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}