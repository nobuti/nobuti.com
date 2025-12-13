import Link from "next/link";
import styles from "./styles.module.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/thoughts" className={styles.link}>
              Thoughts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
