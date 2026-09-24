import services from '../data/services.js';

function Services() {
  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Services</p>
        <h1>How I can help</h1>
        <p className="lead">
          Solutions shaped around your product goals. Each one lists what is included.
        </p>

        <div className="grid">
          {services.map((service) => (
            <article key={service.id} className="card media-card">
              <img src={service.image} alt={service.imageAlt} />

              <div className="card-body">
                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <p className="meta">Deliverables</p>
                <ul className="list">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
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
