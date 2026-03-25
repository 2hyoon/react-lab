"use client";

import { useState } from "react";
import CalculatorButton from "@/src/components/ui/calculatorButton";
import CalculatorDisplay from "@/src/components/ui/calculatorDisplay";

type Operator = "+" | "-" | "*" | "/";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  const clearAll = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? digit : prev + digit));
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
      return;
    }

    setDisplayValue((prev) => (prev.includes(".") ? prev : `${prev}.`));
  };

  const toggleSign = () => {
    if (displayValue === "Error") return;
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0 || Number.isNaN(currentValue)) return;
    setDisplayValue(String(currentValue * -1));
  };

  const inputPercent = () => {
    if (displayValue === "Error") return;
    const currentValue = parseFloat(displayValue);
    if (Number.isNaN(currentValue)) return;
    setDisplayValue(String(currentValue / 100));
  };

  const performOperation = (nextOperator: Operator) => {
    if (displayValue === "Error") return;
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      setPreviousValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    op: Operator,
  ) => {
    switch (op) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        if (secondOperand === 0) return NaN;
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (displayValue === "Error") return;
    const inputValue = parseFloat(displayValue);

    if (operator && previousValue !== null) {
      const result = calculate(previousValue, inputValue, operator);
      setDisplayValue(Number.isNaN(result) ? "Error" : String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 pt-8">
      <CalculatorDisplay value={displayValue} />
      <div
        className="grid w-full max-w-lg grid-cols-4 gap-4"
        role="group"
        aria-label="Keypad"
      >
        <CalculatorButton
          label="AC"
          aria-label="Clear all"
          onClick={clearAll}
          className="bg-gray-500 text-white"
        />
        <CalculatorButton
          label="+/-"
          aria-label="Toggle sign"
          onClick={toggleSign}
          className="bg-gray-500 text-white"
        />
        <CalculatorButton
          label="%"
          aria-label="Percent"
          onClick={inputPercent}
          className="bg-gray-500 text-white"
        />
        <CalculatorButton
          label="/"
          aria-label="Divide"
          onClick={() => performOperation("/")}
          className="bg-amber-600 text-white"
        />

        <CalculatorButton
          label="7"
          onClick={() => inputDigit("7")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="8"
          onClick={() => inputDigit("8")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="9"
          onClick={() => inputDigit("9")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="*"
          aria-label="Multiply"
          onClick={() => performOperation("*")}
          className="bg-amber-600 text-white"
        />

        <CalculatorButton
          label="4"
          onClick={() => inputDigit("4")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="5"
          onClick={() => inputDigit("5")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="6"
          onClick={() => inputDigit("6")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="-"
          aria-label="Subtract"
          onClick={() => performOperation("-")}
          className="bg-amber-600 text-white"
        />

        <CalculatorButton
          label="1"
          onClick={() => inputDigit("1")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="2"
          onClick={() => inputDigit("2")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="3"
          onClick={() => inputDigit("3")}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="+"
          aria-label="Add"
          onClick={() => performOperation("+")}
          className="bg-amber-600 text-white"
        />

        <CalculatorButton
          label="0"
          onClick={() => inputDigit("0")}
          className="col-span-2 min-w-0 bg-gray-700 text-white"
        />
        <CalculatorButton
          label="."
          aria-label="Decimal point"
          onClick={inputDecimal}
          className="bg-gray-700 text-white"
        />
        <CalculatorButton
          label="="
          aria-label="Equals"
          onClick={handleEquals}
          className="bg-amber-600 text-white"
        />
      </div>
    </div>
  );
};

export default Calculator;
