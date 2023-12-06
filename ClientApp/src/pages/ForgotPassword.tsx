// src/components/ForgotPassword.tsx
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make an API request to your C# backend to initiate the password reset
    fetch('/api/password/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        }
      })
      .catch((error) => {
        console.error('Error initiating password reset:', error);
      });
  };

  return (
    <div>
      {submitted ? (
        <p>
          If an account with the provided email address exists, you will receive an email with instructions to reset your password.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email Address:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
