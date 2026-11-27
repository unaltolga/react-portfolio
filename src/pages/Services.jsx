import { useList } from '../hooks/useList.js';
import LoadStatus from '../components/LoadStatus.jsx';

function Services() {
  // The services come from the database through the backend API.
  const { status, items: services, error, reload } = useList('services');

  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Services</p>
        <h1>How I can help</h1>
        <p className="lead">Solutions shaped around your product goals.</p>

        <LoadStatus status={status} error={error} onRetry={reload} what="services" />

        {status === 'ready' && services.length === 0 && (
          <p className="status-note">No services have been added yet.</p>
        )}

        {status === 'ready' && services.length > 0 && (
          <div className="grid">
            {services.map((service) => (
              <article key={service.id} className="card">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="card">
          <p className="eyebrow">Working principles</p>
          <h2>Transparent process, measurable results</h2>
          <p>
            I work in sprints, send a weekly status update and run a QA checklist before every
            release so the project stays on track.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Services;
