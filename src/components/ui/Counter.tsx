"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/Button";

export default function Counter() {
  const [count, setCount] = useState(0);

  const step = 1;

  const handleIncrement = () => {
    setCount((prev) => prev + step);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - step);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h2 className="text-xl text-muted" id="counter-label">
        Current Count
      </h2>
      <p
        className="text-2xl font-bold"
        aria-live="polite"
        aria-atomic="true"
        aria-labelledby="counter-label"
      >
        {count}
      </p>
      <div
        className="flex gap-4 flex-col lg:flex-row justify-center items-center pt-6"
        role="group"
        aria-label="Counter actions"
      >
        <Button
          onClick={handleDecrement}
          variant="secondary"
          className="h-14 px-6"
          aria-label="Decrement count"
        >
          Decrement
        </Button>
        <Button
          onClick={handleReset}
          variant="danger"
          className="h-14 px-6"
          aria-label="Reset counter to zero"
        >
          Reset
        </Button>
        <Button
          onClick={handleIncrement}
          variant="primary"
          className="h-14 px-6"
          aria-label="Increment count"
        >
          Increment
        </Button>
      </div>
    </div>
  );
}
