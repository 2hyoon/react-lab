import Counter from "@/src/components/ui/Counter";

export const metadata = { title: "Counter" };

export default function Page() {
  return (
    <section className="py-10 flex flex-col justify-center items-center gap-4">
      <h1 className="mb-4">Counter</h1>
      <Counter />
    </section>
  );
}
