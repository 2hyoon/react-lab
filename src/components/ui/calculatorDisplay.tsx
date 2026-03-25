"use client";

import type { HTMLAttributes } from "react";

interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const CalculatorDisplay = ({
  value,
  className = "font-bold text-2xl text-center py-4",
  ...props
}: DisplayProps) => {
  return (
    <div
      {...props}
      role="status"
      aria-live={value === "Error" ? "assertive" : "polite"}
      aria-atomic="true"
      aria-label="Calculator result"
      className={className}
    >
      {value}
    </div>
  );
};

export default CalculatorDisplay;
