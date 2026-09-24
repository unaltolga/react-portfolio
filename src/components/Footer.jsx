import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">© {year} Tolga Ünal</p>
          <p className="footer-detail">Personal Portfolio, Toronto, ON</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/references">References</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      <p className="footer-note">Built with React and Vite.</p>
    </footer>
  );
}

export default Footer;
