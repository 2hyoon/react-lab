"use client";

import { useState, memo, useCallback } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { AccordionItemData } from "@/src/types/interface";
import { ChevronDown, ChevronUp } from "lucide-react";

// Inherit native <button> attributes, but omit two to redefine them:
//   - onClick:  owned internally (toggle), so block external overrides.
//   - onToggle: collides with <button>'s native `toggle` handler; strip it
//               before redefining as (id: string) => void.
// onClick is blocked (Omit) since overriding it breaks the toggle, whereas
// className is merged (appended below) rather than omitted.
interface AccordionItemProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "onClick" | "onToggle"
> {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

// Skips re-render when props are unchanged — relies on a stable onToggle
// reference from the parent (see useCallback below) to actually kick in.
const AccordionItem = memo(
  ({
    item,
    isOpen,
    onToggle,
    className,
    ...buttonProps
  }: AccordionItemProps) => {
    const contentId = `accordion-content-${item.id}`;
    const headingId = `accordion-header-${item.id}`;

    return (
      <div className="border-b border-border last:border-b-0">
        <h3 id={headingId}>
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium text-left text-foreground hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 ${className ?? ""}`}
            // Bind id here; inline arrow on a host element is fine (unrelated to memo).
            onClick={() => onToggle(item.id)}
            aria-expanded={isOpen}
            aria-controls={contentId}
            {...buttonProps}
          >
            <span>{item.title}</span>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
        </h3>
        <div
          id={contentId}
          role="region"
          aria-labelledby={headingId}
          // Animate open/close without a known height: transition grid-rows
          // 1fr<->0fr and clip via the inner wrapper's overflow-hidden
          // (height: auto can't be transitioned).
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-5 text-muted">{item.content}</div>
          </div>
        </div>
      </div>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

interface AccordionProps {
  items: AccordionItemData[];
  multiple?: boolean;
  defaultOpenIds?: string[];
  id?: string;
  className?: string;
}

const Accordion = ({
  items,
  multiple = false,
  defaultOpenIds = [],
  id,
  className,
}: AccordionProps) => {
  const [openItemIds, setOpenItemIds] = useState<string[]>(defaultOpenIds);

  // Stable reference so AccordionItem's memo holds. Updater form avoids
  // depending on openItemIds; only multiple is a dependency.
  const handleToggle = useCallback(
    (id: string) => {
      setOpenItemIds((prevIds) => {
        const isCurrentlyOpen = prevIds.includes(id);

        if (multiple) {
          return isCurrentlyOpen
            ? prevIds.filter((itemId) => itemId !== id)
            : [...prevIds, id];
        }

        return isCurrentlyOpen ? [] : [id];
      });
    },
    [multiple],
  );

  return (
    <div
      id={id}
      className={`w-full max-w-2xl mx-auto bg-surface rounded-lg border border-border ${className ?? ""}`}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItemIds.includes(item.id)}
          // Pass the stable function directly (not an inline arrow) to keep memo intact.
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default Accordion;
