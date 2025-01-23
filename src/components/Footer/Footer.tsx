import Link from "next/link";
import styles from "./styles.module.css";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={styles.container}>
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
          <li>
            <Link href="/about" className={styles.link}>
              About me
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.copy}>©{currentYear} Buti</div>
    </footer>
  );
};
