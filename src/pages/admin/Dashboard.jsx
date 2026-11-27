import { Link } from 'react-router-dom';
import { useList } from '../../hooks/useList.js';
import { resourceKeys, resources } from '../../admin/resources.js';

// One card per backend model, with the number of records and links to manage them.
function DashboardCard({ resource }) {
  const config = resources[resource];
  const { status, items } = useList(resource);

  let count = 'Loading...';
  if (status === 'ready') {
    count = `${items.length} ${items.length === 1 ? config.singular : resource}`;
  } else if (status === 'error') {
    count = 'Could not load the count';
  }

  return (
    <article className="card admin-card">
      <h2>{config.title}</h2>
      <p className="meta">{count}</p>
      <p>{config.description}</p>
      <div className="buttons">
        <Link className="button ghost" to={`/admin/${resource}`}>
          Manage {resource}
        </Link>
        <Link className="button quiet" to={`/admin/${resource}/new`}>
          Add {config.singular}
        </Link>
      </div>
    </article>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Admin</p>
        <h1>Admin dashboard</h1>
        <p className="lead">
          Add, edit and delete the content of the site. Every change is saved to the database
          through the backend API.
        </p>

        <div className="grid two">
          {resourceKeys.map((resource) => (
            <DashboardCard key={resource} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
