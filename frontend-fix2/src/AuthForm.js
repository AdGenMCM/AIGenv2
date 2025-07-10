// AuthForm.js
import './AuthForm.css'; 
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';


const AuthForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [unverifiedUser, setUnverifiedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setUnverifiedUser(null);

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMessage('Account created! Verification email sent. Please check your inbox.');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setUnverifiedUser(userCredential.user);
          setMessage('Please verify your email before logging in.');
          return;
        }
        onLogin(userCredential.user);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage('Enter your email to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleResendVerification = async () => {
    try {
      if (unverifiedUser) {
        await sendEmailVerification(unverifiedUser);
        setMessage('Verification email resent.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegistering ? 'Register' : 'Log In'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? 'Register' : 'Log In'}</button>
        <button type="button" onClick={handlePasswordReset}>
          Forgot Password?
        </button>
        {unverifiedUser && (
          <button type="button" onClick={handleResendVerification}>
            Resend Verification Email
          </button>
        )}
        <p className="auth-toggle" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
        </p>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default AuthForm;


