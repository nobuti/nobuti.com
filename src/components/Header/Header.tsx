import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full flex items-center py-lg border-b border-border">
      <nav className="flex flex-1">
        <ul className="flex gap-md list-none">
          <li>
            <Link 
              href="/" 
              className="text-foreground font-normal text-sm no-underline transition-colors duration-200 hover:text-accent hover:no-underline focus:text-accent focus:no-underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/thoughts" 
              className="text-foreground font-normal text-sm no-underline transition-colors duration-200 hover:text-accent hover:no-underline focus:text-accent focus:no-underline"
            >
              Thoughts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
