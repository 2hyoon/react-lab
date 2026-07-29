"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/src/components/ui/Button";

const ErrorFallback = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <section className="py-10 flex flex-col justify-center items-center gap-4">
      <header className="text-center mb-4">
        <h1 className="mb-2">Something went wrong</h1>
        <p className="text-danger">{error.message}</p>
        {error.digest && (
          <p className="text-muted mt-2">Error ID: {error.digest}</p>
        )}
      </header>
      <Button onClick={handleRetry}>Reload profile</Button>
      <Link href="/github" className="text-primary hover:text-primary-hover">
        Back to search
      </Link>
    </section>
  );
};

export default ErrorFallback;
