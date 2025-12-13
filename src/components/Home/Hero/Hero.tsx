import styles from "./styles.module.css";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Manu Romero
      </h1>
      <p className={styles.subtitle}>
        Software Engineer · Speaker · Open Source Contributor
      </p>
    </section>
  );
};

