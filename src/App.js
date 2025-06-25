import React, { useEffect, useState } from 'react';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';


const skills = [
  'HTML',
  'CSS',
  'TailwindCSS',
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'NestJS',
  'PostgreSQL',
  'Prisma ORM',
  'TypeORM',
  'Git',
  'GitHub',
];

const projects = [
  {
    title: 'Twist',
    description: 'Social Media App – A Twitter-like platform where users can post, like, and comment. Built to explore real-time interactions and core social features.',
    link: 'https://twist-lyart.vercel.app/',
    image: '/twist-cover.png',
  },
  {
    title: 'e-commerce website',
    description: 'E-commerce Website – A full-stack web app with product listings, cart, user auth, and order processing. Images are temporary placeholders, as the focus was on building core features over final visuals.',
    link: 'https://demo-rabbit-frontend.vercel.app/',
    image: '/Rabbit-cover-Copy.png',
  },
  {
    title: 'Backend api',
    description: 'A backend API built with NestJS following REST principles. It includes core features like CRUD operations, structured modules, DTO validation, and organized service-layer architecture.',
    link: 'https://nestjs-demo-olive.vercel.app/',
    image: '/backend-api-cover.png',
  },
];

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [showAlt, setShowAlt] = useState(false);

  // Typewriter effect: cycle between " I'm yousef" and " I'm a Full-Stack Developer"
  const phrases = [" I'm yousef", " I'm a Full-Stack Developer"];
  const [displayed, setDisplayed] = useState(phrases[0]);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < phrases[phraseIdx].length) {
        timeout = setTimeout(() => {
          setDisplayed(phrases[phraseIdx].slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setTyping(true);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, phraseIdx]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      // Use relative URL for Vercel deployment, or localhost for development
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/contact' 
        : 'http://localhost:5000/contact';
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ name: '', email: '', message: '' });
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="App">
      <section className="landing">
        <div className="landing-content">
          <h1
            style={{
              color: '#c78800',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            Hello,
            <span style={{ borderRight: '2px solid #c78800', paddingLeft: 4, whiteSpace: 'nowrap' }}>
              {displayed}
            </span>
          </h1>
          <p>Welcome to my portfolio! I am a passionate developer eager to build amazing web experiences.</p>
          <a href="#projects" className="cta-btn">See My Projects</a>
        </div>
      </section>
      <section className="skills-section" id="skills">
        <h2>My Skills</h2>
        <p className="skills-intro">Here are some of the technologies and tools I work with:</p>
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <div className="skill-card" key={idx}>{skill}</div>
          ))}
        </div>
      </section>
      <section className="projects-section" id="projects">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <motion.div
              className="project-card"
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 60 }}
            >
              <img src={project.image} alt={project.title + ' preview'} className="project-image" />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="project-link">View Project</a>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="contact-section" id="contact">
        <h2>Contact Me</h2>
        <form className="contact-form" onSubmit={handleFormSubmit} aria-label="Contact form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleFormChange}
            required
            autoComplete="name"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
            required
            autoComplete="email"
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleFormChange}
            required
          />
          <button type="submit" className="cta-btn" disabled={formStatus === 'loading'}>
            {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          {formStatus === 'success' && <div className="form-success">Message sent successfully!</div>}
          {formStatus === 'error' && <div className="form-error">Something went wrong. Please try again.</div>}
        </form>
      </section>
      <footer className="footer">
        <div className="footer-contact">
          <span><MdPhone /> +201028967791</span>
          <span><MdEmail /> yousef.ahmedv7@gmail.com</span>
        </div>
        <div className="footer-social">
          <a href="https://github.com/yousef-v7" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/yousef-Ahmed-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
