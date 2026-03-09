"use client";

// import { useRef } from "react";

interface DisplayProps extends React.HTMLAttributes<HTMLElement> {
  value: string;
}

const CalculatorDisplay = ({ value }: DisplayProps) => {
  // const [scale, setScale] = useState(1);
  // const displayRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* <div ref={displayRef}>{value}</div> */}
      <div>{value}</div>
    </div>
  );
};

export default CalculatorDisplay;
