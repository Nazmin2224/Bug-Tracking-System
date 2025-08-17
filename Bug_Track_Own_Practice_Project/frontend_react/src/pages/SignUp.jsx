import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(`Signed up successfully as ${role}`);
    if (role === 'Admin') navigate('/admin');
    else if (role === 'Tester') navigate('/tester');
    else navigate('/developer');
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <div>
          <div className="icon-circle">👤</div>
          <h1>Let’s<br />Make it<br />Happen<br />Together!</h1>
        </div>
      </div>

      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSignUp}>
          <h2>Create An Account</h2>
          <div className="form-grid">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <input type="tel" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="Admin">Admin</option>
              <option value="Tester">Tester</option>
              <option value="Developer">Developer</option>
            </select>

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <div className="terms">
            <input type="checkbox" required />
            <label>I agree to the <a href="#">Terms & Conditions</a></label>
          </div>

          <button type="submit" className="signup-btn">Create Account</button>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in →</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
