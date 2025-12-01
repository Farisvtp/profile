import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    yearsExperience: 3,
    clientsCount: 100,
    projectsCount: 100,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/contact`, formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(""), 3000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };
    return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">ft.thabshee</div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#works" onClick={() => setMenuOpen(false)}>
              Works
            </a>
          </li>
          <li>
            <a href="https://wa.me/917510856347" onClick={() => setMenuOpen(false)}>
              Whatsapp
            </a>
          </li>
        </ul>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <h1 className="hero-name">Thabsheer</h1>
        <p className="hero-subtitle">
          <em>
            Specializing in motion, editing, and visuals to give every idea a
            powerful cinematic voice
          </em>
        </p>
        <a href="#about" className="cta-button">
          more about me
        </a>
      </section>

      {/* Stats Section */}
      <section className="credentials" id="about">
        <div className="section-label">CREDENTIALS</div>
        <h2 className="section-title">Showcase</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{stats.yearsExperience}</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.clientsCount}+</div>
            <div className="stat-label">Clients Worldwide</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.projectsCount}+</div>
            <div className="stat-label">Total Projects</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="section-label">SPECIALIZATION</div>
        <h2 className="section-title">Services Offering</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎬</div>
            <h3 className="service-title">Video Editing</h3>
            <p className="service-desc">
              Professional video editing with color grading and motion graphics.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">📹</div>
            <h3 className="service-title">Videography</h3>
            <p className="service-desc">
              High-quality video production for events and commercials.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">📸</div>
            <h3 className="service-title">Photography</h3>
            <p className="service-desc">
              Capturing moments with clarity and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div className="portfolio" id="works">
        <div className="section-label">PORTFOLIO</div>
        <h2 className="section-title">Featured Works</h2>
        <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🎉</div>
          <h3 className="service-title">Events</h3>
          <p className="service-desc">
            Capturing moments with clarity and creativity.
          </p>
        </div>
        <div className="service-card">
          <div className="service-icon">🎬</div>
          <h3 className="service-title">Film PR</h3>
          <p className="service-desc">
            Capturing moments with clarity and creativity.
          </p>
        </div>
        <div className="service-card">
          <div className="service-icon">📢</div>
          <h3 className="service-title">Advertisement</h3>
          <p className="service-desc">
            Capturing moments with clarity and creativity.
          </p>
          </div>
        </div>
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : (
          <div className="portfolio-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="portfolio-item">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-tags">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects">
                {/* <p>No projects yet. Add some from the backend!</p> */}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="section-label">STAY WITH ME</div>
        <h2 className="contact-title">
          Let's work
          <br />
          together.
        </h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            required
          />
          <button type="submit" className="cta-button">
            Send Message
          </button>
          {submitStatus === "success" && (
            <p className="success-message">Message sent successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="error-message">
              Error sending message. Please try Whatsapp.
            </p>
          )}
        </form>

        <div className="social-links">
          <a
            href="https://wa.me/917510856347"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/ft.thabshee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/thabsheerpv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;