# Portfolio

My personal portfolio site. Built with React, React Router and Vite. Since Assignment 3 the
content comes from my backend API (Express and MongoDB), and an admin dashboard adds, edits and
deletes it.

- Live site: https://react-portfolio-tau-fawn-59.vercel.app
- Repository: https://github.com/unaltolga/react-portfolio
- Backend repository: https://github.com/unaltolga/portfolio-backend
- Live backend: https://portfolio-backend-sand-three.vercel.app

## Running it

Needs Node.js 18 or newer.

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:5173.

The site talks to the live backend by default. To use another one (for example a backend
running on your own machine), create a `.env` file:

```bash
VITE_API_URL=http://localhost:3000
```

```bash
npm run build     # production build into dist/
npm run preview   # serve the build locally
npm run lint      # eslint over src/
```

## Pages

| Page | Route | What is on it |
|---|---|---|
| Home | `/` | Intro, mission statement, links to the other pages, featured project |
| About | `/about` | Name, photo, short intro, strengths, experience timeline, resume link |
| Projects | `/projects` | Projects with an image, description, role and completion date |
| Services | `/services` | Services with an image, description and deliverables |
| References | `/references` | Testimonials with name, position and company |
| Contact | `/contact` | Contact details and a message form |
| Admin | `/admin` | Dashboard with links to manage every model |

Projects, Services, References and the featured project on Home are loaded from the database
through the backend. They show a loading message, an error message with a retry button, or an
empty message when there is nothing to show.

Anything else shows the 404 page.

## Admin dashboard (Assignment 3)

| Rubric item | Where it is |
|---|---|
| Admin dashboard linking to the pages | `/admin`, plus the Admin link in the navigation bar |
| Forms to add and edit | `/admin/<model>/new` and `/admin/<model>/<id>/edit` |
| Pages to list and delete | `/admin/<model>` (table with Edit and Delete) |
| State management | `useReducer` for the form values, `useState` for errors, loading and saving |
| Backend CRUD | `src/api/client.js`: GET, POST, PUT and DELETE on `/api/<model>` |

`<model>` is `projects`, `services`, `references` or `users`.

- The form fields match the Mongoose models of the backend. They are described once in
  `src/admin/resources.js`, which the list and form pages read.
- Forms check required fields, the email format and the password length before sending.
  Errors from the backend (for example an invalid id) are shown on the page.
- Delete asks for confirmation inside the row. After a delete the list is loaded again from the
  database.
- The backend never sends passwords back, so the user edit form starts with an empty password
  field. Leaving it empty keeps the current password.
- Dates are stored in UTC and shown in UTC, so March 2026 stays March 2026 in Toronto.
- The admin pages are open to everyone for now. Sign-in comes in Assignment 4.

## Folder structure

```
src/
  admin/        Fields, columns and validation of the four models
  api/          client.js: requests to the backend
  components/   Navbar, Footer, Layout, ErrorBoundary, LoadStatus
  hooks/        useList: loads a list from the backend
  pages/        One file per page, plus NotFound
  pages/admin/  Dashboard, ResourceList, ResourceForm
  utils/        Date formatting
  styles/       global.css
  App.jsx       Routes
  main.jsx      Entry point
public/
  images/       Photos used on the pages
  resume/       The PDF linked from the About page
  logo.svg      Logo, also used as the favicon
```

## The contact form

The form has no backend yet. It validates the fields in the browser, and when everything is
valid it sends the user back to the home page with the values attached to the route state.
The home page then shows those values back to them.

## Error handling

- `ErrorBoundary` catches rendering errors and shows a "try again" panel instead of a blank page.
- The `*` route renders a 404 page for any unknown address.
- Form errors show under each field, with a thicker border as well as a colour change.

## Still to do

- Sign-in for the admin pages (Assignment 4).
- Replace the placeholder projects and references with real ones.
- Swap the resume PDF in `public/resume/` for the real one.

## Deploying

Single-page app, so the host has to return `index.html` for every path. Otherwise opening
`/projects` directly gives a 404. `vercel.json` and `public/_redirects` handle that.

On Vercel: import the repo, Vite preset, build command `npm run build`, output directory `dist`.
