"use client";

import type { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ref,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 focus:ring-primary",
    secondary:
      "bg-surface hover:bg-surface-hover text-foreground focus:ring-muted",
    danger:
      "bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 focus:ring-danger",
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
