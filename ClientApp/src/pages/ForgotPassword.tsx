import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make an API request to your C# backend to initiate the password reset
    fetch('/api/auth/forgot-password', {
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
      else {
        throw new Error('Failed to send reset email');
      }
    })
    .catch((error) => {
      console.error('Error initiating password reset:', error);
    });
  };

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
              {t("Forgot Password")}
            </h1>
            {submitted ? (
              <p className="text-center text-green-600">
                If an account with the provided email address exists, you will receive an email with instructions to reset your password.
              </p>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium leading-3 text-gray-500 dark:text-stone-400"
                >
                  {t("Email")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
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
                  {t("Submit")}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
