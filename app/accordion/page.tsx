import Accordion from "@/src/components/ui/Accordion";
import { AccordionItemData } from "@/src/types/interface";

export const metadata = { title: "Accordion" };

const accordionItems: AccordionItemData[] = [
  {
    id: "1",
    title: "What is a React Accordion Component?",
    content:
      "An accordion is a user interface element that organizes content into collapsible sections. It allows users to show or hide information, making the interface cleaner and more manageable. This component is built with React, TypeScript, and styled with Tailwind CSS for a modern and responsive design.",
  },
  {
    id: "2",
    title: "How does the state management work?",
    content:
      "The Accordion component uses React's `useState` hook to manage which items are open. It can be configured to allow only one item to be open at a time (the default behavior) or multiple items simultaneously by passing the `allowMultiple` prop.",
  },
  {
    id: "3",
    title: "Is this component accessible?",
    content:
      "Yes, accessibility has been considered. The button elements include `aria-expanded` attributes to inform screen readers about the state of the collapsible panel, and `aria-controls` links the button to the content it manages. Focus rings are also enabled for keyboard navigation.",
  },
  {
    id: "4",
    title: "Can I customize the styling?",
    content:
      "Absolutely. Since this component is built with Tailwind CSS, you can easily customize its appearance by modifying the utility classes in the `Accordion.tsx` file. You can change colors, spacing, fonts, and more to match your application's design system.",
  },
];

export default function Page() {
  return (
    <section>
      <div className="min-h-screen bg-background text-foreground font-sans p-4 sm:p-6 md:p-8">
        <header className="text-center mb-12">
          <h1 className="mb-2">
            React Accordion
          </h1>
          <p>
            A demonstration of a stylish and functional accordion component.
          </p>
        </header>

        <main>
          <Accordion items={accordionItems} defaultOpenIds={["1"]} />
        </main>

        <section className="mt-16">
          <header className="text-center mb-12">
            <h2 className="mb-2">
              Multiple Open Items
            </h2>
            <p>
              This example allows expanding more than one section at a time.
            </p>
          </header>
          <Accordion
            items={accordionItems}
            multiple
            defaultOpenIds={["2", "4"]}
          />
        </section>
      </div>
    </section>
  );
}
