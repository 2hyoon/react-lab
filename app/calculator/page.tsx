import Calculator from "@/src/components/feature/calculator/Calculator";

export default function Page() {
  return (
    <section
      className="flex flex-col items-center p-8"
      aria-labelledby="calculator-title"
    >
      <h1 id="calculator-title">
        Calculator
      </h1>
      <Calculator />
    </section>
  );
}
