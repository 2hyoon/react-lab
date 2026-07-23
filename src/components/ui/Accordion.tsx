"use client";

import { useState, memo, useCallback } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { AccordionItemData } from "@/src/types/interface";
import { ChevronDown, ChevronUp } from "lucide-react";

// <button>의 기본 속성(type, disabled, aria-* 등)을 그대로 물려받되,
// 두 개는 Omit으로 걷어내고 우리 방식으로 재정의한다:
//   - onClick   : 내부에서 직접 onClick={() => onToggle(item.id)}로 걸기 때문에
//                 외부에서 덮어쓰지 못하게 제거.
//   - onToggle  : <button>에는 native `toggle` 이벤트 핸들러(onToggle)가 이미 존재한다.
//                 우리가 쓰려는 (id: string) => void와 시그니처가 충돌하므로 제거 후 재정의.
//                 (이전의 () => void는 우연히 호환돼 숨어 있다가, 인자를 명시하면서 드러났다.)
// cf. onClick은 덮어쓰면 토글이 깨지므로 '차단(Omit)'하지만, className은 덧붙이면 유용하므로
//     Omit하지 않고 아래 button에서 '병합(기존 클래스에 이어붙임)'한다.
interface AccordionItemProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "onClick" | "onToggle"
> {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

// memo로 감싸 부모(Accordion) 리렌더 시 props가 그대로면 재렌더를 건너뛴다.
// 단, 부모가 넘기는 onToggle이 매 렌더 안정적(참조 동일)이어야 이 최적화가 실제로 작동한다.
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
            // id 바인딩은 자식에서. host 요소(<button>)의 onClick이라 memo와 무관하므로
            // 여기 인라인 화살표는 최적화에 영향을 주지 않는다.
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
          // 콘텐츠 높이를 모를 때 부드럽게 여닫는 트릭:
          // grid-rows를 1fr↔0fr로 트랜지션하고, 내부 wrapper의 overflow-hidden으로 잘라낸다.
          // (height: auto는 트랜지션이 안 되기 때문)
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

  // useCallback으로 참조를 안정화해 AccordionItem의 memo가 실제로 작동하게 한다.
  // setState updater 형태를 쓰므로 openItemIds는 deps에 필요 없고, 바뀌는 값은 multiple뿐.
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
          // 인라인 화살표(() => handleToggle(item.id)) 대신 안정적인 함수를 그대로 전달 → memo 유지
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default Accordion;
