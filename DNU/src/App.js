import React, { useEffect, useState } from 'react';
import './App.css';
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
    <div className="App">
      {user ? (
        <>
          <header className="welcome-container">
            <h1 className="welcome-title">AdGen MCM</h1>
            <p className="welcome-email">Welcome, {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </header>
          <AdGenerator user={user} />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;

