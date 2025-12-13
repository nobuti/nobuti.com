import styles from "./styles.module.css";

const projects = [
  {
    name: "Project Alpha",
    description: "A modern web application built with Next.js and TypeScript",
    url: "https://github.com/nobuti",
  },
  {
    name: "Project Beta",
    description: "Open source library for React component patterns",
    url: "https://github.com/nobuti",
  },
  {
    name: "Project Gamma",
    description: "Tools and utilities for frontend development",
    url: "https://github.com/nobuti",
  },
];

export const ProjectsSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>{project.name}</h3>
            <p className={styles.cardDescription}>{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

