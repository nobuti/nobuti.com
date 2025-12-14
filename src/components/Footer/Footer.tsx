import Link from "next/link";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="w-full flex items-center py-xl mt-xl text-xs">
      <nav className="flex flex-1">
        <ul className="flex gap-md list-none">
          <li>
            <Link
              href="/"
              className="text-secondary font-normal text-xs no-underline transition-opacity duration-200 hover:opacity-70 focus:opacity-70"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/thoughts"
              className="text-secondary font-normal text-xs no-underline transition-opacity duration-200 hover:opacity-70 focus:opacity-70"
            >
              Thoughts
            </Link>
          </li>
        </ul>
      </nav>
      <div className="ml-auto text-secondary">©{currentYear} Buti</div>
    </footer>
  );
};
