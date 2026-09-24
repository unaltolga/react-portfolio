import { Link } from 'react-router-dom';
import projects from '../data/projects.js';

const steps = [
  {
    number: '01',
    title: 'Discover and listen',
    text: 'Clarify business goals and user needs to define the right product scope.'
  },
  {
    number: '02',
    title: 'Design and build',
    text: 'Work on the design system, component architecture and APIs in parallel to save time.'
  },
  {
    number: '03',
    title: 'Measure and iterate',
    text: 'Track metrics after launch and keep improving the experience.'
  }
];

function Home({ message, onClose }) {
  const featured = projects[0];

  return (
    <div className="page">
      {/* Shown after the contact form redirects back here. */}
      {message && (
        <section className="confirmation">
          <div className="confirmation-head">
            <div>
              <h2>Thank you, {message.firstName}.</h2>
              <p>Your message was received. Here is a copy of what you sent.</p>
            </div>
            <button type="button" className="button ghost" onClick={onClose}>
              Close
            </button>
          </div>

          <dl className="confirmation-list">
            <dt>Name</dt>
            <dd>
              {message.firstName} {message.lastName}
            </dd>
            <dt>Email</dt>
            <dd>{message.email}</dd>
            <dt>Phone</dt>
            <dd>{message.phone || 'Not provided'}</dd>
            <dt>Subject</dt>
            <dd>{message.subject}</dd>
            <dt>Message</dt>
            <dd>{message.message}</dd>
          </dl>
        </section>
      )}

      <section className="hero">
        <div>
          <p className="eyebrow">React and product design</p>
          <h1 className="hero-title">Build, design, deliver value.</h1>
          <p className="lead">
            Hi, I am Tolga Ünal, a Toronto-based web application developer turning ideas into
            user-centric experiences. I guide teams from design systems to production-ready
            releases.
          </p>

          <div className="buttons">
            <Link className="button primary" to="/contact">
              Let us discuss your project
            </Link>
            <Link className="button ghost" to="/about">
              More about me
            </Link>
            <Link className="button quiet" to="/projects">
              Explore latest work
            </Link>
          </div>

          <div className="mission">
            <p className="eyebrow">Mission statement</p>
            <p>
              Ship software that respects the people who use it: fast to load, clear to read, and
              usable on any device.
            </p>
          </div>
        </div>

        <img
          className="hero-image"
          src="/images/hero-workspace.jpg"
          alt="Source code on a dark editor screen"
        />
      </section>

      <section className="section">
        <p className="eyebrow">Featured project</p>
        <h2>{featured.title}</h2>
        <p className="lead">{featured.description}</p>

        <div className="featured">
          <img src={featured.image} alt={featured.imageAlt} />
          <div>
            <p className="meta">
              Completed: {featured.completionDate} &middot; Role: {featured.role}
            </p>
            <p>
              I worked with the design team on a modular component library and theming setup, with
              dark and light modes and measurable performance improvements.
            </p>
            <ul className="tags">
              {featured.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <Link className="button ghost" to="/projects">
              See all projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Three steps to value</p>
        <h2>How I work with teams</h2>

        <div className="grid">
          {steps.map((step) => (
            <article key={step.number} className="card step">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
