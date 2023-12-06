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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-2 text-center text-blue-600">Forgot Password</h1>
        {submitted ? (
          <p className="text-center">
            If an account with the provided email address exists, you will receive an email with instructions to reset your password.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md p-3 w-full hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 transition-all ease-in-out duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
