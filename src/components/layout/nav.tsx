"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Counter",
    href: "/counter",
  },
  {
    name: "Accordion",
    href: "/accordion",
  },
  {
    name: "Calculator",
    href: "/calculator",
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              // className={clsx(
              //   "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              //   { "bg-sky-100 text-blue-600": pathname === link.href }
              // )}
              className={pathname === link.href ? 'text-blue-600' : 'text-gray-200'}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
