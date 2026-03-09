"use client";

import React, { useState } from "react";
import { AccordionItemData } from "@/src/types/interface"; 
// import { ChevronDownIcon } from './icons';

// interface AccordionItemProps extends React.PropsWithChildren {
// interface AccordionItemProps extends React.HTMLAttributes<HTMLElement> {
interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onClick: () => void;
}

// Define AccordionItem outside the main Accordion component to prevent re-creation on every render.
const AccordionItem = ({ item, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-200"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${item.id}`}
        >
          <span>{item.title}</span>
          {/* <ChevronDownIcon
            className={`w-6 h-6 shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          /> */}
        </button>
      </h2>
      <div
        id={`accordion-content-${item.id}`}
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
};

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string | string[];
}

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpenId,
}: AccordionProps) => {
  const [openItemIds, setOpenItemIds] = useState<string[]>(() => {
    if (!defaultOpenId) return [];
    return Array.isArray(defaultOpenId) ? defaultOpenId : [defaultOpenId];
  });

  const handleToggle = (id: string) => {
    setOpenItemIds((prevIds) => {
      const isCurrentlyOpen = prevIds.includes(id);
      if (allowMultiple) {
        return isCurrentlyOpen
          ? prevIds.filter((itemId) => itemId !== id)
          : [...prevIds, id];
      } else {
        return isCurrentlyOpen ? [] : [id];
      }
    });
  };

  return (
    <div
      id="accordion-wrapper"
      className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItemIds.includes(item.id)}
          onClick={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
