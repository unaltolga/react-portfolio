import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api/client.js';
import { useList } from '../../hooks/useList.js';
import LoadStatus from '../../components/LoadStatus.jsx';
import { resources } from '../../admin/resources.js';

// List page for one resource: shows every record from the database in a table,
// with links to edit them and a button to delete them.
function ResourceList({ resource }) {
  const config = resources[resource];
  const location = useLocation();
  const navigate = useNavigate();
  const { status, items, error, reload } = useList(resource);

  // After a save, the form sends a message such as "The project was added."
  const [notice, setNotice] = useState(location.state?.notice || '');
  // Id of the row that asks "Delete this ...?", and of the row being deleted.
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  // Clear the route state so a refresh does not show the message again.
  useEffect(() => {
    if (location.state?.notice) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  async function handleDelete(id) {
    setDeletingId(id);
    setDeleteError('');
    try {
      await api.remove(resource, id);
      setNotice(`The ${config.singular} was deleted.`);
      setConfirmId(null);
      // The delete answer has no data, so load the list again from the database.
      reload();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  // While the list reloads after a delete, keep showing the rows we already have.
  const showTable = status !== 'error' && items.length > 0;
  const showStatus = status === 'error' || (status === 'loading' && items.length === 0);

  return (
    <div className="page">
      <section className="section">
        <div className="page-head">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>{config.title}</h1>
            <p className="lead">{config.description}</p>
          </div>
          <div className="buttons">
            <Link className="button primary" to={`/admin/${resource}/new`}>
              Add {config.singular}
            </Link>
            <Link className="button quiet" to="/admin">
              Back to dashboard
            </Link>
          </div>
        </div>

        {notice && (
          <p className="status-note success" role="status">
            {notice}
          </p>
        )}
        {deleteError && (
          <p className="status-note error" role="alert">
            Could not delete: {deleteError}
          </p>
        )}

        {showStatus && <LoadStatus status={status} error={error} onRetry={reload} what={resource} />}

        {status === 'ready' && items.length === 0 && (
          <div className="status-note">
            <p>There are no {resource} yet.</p>
            <Link className="button ghost" to={`/admin/${resource}/new`}>
              Add the first {config.singular}
            </Link>
          </div>
        )}

        {showTable && (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {config.columns.map((column) => (
                    <th key={column.label} scope="col">
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="actions">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    {config.columns.map((column, index) =>
                      index === 0 ? (
                        <th key={column.label} scope="row">
                          {column.value(item)}
                        </th>
                      ) : (
                        <td key={column.label}>
                          <span className="clip">{column.value(item)}</span>
                        </td>
                      )
                    )}
                    <td className="actions">
                      {confirmId === item.id ? (
                        <span className="confirm">
                          <span>Delete this {config.singular}?</span>
                          <button
                            type="button"
                            className="button danger small"
                            disabled={deletingId === item.id}
                            onClick={() => handleDelete(item.id)}
                          >
                            {deletingId === item.id ? 'Deleting...' : 'Yes, delete'}
                          </button>
                          <button
                            type="button"
                            className="button quiet small"
                            disabled={deletingId === item.id}
                            onClick={() => setConfirmId(null)}
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <span className="confirm">
                          <Link className="button ghost small" to={`/admin/${resource}/${item.id}/edit`}>
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="button quiet small"
                            onClick={() => {
                              setConfirmId(item.id);
                              setDeleteError('');
                            }}
                          >
                            Delete
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default ResourceList;
