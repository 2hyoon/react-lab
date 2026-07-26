"use client";

// import { isPagesAPIRouteMatch } from "next/dist/server/route-matches/pages-api-route-match";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Accordion",
    href: "/accordion",
  },
  {
    name: "Calculator",
    href: "/calculator",
  },
  {
    name: "Counter",
    href: "/counter",
  },
  {
    name: "Github",
    href: "/github",
  },
];

interface NavProps {
  isOpen: boolean;
}

export default function Nav({ isOpen }: NavProps) {
  const pathname = usePathname();

  return (
    <div id="aside" className="fixed w-50 top-0 left-0 h-dvh lg:relative lg:w-auto lg:col-start-1 lg:row-start-1 bg-surface ">
      <div className="absolute inset-0">
        <div className="sticky top-0 bottom-0 left-0 h-full overflow-y-auto pt-14 border-r border-r-border">
          <nav id="main-nav" className={isOpen ? `open pl-5 font-mono` : `pl-5 font-mono`}>
            <ul className="pt-5">
              {links.map((link) => (
                <li key={link.name} className="py-1">
                  <Link
                    href={link.href}
                    // className={clsx(
                    //   "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                    //   { "bg-sky-100 text-blue-600": pathname === link.href }
                    // )}
                    className={
                      pathname === link.href ? "text-success" : "text-muted"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
