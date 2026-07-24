"use client";

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  return (
    <div
      role="status"
      aria-live={value === "Error" ? "assertive" : "polite"}
      aria-atomic="true"
      aria-label="Calculator result"
      className="font-bold text-2xl text-center py-4"
    >
      {value}
    </div>
  );
};

export default CalculatorDisplay;
