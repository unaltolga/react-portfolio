import { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import { resources, toFormValues, toPayload, validate } from '../../admin/resources.js';

// The form values live in a reducer. "load" fills the form with a stored record
// (edit page), "change" updates one field while the user types.
function formReducer(values, action) {
  switch (action.type) {
    case 'load':
      return action.values;
    case 'change':
      return { ...values, [action.name]: action.value };
    default:
      return values;
  }
}

// Add and edit form for one resource. With an :id in the address it edits that
// record, without one it adds a new record.
function ResourceForm({ resource }) {
  const config = resources[resource];
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [values, dispatch] = useReducer(formReducer, resource, (name) => toFormValues(name, null));
  const [errors, setErrors] = useState({});
  // "loading" while the record is fetched, "ready" to type, "saving" while it is
  // sent, "missing" if the record could not be loaded.
  const [status, setStatus] = useState(isEdit ? 'loading' : 'ready');
  const [serverError, setServerError] = useState('');

  // Edit page: load the record from the database and put it in the form.
  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;

    api
      .get(resource, id)
      .then((item) => {
        if (!active) return;
        dispatch({ type: 'load', values: toFormValues(resource, item) });
        setStatus('ready');
      })
      .catch((err) => {
        if (!active) return;
        setServerError(err.message);
        setStatus('missing');
      });

    return () => {
      active = false;
    };
  }, [isEdit, resource, id]);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch({ type: 'change', name, value });

    // Remove the error as soon as the user starts fixing that field.
    if (errors[name]) {
      const rest = { ...errors };
      delete rest[name];
      setErrors(rest);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status !== 'ready') return;

    const found = validate(resource, values, isEdit);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('saving');
    setServerError('');

    try {
      const payload = toPayload(resource, values, isEdit);
      if (isEdit) {
        await api.update(resource, id, payload);
      } else {
        await api.create(resource, payload);
      }
      navigate(`/admin/${resource}`, {
        state: { notice: `The ${config.singular} was ${isEdit ? 'updated' : 'added'}.` }
      });
    } catch (err) {
      setServerError(err.message);
      setStatus('ready');
    }
  }

  const heading = `${isEdit ? 'Edit' : 'Add'} ${config.singular}`;

  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">
          <Link to="/admin">Admin</Link> / <Link to={`/admin/${resource}`}>{config.title}</Link>
        </p>
        <h1>{heading}</h1>

        {status === 'loading' && (
          <p className="status-note" role="status">
            Loading the {config.singular}...
          </p>
        )}

        {status === 'missing' && (
          <div className="status-note error" role="alert">
            <p>Could not load this {config.singular}: {serverError}</p>
            <Link className="button ghost" to={`/admin/${resource}`}>
              Back to {resource}
            </Link>
          </div>
        )}

        {(status === 'ready' || status === 'saving') && (
          <div className="card admin-form-card">
            {/* noValidate turns off the browser's own messages so the ones below are used. */}
            <form className="admin-form" onSubmit={handleSubmit} noValidate>
              {config.fields.map((field) => {
                const inputId = `${resource}-${field.name}`;
                const hint = isEdit ? field.editHint || field.hint : field.hint;
                const describedBy = [
                  errors[field.name] ? `${inputId}-error` : '',
                  hint ? `${inputId}-hint` : ''
                ]
                  .filter(Boolean)
                  .join(' ');

                const shared = {
                  id: inputId,
                  name: field.name,
                  value: values[field.name],
                  onChange: handleChange,
                  className: errors[field.name] ? 'error' : '',
                  'aria-invalid': errors[field.name] ? 'true' : undefined,
                  'aria-describedby': describedBy || undefined
                };

                return (
                  <div className="field" key={field.name}>
                    <label htmlFor={inputId}>
                      {field.label}
                      {field.required && <span className="required"> (required)</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea rows="5" {...shared} />
                    ) : (
                      <input
                        type={field.type}
                        autoComplete={field.type === 'password' ? 'new-password' : 'off'}
                        {...shared}
                      />
                    )}

                    {hint && (
                      <span className="hint" id={`${inputId}-hint`}>
                        {hint}
                      </span>
                    )}
                    {errors[field.name] && (
                      <span className="error-text" id={`${inputId}-error`}>
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                );
              })}

              {serverError && (
                <p className="status-note error" role="alert">
                  Could not save: {serverError}
                </p>
              )}

              <div className="buttons">
                <button type="submit" className="button primary" disabled={status === 'saving'}>
                  {status === 'saving' ? 'Saving...' : isEdit ? 'Save changes' : heading}
                </button>
                <Link className="button quiet" to={`/admin/${resource}`}>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default ResourceForm;
