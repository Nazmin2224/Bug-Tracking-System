
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page dark-theme">
      {/* Hero Section */}
      <div className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to <span className="highlight">Bug Tracker</span></h1>
          <p>Track, manage, and squash bugs with ease. Efficient, clean, and fast!</p>
          <button className="cta-button" onClick={() => navigate('/login')}>
            🚀 Join Now
          </button>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          className="section-intro"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Why Use Our Tracker?</h2>
          <p>
            Empower your team with real-time bug reporting, role-based dashboards, and clean tracking.
          </p>
        </motion.div>

        <div className="features-grid">
          {[
            { title: "🐛 Log Issues Fast", desc: "Submit bugs with steps, severity, and screenshots." },
            { title: "🧑‍💻 Role-Based Dashboards", desc: "Separate views for Admin, Developer, Tester." },
            { title: "🔐 Secure & Reliable", desc: "Backed by Spring Boot and MySQL." },
            { title: "📈 Track Status", desc: "Update and manage bug lifecycle in one place." },
          ].map((item, index) => (
            <motion.div
              className="feature-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
