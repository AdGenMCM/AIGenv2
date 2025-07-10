import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AdGenerator from './AdGenerator';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loadingAuth) return <div>Loading...</div>;

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1 className="logo">AdGen MCM</h1>
          <div className="nav-links">
            {user ? (
              <>
                <span className="welcome-email">{user.email}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-button">Login</Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <AuthForm /> : <Navigate to="/generate" />} />
          <Route path="/generate" element={user ? <AdGenerator user={user} /> : <Navigate to="/LandingPage" />} />
        </Routes>
      </div>
    </Router>
  );
}

function LandingPage() {
  return (
    <div className="landing">
      <h2>Welcome to AdGen MCM</h2>
      <p>Your AI-powered ad creative generator.</p>
    </div>
  );
}

export default App;

