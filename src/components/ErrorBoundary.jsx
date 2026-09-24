import { Component } from 'react';
import { Link } from 'react-router-dom';

// React only lets you catch render errors with a class component, so this is
// the one class in the project. Without it a single error blanks the whole page.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Caught a rendering error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section status-page">
          <h1>Something went wrong</h1>
          <p className="lead">
            This page failed to load, but the rest of the site still works.
          </p>
          <div className="buttons">
            <button
              type="button"
              className="button primary"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
            <Link className="button ghost" to="/">
              Back to home
            </Link>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
