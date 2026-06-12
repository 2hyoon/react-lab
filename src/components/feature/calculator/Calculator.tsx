"use client";

import { useReducer } from "react";
import CalculatorButton from "@/src/components/feature/calculator/CalculatorButton";
import CalculatorDisplay from "@/src/components/feature/calculator/CalculatorDisplay";

type Operator = "+" | "-" | "*" | "/";

type State = {
  displayValue: string;
  previousValue: number | null;
  operator: Operator | null;
  waitingForOperand: boolean;
};

type Action =
  | { type: "INPUT_DIGIT"; digit: string }
  | { type: "INPUT_DECIMAL" }
  | { type: "TOGGLE_SIGN" }
  | { type: "INPUT_PERCENT" }
  | { type: "PERFORM_OPERATION"; operator: Operator }
  | { type: "HANDLE_EQUALS" }
  | { type: "CLEAR_ALL" };

const initialState: State = {
  displayValue: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: true,
};

function calculate(a: number, b: number, op: Operator): number {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? NaN : a / b;
    default:  return b;
  }
}

function reducer(state: State, action: Action): State {
  if (state.displayValue === "Error" && action.type !== "CLEAR_ALL") {
    return state;
  }

  switch (action.type) {
    case "CLEAR_ALL":
      return initialState;

    case "INPUT_DIGIT":
      if (state.waitingForOperand) {
        return { ...state, displayValue: action.digit, waitingForOperand: false };
      }
      return {
        ...state,
        displayValue: state.displayValue === "0" ? action.digit : state.displayValue + action.digit,
      };

    case "INPUT_DECIMAL":
      if (state.waitingForOperand) {
        return { ...state, displayValue: "0.", waitingForOperand: false };
      }
      if (state.displayValue.includes(".")) return state;
      return { ...state, displayValue: `${state.displayValue}.` };

    case "TOGGLE_SIGN": {
      const value = parseFloat(state.displayValue);
      if (value === 0 || Number.isNaN(value)) return state;
      return { ...state, displayValue: String(value * -1) };
    }

    case "INPUT_PERCENT": {
      const value = parseFloat(state.displayValue);
      if (Number.isNaN(value)) return state;
      return { ...state, displayValue: String(value / 100) };
    }

    case "PERFORM_OPERATION": {
      const inputValue = parseFloat(state.displayValue);
      if (state.previousValue === null) {
        return { ...state, previousValue: inputValue, operator: action.operator, waitingForOperand: true };
      }
      if (state.operator) {
        const result = calculate(state.previousValue, inputValue, state.operator);
        return {
          ...state,
          displayValue: String(result),
          previousValue: result,
          operator: action.operator,
          waitingForOperand: true,
        };
      }
      return { ...state, operator: action.operator, waitingForOperand: true };
    }

    case "HANDLE_EQUALS": {
      const inputValue = parseFloat(state.displayValue);
      if (!state.operator || state.previousValue === null) return state;
      const result = calculate(state.previousValue, inputValue, state.operator);
      return {
        displayValue: Number.isNaN(result) ? "Error" : String(result),
        previousValue: null,
        operator: null,
        waitingForOperand: true,
      };
    }

    default:
      return state;
  }
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayValue } = state;

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
          onClick={() => dispatch({ type: "CLEAR_ALL" })}
          className="bg-surface-2 text-foreground"
        />
        <CalculatorButton
          label="+/-"
          aria-label="Toggle sign"
          onClick={() => dispatch({ type: "TOGGLE_SIGN" })}
          className="bg-surface-2 text-foreground"
        />
        <CalculatorButton
          label="%"
          aria-label="Percent"
          onClick={() => dispatch({ type: "INPUT_PERCENT" })}
          className="bg-surface-2 text-foreground"
        />
        <CalculatorButton
          label="/"
          aria-label="Divide"
          onClick={() => dispatch({ type: "PERFORM_OPERATION", operator: "/" })}
          className="bg-accent text-white"
        />

        <CalculatorButton
          label="7"
          aria-label="7"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "7" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="8"
          aria-label="8"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "8" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="9"
          aria-label="9"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "9" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="*"
          aria-label="Multiply"
          onClick={() => dispatch({ type: "PERFORM_OPERATION", operator: "*" })}
          className="bg-accent text-white"
        />

        <CalculatorButton
          label="4"
          aria-label="4"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "4" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="5"
          aria-label="5"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "5" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="6"
          aria-label="6"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "6" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="-"
          aria-label="Subtract"
          onClick={() => dispatch({ type: "PERFORM_OPERATION", operator: "-" })}
          className="bg-accent text-white"
        />

        <CalculatorButton
          label="1"
          aria-label="1"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "1" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="2"
          aria-label="2"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "2" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="3"
          aria-label="3"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "3" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="+"
          aria-label="Add"
          onClick={() => dispatch({ type: "PERFORM_OPERATION", operator: "+" })}
          className="bg-accent text-white"
        />

        <CalculatorButton
          label="0"
          aria-label="0"
          onClick={() => dispatch({ type: "INPUT_DIGIT", digit: "0" })}
          className="col-span-2 min-w-0 bg-surface text-foreground"
        />
        <CalculatorButton
          label="."
          aria-label="Decimal point"
          onClick={() => dispatch({ type: "INPUT_DECIMAL" })}
          className="bg-surface text-foreground"
        />
        <CalculatorButton
          label="="
          aria-label="Equals"
          onClick={() => dispatch({ type: "HANDLE_EQUALS" })}
          className="bg-accent text-white"
        />
      </div>
    </div>
  );
};

export default Calculator;
