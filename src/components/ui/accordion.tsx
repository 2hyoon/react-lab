"use client";

import React, { useState, memo } from "react";
import { AccordionItemData } from "@/src/types/interface";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}

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
      <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        <h2 id={headingId}>
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-200 ${className ?? ""}`}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={contentId}
            {...buttonProps}
          >
            <span>{item.title}</span>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
        </h2>
        <div
          id={contentId}
          role="region"
          aria-labelledby={headingId}
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-5 text-gray-600 dark:text-gray-400">
              {item.content}
            </div>
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

  const handleToggle = (id: string) => {
    setOpenItemIds((prevIds) => {
      const isCurrentlyOpen = prevIds.includes(id);

      if (multiple) {
        return isCurrentlyOpen
          ? prevIds.filter((itemId) => itemId !== id)
          : [...prevIds, id];
      }

      return isCurrentlyOpen ? [] : [id];
    });
  };

  return (
    <div
      id={id}
      className={`w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className ?? ""}`}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItemIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
