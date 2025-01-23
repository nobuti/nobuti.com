import styles from "./styles.module.css";

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <main className={styles.container}>{children}</main>;
};
