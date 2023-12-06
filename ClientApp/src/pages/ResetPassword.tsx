import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenParam = query.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      setIsTokenValid(true); // Additional validation can be done here
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if password is empty
    if (!password) {
      alert("Please enter a new password.");
      return;
    }

    // Send POST request to backend with token and new password
    try {
      const response = await fetch('/api/password/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        alert("Your password has been reset successfully. Please log in with your new password.");
        // Redirect to login page or another appropriate page
      } else {
        // Handle different types of server responses (e.g., token expired, user not found)
        const errorMsg = await response.text();
        alert(`Error resetting password: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error submitting reset password:', error);
      alert('An error occurred while resetting your password. Please try again later.');
    }
  };

  if (!isTokenValid) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-center text-gray-700">
            Invalid request.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-2 text-center text-blue-600">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md p-3 w-full hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 transition-all ease-in-out duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
