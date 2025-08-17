import React from 'react';
import './About.css';
import { FaBug, FaUsers, FaTools, FaRocket, FaSyncAlt } from 'react-icons/fa';

function About() {
  return (
    <div className="about-section">
      <div className="about-overlay">
        <div className="container text-light text-center py-5">
          <h1 className="display-4 fw-bold mb-4">Welcome to Bug Tracking System</h1>
          <p className="lead mb-5">
            Simplifying issue tracking and boosting collaboration for software teams.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 rounded shadow">
                <FaBug size={40} className="mb-3 text-primary" />
                <h5 className="fw-bold">Bug Tracking</h5>
                <p>Log, prioritize, and resolve bugs efficiently with real-time updates.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded shadow">
                <FaUsers size={40} className="mb-3 text-success" />
                <h5 className="fw-bold">Role-Based Access</h5>
                <p>Custom dashboards for Admins, Testers, and Developers to manage their work.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded shadow">
                <FaTools size={40} className="mb-3 text-warning" />
                <h5 className="fw-bold">Easy Integration</h5>
                <p>Designed to work seamlessly with your current development workflow.</p>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-6">
              <div className="feature-card p-4 rounded shadow">
                <FaRocket size={40} className="mb-3 text-danger" />
                <h5 className="fw-bold">Boost Productivity</h5>
                <p>Spend less time managing bugs and more time building features.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card p-4 rounded shadow">
                <FaSyncAlt size={40} className="mb-3 text-info" />
                <h5 className="fw-bold">Real-Time Collaboration</h5>
                <p>Keep everyone on the same page with instant status updates.</p>
              </div>
            </div>
          </div>

          <p className="mt-5 mb-0 text-white-50">
            Built for modern dev teams. Fast. Flexible. Efficient.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
