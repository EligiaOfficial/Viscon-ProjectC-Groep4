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

function Login() {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Passw:", password);

    if (email !== "" && password !== "") {
      LoginAxios({
        email: email,
        password: password,
      })
        .then((res) => {
          localStorage.setItem("token", res["data"]);
          console.log("Res: ", res["data"]);
          nav("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Email and or Password not found");
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
              {t("login.title")}
            </h1>
            <p className={"mb-5 text-sm text-gray-400 dark:text-white"}>
              {t("login.subtitle")}
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium leading-3 text-gray-500 dark:text-stone-400"
                >
                  {t("login.email")}
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
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium leading-2 text-gray-500 dark:text-stone-400"
                  >
                    {t("login.password")}
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
                </div>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:text-indigo-500 dark:text-stone-400 dark:hover:text-stone-200"
                >
                  {t("login.forgot")}
                </a>
              </div>
              <div className={"flex justify-end"}>
                <button
                  type="submit"
                  className="flex w-1/4 justify-center rounded-md bg-gray-600 dark:bg-stone-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {t("login.signIn")}
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
