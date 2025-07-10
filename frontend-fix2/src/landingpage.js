// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">AdGen MCM</h1>
        <button className="login-btn" onClick={() => navigate('/auth')}>Login</button>
      </header>

      <main className="landing-main">
        <h2>Create Stunning Ad Graphics Instantly</h2>
        <p>Powered by AI – Tailored for your brand and audience.</p>
        <button className="cta-btn" onClick={() => navigate('/auth')}>Get Started</button>
      </main>
    </div>
  );
};

export default LandingPage;
