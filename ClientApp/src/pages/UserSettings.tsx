/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useState } from "react";
import { EditUserAxios } from "../Endpoints/Dto";
import { useNavigate } from "react-router-dom";
import {
  getEmail,
  getLang,
  getName,
  getPhone,
  getRole,
} from "../Endpoints/Jwt";
import { UserRoles } from "../UserRoles";
import HamburgerButton from "../components/HamburgerButton";
import ErrorField from "../components/ErrorField";
import ThemeSwitcher from "../components/ThemeSwitcher";

const EditAccount = ({ toggleSettings }) => {
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [menu, setMenu] = useState<boolean>(false);

  const [showPopup, setShowPopup] = useState(false);
  
  const [passErr, setPassErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const token = localStorage.getItem("token");
  const usr_name = getName(token);
  const usr_email = getEmail(token);
  const usr_phone = getPhone(token);
  const usr_lang = getLang(token);

  const nav = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[0-9]*[\s./-]?[(]?[0-9]+[)]?[-\s./]?[0-9]+[-\s./]?[0-9]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password != confirmPassowrd) {
      setPassErr("New passwords to not match");
      setShowPopup(false); 
    } else {
      setPassErr("")
    }

    if (email != "" && !emailRegex.test(email)) {
      setEmailErr("Please fill in a correct email adress\nExample: yourname@email.com")
      setShowPopup(false); 
    } else {
      setEmailErr("");
    }

    if (phone != "" && !phoneRegex.test(phone)) {
      setPhoneErr("Not a valid phone number found.\nExamples: +31652457819, 0615984565, 080058856")
      setShowPopup(false); 
    } else {
      setPhoneErr("")
    }

    if (password === confirmPassowrd) {
      try {
        const response = await EditUserAxios({
          email: email,
          password: password,
          phone: phone,
          language: language,
        });
  
        if (response.status === 200) {
          setShowPopup(true); 
          setPassword("");
          setConfirmPassword("");
          setEmail("");
          setPhone("");
          localStorage.setItem("token", response["data"]);
          toggleSettings();
          // Additional logic if needed
        } else {
          // Handle other response statuses if needed
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setEmailErr("Email already taken.");
        }
        console.error("Error:", error);
      }
    }
  };

  function changeTheme() {
    return undefined;
    
  }

  return (
      <div className={"h-screen mt-[50px] z-50 w-fit bg-gray-700 dark:bg-stone-600 text-white p-4"}>
      <div className={"flex justify-end"}>
        <div
          className={
            "flex justify-center rounded-md bg-gray-600 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          }
        >
          <HamburgerButton onclick={toggleSettings} state={true} />
        </div>
      </div>

      <div className="flex flex-row h-screen mx-10">
        <div className="w-full bg-gray-150 mt-20">
          <div className="mt-50 sm:mx-auto sm:max-w-sm">
            <h1>Your Account:</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className={"flex w-full"}>
                  <label
                    className="flex-1 block text-xs font-medium leading-3 dark:text-stone-400 text-gray-500"
                  >
                    First Name
                  </label>

                  <label
                    className="flex-1 block text-xs font-medium leading-3 dark:text-stone-400 text-gray-500"
                  >
                    Last Name
                  </label>
                </div>

                <div className="mt-2">
                  <div className={"flex"}>
                    <input
                      id="firstName"
                      value={usr_name[0]}
                      disabled
                      placeholder={usr_name[0]}
                      name="firstName"
                      type="firstName"
                      autoComplete="firstName"
                      className="pl-2 mr-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    />
                    <input
                      id="LastName"
                      disabled
                      value={usr_name[1]}
                      placeholder={usr_name[1]}
                      name="LastName"
                      type="LastName"
                      autoComplete="LastName"
                      className="pl-2 ml-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium leading-3 dark:text-stone-400 text-gray-500"
                >
                  Email address
                  <br/>
                  <span className={"font-xs"}>
                      (Leave empty to not change)
                    </span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    placeholder={usr_email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                  {emailErr != "" ? <ErrorField error={emailErr}/> : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium leading-3 dark:text-stone-400 text-gray-500"
                >
                  Phone
                  <br/>
                  <span className={"font-xs"}>
                      (Leave empty to not change)
                    </span>
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    placeholder={usr_phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                  {phoneErr != "" ? <ErrorField error={phoneErr}/> : null}
                </div>
              </div>

              <div>
                <div className={"flex w-full"}>
                  <label
                    htmlFor="email"
                    className="flex-1 block text-xs font-medium leading-3 dark:text-stone-400 text-gray-500"
                  >
                    New password
                    <br/>
                    <span className={"font-xs"}>
                      (Leave empty to not change)
                    </span>
                  </label>
                  <label
                    htmlFor="email"
                    className="flex-1 block text-xs font-medium leading-3 dark:text-stone-400 text-gray-500"
                  >
                    Confirm new password
                  </label>
                </div>
                <div>
               
                </div>

                <div className="mt-2">
                  <div className={"flex"}>
                    <input
                      id="password"
                      value={password}
                      placeholder={"********"}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type="password"
                      autoComplete="password"
                      className="pl-2 mr-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    />

                    <input
                      id="password2"
                      value={confirmPassowrd}
                      placeholder={"********"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      name="password"
                      type="password"
                      autoComplete="password"
                      className="pl-2 ml-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {passErr != "" ? <ErrorField error={passErr}/> : null}
                </div>
              </div>

              <ThemeSwitcher/>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md inline-flex w-full items-center justify-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-r dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-stone-900 hover:bg-blue-800"
              >
                Edit User Info
              </button>
            </form>
            {showPopup && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Success!</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Your changes have been saved.</p>
      <button
        onClick={() => setShowPopup(false)}
        className="mt-4 bg-gray-300 dark:bg-gray-600 hover:bg-blue-800 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-stone-900"
      >
        Close
      </button>
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
