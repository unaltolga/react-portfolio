import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="section status-page">
      <p className="error-code">404</p>
      <h1>Page not found</h1>
      <p className="lead">
        The address you opened does not exist. It may have been renamed or mistyped.
      </p>

      <div className="buttons">
        <Link className="button primary" to="/">
          Back to home
        </Link>
        <Link className="button ghost" to="/contact">
          Report a broken link
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
