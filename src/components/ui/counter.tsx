"use client";

import { useState, useCallback } from "react";
import { Button } from "@/src/components/ui/button";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  // const [history, setHistory] = useState([]);

  const step = 1;

  // const addHistory;

  const handleIncrement = () => {
    const newCount = count + step;
    setCount(newCount);
    // addHistory
  };

  const handleDecrement = () => {
    const newCount = count - step;
    setCount(newCount);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <section>
      <h1>Current Count</h1>
      <p>{count}</p>
      <div>
        <Button
          onClick={handleDecrement}
          variant="secondary"
          className="h-16 w-32 !rounded-2xl !p-0 flex items-center justify-center"
          aria-label="Decrement"
        >
          Decrement
        </Button>
        <Button
          onClick={handleReset}
          variant="danger"
          className="h-16 px-6 !rounded-2xl flex flex-col items-center justify-center gap-1"
          aria-label="Reset"
        >
          Reset
        </Button>
        <Button
          onClick={handleIncrement}
          variant="primary"
          className="h-16 w-32 !rounded-2xl !p-0 flex items-center justify-center"
          aria-label="Increment"
        >
          Increment
        </Button>
      </div>
    </section>
  );
}
