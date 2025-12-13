import styles from "./styles.module.css";

export const AboutSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <p>
          I&apos;m a software engineer with a passion for building elegant, performant web applications. 
          I specialize in React, TypeScript, and modern frontend architectures.
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll find me speaking at conferences, contributing to open source projects, 
          or writing about software development practices.
        </p>
      </div>
    </section>
  );
};

