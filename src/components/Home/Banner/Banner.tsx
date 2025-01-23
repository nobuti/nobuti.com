import styles from "./styles.module.css";

interface BannerProps {
  children: React.ReactNode;
}

export const Banner = (props: BannerProps) => (
  <div className={styles.container}>{props.children}</div>
);
