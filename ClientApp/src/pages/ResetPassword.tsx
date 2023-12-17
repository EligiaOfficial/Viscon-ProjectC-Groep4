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

    if (!isTokenValid) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <p className="text-center text-gray-700">
                Invalid or expired token.
              </p>
            </div>
          </div>
        );
      }

    // Send POST request to backend with token and new password
    try {
      const response = await fetch('/api/auth/reset-password', {
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
    <div className="h-screen flex flex-col dark:bg-stone-900">
      <div className="flex flex-row h-full">
        <div className="basis-1/2 hidden md:block">
        <img
            className={"object-cover w-full h-full"}
            src="https://viscongroup.eu/app/mu-plugins/customized-login/dist/images/background.jpg"
            alt="Background"
          />
        </div>
        <div className="basis-full md:basis-1/3 bg-gray-150 mt-20">
          <div className="mt-20 sm:mx-auto sm:max-w-sm">
            <h1 className={"mb-3 pt-5 text-xl text-gray-800 dark:text-white"}>
              {("Reset Password")}
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium leading-3 text-gray-500 dark:text-stone-400"
                >
                  {("New Password")}
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className={"flex justify-end"}>
                <button
                  type="submit"
                  className="flex w-1/4 justify-center rounded-md bg-gray-600 dark:bg-stone-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {("Reset")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
