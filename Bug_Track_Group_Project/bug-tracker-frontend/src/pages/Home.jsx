import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Bug Tracker</h1>
          <p>
            Track, manage, and squash bugs with ease. Efficient, clean, and fast!
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="cta-button primary">
              🚀 Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Use Our Tracker?</h2>
        <p className="section-subtitle">
          Empower your team with real-time bug reporting, role-based dashboards, and clean tracking.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🐛 Log Issues Fast</h3>
            <p>Submit bugs with steps, screenshots, and details in seconds.</p>
          </div>
          <div className="feature-card">
            <h3>👩‍💻 Role-Based Dashboards</h3>
            <p>Get a personalized view depending on your role (Admin, Developer, Tester).</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Reliable</h3>
            <p>Backed by Spring Boot with robust authentication and role-based access.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Track Status</h3>
            <p>Update and manage bug lifecycle with clarity and speed.</p>
          </div>
        </div>
      </section>

      {/* 🌍 Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Bug Tracker. All Rights Reserved.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://github.com/Nazmin2224" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
