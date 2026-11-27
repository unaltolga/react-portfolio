import { formatDay, formatMonthYear, toDateInput } from '../utils/dates.js';

// The four backend models the admin pages manage. Each entry lists the form fields
// (same names as the Mongoose model in the backend) and the columns of the list page.
// The list and form pages read this file, so a field is described in one place only.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const resources = {
  projects: {
    title: 'Projects',
    singular: 'project',
    description: 'Work shown on the Projects page. The first project is featured on the home page.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'completion', label: 'Completion date', type: 'date' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      {
        name: 'image',
        label: 'Image',
        type: 'text',
        hint: 'A path such as /images/project-travel.jpg or a full https:// address.'
      }
    ],
    columns: [
      { label: 'Title', value: (item) => item.title },
      { label: 'Completed', value: (item) => formatMonthYear(item.completion) || 'Not set' },
      { label: 'Description', value: (item) => item.description }
    ]
  },

  services: {
    title: 'Services',
    singular: 'service',
    description: 'Services listed on the Services page.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true }
    ],
    columns: [
      { label: 'Title', value: (item) => item.title },
      { label: 'Description', value: (item) => item.description }
    ]
  },

  references: {
    title: 'References',
    singular: 'reference',
    description: 'Testimonials shown on the References page.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'position', label: 'Position', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'testimonial', label: 'Testimonial', type: 'textarea', required: true }
    ],
    columns: [
      { label: 'Name', value: (item) => item.name },
      {
        label: 'Position',
        value: (item) => [item.position, item.company].filter(Boolean).join(', ') || 'Not set'
      },
      { label: 'Testimonial', value: (item) => item.testimonial }
    ]
  },

  users: {
    title: 'Users',
    singular: 'user',
    description: 'Accounts for the site. Sign-in with these accounts comes in the next assignment.',
    fields: [
      { name: 'firstname', label: 'First name', type: 'text', required: true },
      { name: 'lastname', label: 'Last name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        // The backend never sends the password back, so the edit form starts empty.
        editHint: 'Leave empty to keep the current password.'
      }
    ],
    columns: [
      { label: 'Name', value: (item) => `${item.firstname || ''} ${item.lastname || ''}`.trim() },
      { label: 'Email', value: (item) => item.email },
      { label: 'Created', value: (item) => formatDay(item.created) },
      { label: 'Updated', value: (item) => formatDay(item.updated) }
    ]
  }
};

// Order used on the dashboard and for the routes.
export const resourceKeys = ['projects', 'services', 'references', 'users'];

// Starting values of the form: empty for "add", the stored record for "edit".
export function toFormValues(resource, item) {
  const values = {};
  for (const field of resources[resource].fields) {
    if (field.type === 'password' || !item) {
      values[field.name] = '';
    } else if (field.type === 'date') {
      values[field.name] = toDateInput(item[field.name]);
    } else {
      values[field.name] = item[field.name] ?? '';
    }
  }
  return values;
}

// Returns an object of error messages by field name. Empty object means valid.
export function validate(resource, values, isEdit) {
  const errors = {};

  for (const field of resources[resource].fields) {
    const value = String(values[field.name] ?? '').trim();

    if (field.required && !value) {
      errors[field.name] = `Please enter the ${field.label.toLowerCase()}.`;
    } else if (field.type === 'email' && value && !emailPattern.test(value)) {
      errors[field.name] = 'Please enter a valid email address.';
    } else if (field.type === 'password') {
      if (!isEdit && !value) {
        errors[field.name] = 'Please enter a password.';
      } else if (value && value.length < 6) {
        errors[field.name] = 'The password needs at least 6 characters.';
      }
    } else if (field.name === 'image' && value && !/^(\/|https?:\/\/)/.test(value)) {
      errors[field.name] = 'Start with / for a site image or with https:// for a link.';
    }
  }

  return errors;
}

// What is sent to the backend. Text is trimmed, an empty date is sent as null,
// and an empty password on the edit form is left out so the old one stays.
export function toPayload(resource, values, isEdit) {
  const payload = {};

  for (const field of resources[resource].fields) {
    const value = String(values[field.name] ?? '').trim();

    if (field.type === 'password') {
      if (value || !isEdit) payload[field.name] = value;
    } else if (field.type === 'date') {
      if (value) payload[field.name] = value;
      else if (isEdit) payload[field.name] = null;
    } else {
      payload[field.name] = value;
    }
  }

  return payload;
}
