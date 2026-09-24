import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Services from './pages/Services.jsx';
import References from './pages/References.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  // The contact form sends the user back here with their details in the route
  // state. Pick them up, then clear the state so a refresh does not repeat it.
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: null });
    } else if (location.pathname !== '/') {
      // Drop it when the user leaves the home page, otherwise the panel shows
      // up again the next time they come back.
      setMessage(null);
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <Layout>
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home message={message} onClose={() => setMessage(null)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/references" element={<References />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
