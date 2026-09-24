// Projects shown on the Projects page. The first one is also featured on the home page.
const projects = [
  {
    id: 'design-system',
    title: 'Portfolio Design System',
    description:
      'Built a reusable React component library and theming workflow for agencies serving multiple industries.',
    completionDate: 'March 2026',
    role: 'Interface Engineer',
    image: '/images/project-design-system.jpg',
    imageAlt: 'Laptop showing a component library in a code editor',
    stack: ['React', 'Styled Components', 'Storybook']
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description:
      'Shipped a real-time analytics platform with KPI tracking and collaboration tools for cross-functional teams.',
    completionDate: 'December 2025',
    role: 'Full-stack Developer',
    image: '/images/project-analytics.jpg',
    imageAlt: 'Dashboard charts on a desktop monitor',
    stack: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'travel',
    title: 'Travel Planning App',
    description:
      'Delivered a mobile-friendly web app that helps travellers build itineraries from a single shared view.',
    completionDate: 'May 2025',
    role: 'Product Engineer',
    image: '/images/project-travel.jpg',
    imageAlt: 'People planning a route with a map and a phone',
    stack: ['React', 'Firebase', 'Figma']
  }
];

export default projects;
