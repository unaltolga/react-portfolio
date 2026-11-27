import { useList } from '../hooks/useList.js';
import LoadStatus from '../components/LoadStatus.jsx';
import { formatMonthYear } from '../utils/dates.js';

function Projects() {
  // The projects come from the database through the backend API.
  const { status, items: projects, error, reload } = useList('projects');

  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Projects</p>
        <h1>Selected work</h1>
        <p className="lead">
          Projects from the last two years, with a short description and the completion date.
        </p>

        <LoadStatus status={status} error={error} onRetry={reload} what="projects" />

        {status === 'ready' && projects.length === 0 && (
          <p className="status-note">No projects have been added yet.</p>
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="grid">
            {projects.map((project) => (
              <article key={project.id} className="card media-card">
                {project.image && <img src={project.image} alt={project.title} />}

                <div className="card-body">
                  {project.completion && (
                    <p className="meta">Completed: {formatMonthYear(project.completion)}</p>
                  )}
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Projects;
