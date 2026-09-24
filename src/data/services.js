// Services listed on the Services page.
const services = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description:
      'I build modern web interfaces with reusable components, performance budgets and accessibility in mind.',
    image: '/images/service-frontend.jpg',
    imageAlt: 'Browser developer tools showing HTML and CSS',
    deliverables: ['Design system setup', 'Performance optimization', 'Accessibility review']
  },
  {
    id: 'fullstack',
    title: 'Full-stack Application',
    description:
      'From API design to cloud deployment, I ship production-grade applications with CI/CD pipelines.',
    image: '/images/service-fullstack.jpg',
    imageAlt: 'Server and database infrastructure on a screen',
    deliverables: ['API architecture', 'Database modelling', 'CI/CD automation']
  },
  {
    id: 'ux',
    title: 'Product and UX Consulting',
    description:
      'I run research, prototyping and usability testing so product decisions are based on evidence.',
    image: '/images/service-ux.jpg',
    imageAlt: 'Team reviewing wireframes and sticky notes',
    deliverables: ['Persona development', 'Prototype testing', 'Roadmap planning']
  }
];

export default services;
