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
    return "Invalid request."; // or some message indicating an invalid or missing token
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
