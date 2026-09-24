const strengths = [
  'Production experience with TypeScript, React, React Query and Zustand.',
  'Comfortable with design tokens, Storybook and accessibility audits.',
  'Familiar with GitHub Actions, Vercel, Render and Netlify deployments.',
  'I document technical decisions and share them with the team.'
];

const timeline = [
  {
    date: '2026 - Present',
    title: 'Independent Product Engineer',
    text: 'Building web applications for startups and small teams, from discovery to deployment.'
  },
  {
    date: '2024 - 2026',
    title: 'Centennial College',
    text: 'Web Application Development, focused on modern JavaScript frameworks and cloud architecture.'
  },
  {
    date: 'Summer 2024',
    title: 'Product Technology Intern',
    text: 'Refactored React components and contributed to a design system at a Toronto SaaS startup.'
  }
];

function About() {
  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Profile</p>
        <h1>About me</h1>
        <p className="lead">
          Product-minded developer in the React ecosystem who builds a shared language between
          design and engineering teams.
        </p>

        <div className="profile">
          <img className="profile-image" src="/images/profile.jpg" alt="Photo of Tolga Ünal" />

          <div>
            <dl className="identity">
              <div>
                <dt>Legal name</dt>
                <dd className="identity-name">Tolga Ünal</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>Web Application Developer</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Toronto, ON, Canada</dd>
              </div>
            </dl>

            <p>
              I am a Web Application Development student at Centennial College in Toronto. I spend
              most of my time in the React ecosystem, building interfaces that stay readable as they
              grow. I care about the details users feel rather than see: load time, keyboard access
              and clear error messages.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h2>Key strengths</h2>
            <ul className="list">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Interests</h2>
            <p>
              Outside of work I am interested in composition, photography and user psychology. Those
              hobbies feed straight into my design decisions.
            </p>
            <ul className="tags">
              <li>#frontend</li>
              <li>#designsystems</li>
              <li>#accessibility</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Journey</p>
        <h2>Experience</h2>

        <ol className="timeline">
          {timeline.map((item) => (
            <li key={item.title}>
              <p className="timeline-date">{item.date}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="card callout">
          <div>
            <p className="eyebrow">Resume</p>
            <h2>Download my resume</h2>
            <p>A one-page PDF with my technical skills, education and selected projects.</p>
          </div>
          <a
            className="button primary"
            href="/resume/tolga-unal-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download resume (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
