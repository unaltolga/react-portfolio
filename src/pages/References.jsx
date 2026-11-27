import { useList } from '../hooks/useList.js';
import LoadStatus from '../components/LoadStatus.jsx';

function References() {
  // The references come from the database through the backend API.
  const { status, items: references, error, reload } = useList('references');

  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">References</p>
        <h1>People I have worked with</h1>
        <p className="lead">
          Feedback from people I collaborated with, about communication, delivery and problem
          solving.
        </p>

        <LoadStatus status={status} error={error} onRetry={reload} what="references" />

        {status === 'ready' && references.length === 0 && (
          <p className="status-note">No references have been added yet.</p>
        )}

        {status === 'ready' && references.length > 0 && (
          <div className="grid">
            {references.map((reference) => (
              <figure key={reference.id} className="card testimonial">
                <blockquote>{reference.testimonial}</blockquote>
                <figcaption>
                  <span className="testimonial-name">{reference.name}</span>
                  <span className="meta">
                    {[reference.position, reference.company].filter(Boolean).join(', ')}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="card">
          <h2>Reference requests</h2>
          <p>
            I only share contact details once both sides agree. If you need more references, please
            use the contact form.
          </p>
        </div>
      </section>
    </div>
  );
}

export default References;
