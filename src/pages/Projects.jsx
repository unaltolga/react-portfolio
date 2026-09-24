import projects from '../data/projects.js';

function Projects() {
  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Projects</p>
        <h1>Selected work</h1>
        <p className="lead">
          Projects from the last two years. Each card shows my role, the stack and the delivery
          date.
        </p>

        <div className="grid">
          {projects.map((project) => (
            <article key={project.id} className="card media-card">
              <img src={project.image} alt={project.imageAlt} />

              <div className="card-body">
                <p className="meta">Completed: {project.completionDate}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <p className="meta">Role: {project.role}</p>

                <ul className="tags">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Projects;
