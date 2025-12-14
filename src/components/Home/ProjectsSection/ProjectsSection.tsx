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
    <section className="py-xl border-t border-border">
      <h2 className="text-2xl font-bold mb-md">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-md">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-md border border-border rounded no-underline text-foreground transition-all duration-200 hover:border-accent hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-semibold mb-xs">{project.name}</h3>
            <p className="text-sm text-secondary mb-0 leading-base">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

