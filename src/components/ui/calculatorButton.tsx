"use client";

import type { ButtonHTMLAttributes } from "react";

export interface CalculatorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const baseButtonClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 py-2 text-base font-medium transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

const CalculatorButton = ({
  label,
  className,
  type = "button",
  ...props
}: CalculatorButtonProps) => {
  return (
    <button
      type={type}
      className={[baseButtonClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
