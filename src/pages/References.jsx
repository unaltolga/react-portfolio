import references from '../data/references.js';

function References() {
  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">References</p>
        <h1>People I have worked with</h1>
        <p className="lead">
          Feedback from people I collaborated with, about communication, delivery and problem
          solving.
        </p>

        <div className="grid">
          {references.map((reference) => (
            <figure key={reference.id} className="card testimonial">
              <blockquote>{reference.testimonial}</blockquote>
              <figcaption>
                <span className="testimonial-name">{reference.name}</span>
                <span className="meta">
                  {reference.position}, {reference.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
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
