/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import Nav from "../components/Nav";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAxios } from "../Endpoints/Dto";
import { useTranslation } from "react-i18next";
import ErrorField from "../components/ErrorField";

function Login() {
  const { t } = useTranslation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const [err, setErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    !emailRegex.test(email) ? setEmailErr(true) : setEmailErr(false);
    
    if (email !== "" && password !== "" && emailRegex.test(email)) {
      LoginAxios({
        email: email,
        password: password,
      })
        .then((res) => {
          localStorage.setItem("token", res["data"]);
          nav("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          setErr(true);
        });
    }
  };

  return (
    <div className="h-screen flex flex-col dark:bg-stone-900">
      <div className="flex flex-row h-full">
        <div className="basis-1/2 hidden md:block">
          <img
            className={"object-cover w-full h-full"}
            src="https://viscongroup.eu/app/mu-plugins/customized-login/dist/images/background.jpg"
            alt=""
          />
        </div>
        <div className="basis-full md:basis-1/3 bg-gray-150 mt-20">
          <div className="mt-20 sm:mx-auto sm:max-w-sm">
            <h1 className={"mb-3 pt-5 text-xl text-gray-800 dark:text-white"}>
              Welcome!
            </h1>
            <p className={"mb-5 text-sm text-gray-400 dark:text-white"}>
              Voer uw gegevens in om door te gaan.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium leading-3 text-gray-500 dark:text-stone-400"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 "
                  />
                  {emailErr ? <ErrorField error={t("login.error.email")} /> : null}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium leading-2 text-gray-500 dark:text-stone-400"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                  {err? <ErrorField error={t("login.error.failed")} /> : null}
                </div>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="text-xs text-gray-600 hover:text-indigo-500 dark:text-stone-400 dark:hover:text-stone-200"
                >
                  Lost your password?
                </a>
              </div>
              <div className={"flex justify-end"}>
                <button
                  type="submit"
                  className="flex w-1/4 justify-center rounded-md bg-gray-600 dark:bg-stone-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
