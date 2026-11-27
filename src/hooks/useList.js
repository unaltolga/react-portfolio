import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client.js';

// Loads every record of one resource from the backend and keeps it in state.
// status is "loading", "ready" or "error". reload() fetches the list again,
// for example after a record was deleted.
export function useList(resource) {
  const [state, setState] = useState({ status: 'loading', items: [], error: '' });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    // If the page is left before the answer arrives, ignore the answer.
    let active = true;
    setState((previous) => ({ ...previous, status: 'loading', error: '' }));

    api
      .list(resource)
      .then((items) => {
        if (active) setState({ status: 'ready', items, error: '' });
      })
      .catch((err) => {
        if (active) setState({ status: 'error', items: [], error: err.message });
      });

    return () => {
      active = false;
    };
  }, [resource, version]);

  const reload = useCallback(() => setVersion((value) => value + 1), []);

  return { ...state, reload };
}
