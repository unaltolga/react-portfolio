import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

function Contact() {
  const navigate = useNavigate();
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    // Remove the error as soon as the user starts fixing that field.
    if (errors[name]) {
      const rest = { ...errors };
      delete rest[name];
      setErrors(rest);
    }
  }

  function validate() {
    const found = {};

    if (!values.firstName.trim()) found.firstName = 'Please enter your first name.';
    if (!values.lastName.trim()) found.lastName = 'Please enter your last name.';
    if (!values.subject.trim()) found.subject = 'Please enter a subject.';

    if (!values.email.trim()) {
      found.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      found.email = 'Please enter a valid email address.';
    }

    // The phone number is optional, so only check it if something was typed.
    if (values.phone.trim() && !/^[+]?[\d\s()-]{7,20}$/.test(values.phone.trim())) {
      found.phone = 'Please enter a valid phone number.';
    }

    if (values.message.trim().length < 10) {
      found.message = 'Please write at least 10 characters.';
    }

    return found;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    // The form is not connected to a server. It passes the values to the home
    // page through the route state, and the home page shows them back.
    navigate('/', { state: { message: values } });
  }

  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Contact</p>
        <h1>Ready to collaborate?</h1>
        <p className="lead">
          Send me a project idea, a collaboration offer or just a hello. I usually reply within 24
          hours.
        </p>

        <div className="contact-grid">
          <aside className="card">
            <h2>Contact information</h2>

            <dl className="contact-list">
              <dt>Email</dt>
              <dd>
                <a href="mailto:tolga.unal.dev@gmail.com">tolga.unal.dev@gmail.com</a>
              </dd>
              <dt>Phone</dt>
              <dd>
                <a href="tel:+16475550146">+1 (647) 555 0146</a>
              </dd>
              <dt>Location</dt>
              <dd>Toronto, Canada</dd>
              <dt>Working hours</dt>
              <dd>Weekdays 09:00 to 18:00 (ET)</dd>
            </dl>
          </aside>

          <div className="card">
            <h2>Send a message</h2>

            {/* noValidate turns off the browser's own messages so the ones below are used. */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="field">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="phone">Contact number (optional)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="button primary">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
