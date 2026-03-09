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
      // length > 0
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const toggleSign = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    setDisplayValue(String(currentValue * -1));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue(String(currentValue / 100));
  };

  const performOperation = (nextOperator: Operator) => {
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
    op: Operator
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
    const inputValue = parseFloat(displayValue);

    if (operator && previousValue !== null) {
      const result = calculate(previousValue, inputValue, operator);
      // FIX: Use isNaN() to check for NaN, as `result === NaN` is always false.
      setDisplayValue(String(isNaN(result) ? "Error" : result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div>
      <CalculatorDisplay value={displayValue} />
      <div>
        <CalculatorButton label="AC" onClick={clearAll} />
        <CalculatorButton label="+/-" onClick={toggleSign} />
        <CalculatorButton label="%" onClick={inputPercent} />
        <CalculatorButton label="/" onClick={() => performOperation("/")} />

        <CalculatorButton label="7" onClick={() => inputDigit("7")} />
        <CalculatorButton label="8" onClick={() => inputDigit("8")} />
        <CalculatorButton label="9" onClick={() => inputDigit("9")} />
        <CalculatorButton label="*" onClick={() => performOperation("*")} />

        <CalculatorButton label="4" onClick={() => inputDigit("4")} />
        <CalculatorButton label="5" onClick={() => inputDigit("5")} />
        <CalculatorButton label="6" onClick={() => inputDigit("6")} />
        <CalculatorButton label="-" onClick={() => performOperation("-")} />

        <CalculatorButton label="1" onClick={() => inputDigit("1")} />
        <CalculatorButton label="2" onClick={() => inputDigit("2")} />
        <CalculatorButton label="3" onClick={() => inputDigit("3")} />
        <CalculatorButton label="+" onClick={() => performOperation("+")} />

        <CalculatorButton label="0" onClick={() => inputDigit("0")} />
        <CalculatorButton label="." onClick={inputDecimal} />
        <CalculatorButton label="=" onClick={handleEquals} />
      </div>
    </div>
  );
};

export default Calculator;
