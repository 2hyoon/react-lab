interface calculatorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  // onClick: () => void;
}

const CalculatorButton = ({ label, onClick }: calculatorButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};

export default CalculatorButton;
