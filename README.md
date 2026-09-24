# Portfolio

My personal portfolio site. Built with React, React Router and Vite.

Repository: https://github.com/unaltolga/react-portfolio

## Running it

Needs Node.js 18 or newer.

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:5173.

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

Anything else shows the 404 page.

## Folder structure

```
src/
  components/   Navbar, Footer, Layout, ErrorBoundary
  data/         Project, service and reference content
  pages/        One file per page, plus NotFound
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

- Replace the placeholder projects and references with real ones.
- Swap the resume PDF in `public/resume/` for the real one.
- Deploy and add the live URL here.

## Deploying

Single-page app, so the host has to return `index.html` for every path. Otherwise opening
`/projects` directly gives a 404. `vercel.json` and `public/_redirects` handle that.

On Vercel: import the repo, Vite preset, build command `npm run build`, output directory `dist`.
