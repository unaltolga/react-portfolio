// Shared message for a list that is loading or failed to load.
function LoadStatus({ status, error, onRetry, what }) {
  if (status === 'loading') {
    return (
      <p className="status-note" role="status">
        Loading {what}...
      </p>
    );
  }

  if (status === 'error') {
    return (
      <div className="status-note error" role="alert">
        <p>
          Could not load {what}: {error}
        </p>
        {onRetry && (
          <button type="button" className="button ghost" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default LoadStatus;
