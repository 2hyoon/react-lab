import Counter from "@/src/components/ui/counter";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center h-screen gap-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans min-h-screen w-full mx-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold">This is a counter page</h1>
      <Counter />
    </section>
  );
}
