import styles from "./styles.module.css";

interface TilesProps {
  children: React.ReactNode;
}

export const Tiles = (props: TilesProps) => (
  <div className={styles.container}>{props.children}</div>
);
