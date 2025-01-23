import styles from "./styles.module.css";

interface AboutProps {
  children: React.ReactNode;
}

export const About = ({ children }: AboutProps) => {
  return <div className={styles.container}>{children}</div>;
};
