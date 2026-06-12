import Counter from "@/src/components/ui/Counter";

export default function Page() {
  return (
    <section className="bg-surface py-10 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold mb-8">Counter</h1>  
      <Counter />
    </section>
  );
}
