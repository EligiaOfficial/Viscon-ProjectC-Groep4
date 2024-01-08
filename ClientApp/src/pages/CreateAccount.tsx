/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useEffect, useState } from "react";
import { FetchUserCreationData, SignupAxios } from "../Endpoints/Dto";
import { useNavigate } from "react-router-dom";
import { getCompany, getDepartment, getRole } from "../Endpoints/Jwt";
import Layout from "../components/Layout";
import { UserRoles } from "../UserRoles";
import ErrorField from "../components/ErrorField";
import Toast from "../components/Toast";
import { useTranslation } from "react-i18next";

function AddAccount() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [passErr, setPassErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const [roleErr, setRoleErr] = useState("");
  const [departmentErr, setDepartmentErr] = useState("");
  const [companyErr, setCompanyErr] = useState("");

  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<object[]>([]);

  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState<object[]>([]);

  const [showToast, setShowToast] = useState(false);

  const token = localStorage.getItem("token");
  const usr_role = getRole(token);
  const usr_compId = getCompany(token);
  const usr_depId = getDepartment(token);

  const { t } = useTranslation();

  const nav = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex =
    /^[+]?[0-9]*[\s./-]?[(]?[0-9]+[)]?[-\s./]?[0-9]+[-\s./]?[0-9]+$/;

  if (usr_role >= UserRoles.USER) return <div>Error 404</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showToast) return;

    if (password == "") {
      setPassErr("Please fill in a password.");
    } else if (confirmPassword == "") {
      setPassErr("Please fill in your password confirmation");
    } else if (password != confirmPassword) {
      setPassErr("Passwords to not match");
    } else {
      setPassErr("");
    }

    if (email == "") {
      setEmailErr("Please fill in a email adress");
    } else if (email != "" && !emailRegex.test(email)) {
      setEmailErr(
        "Please fill in a correct email adress\nExample: yourname@email.com"
      );
    } else {
      setEmailErr("");
    }

    if (firstName == "") {
      setFirstNameErr("Please fill in a first name.");
    } else {
      setFirstNameErr("");
    }

    if (lastName == "") {
      setLastNameErr("Please fill in a last name.");
    } else {
      setLastNameErr("");
    }

    if (phone == "") {
      //TODO: Check if we want to make this nullable
      setPhoneErr("Please fill in a phone number.");
    } else if (phone != "" && !phoneRegex.test(phone)) {
      setPhoneErr(
        "Not a valid phone number found.\nExamples: +31652457819, 0615984565, 080058856"
      );
    } else {
      setPhoneErr("");
    }

    if (role == "" && usr_role == UserRoles.ADMIN) {
      setRoleErr("Please select a user type.");
    } else {
      setRoleErr("");
    }

    if (
      department == "" &&
      usr_role == UserRoles.ADMIN &&
      (role == 0 || role == 1)
    ) {
      setDepartmentErr("Please select which department the user will work.");
    } else {
      setDepartmentErr("");
    }

    if (
      company == "" &&
      usr_role == UserRoles.ADMIN &&
      (role == 2 || role == 3)
    ) {
      setCompanyErr("Please select which department the user will work.");
    } else {
      setCompanyErr("");
    }

    if (
      [
        passErr,
        emailErr,
        firstNameErr,
        lastNameErr,
        phoneErr,
        roleErr,
        departmentErr,
        companyErr,
      ].every((str) => str === "")
    ) {
      SignupAxios({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phone: phone,
        company: usr_role == UserRoles.ADMIN ? +company : +usr_compId,
        role: usr_role == UserRoles.ADMIN ? +role : 4,
        department: usr_role == UserRoles.ADMIN ? +department : +usr_depId,
        language: "EN",
      })
        .then((res) => {
          if (res.status == 200) {
            setShowToast(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            console.log("Something went wrong");
          }
        });
    }
  };

  useEffect(() => {
    FetchUserCreationData().then((res) => {
      const { companies, departments } = res.data;
      setCompanies(companies);
      setDepartments(departments);
    });
  }, []);
  return (
    <>
      <Layout>
        {showToast && (
          <Toast
            title={"Account Successfully Created"}
            description={"For " + firstName + " " + lastName}
            buttonText={"Return to Dashboard"}
            buttonFunction={() => {
              setShowToast(false);
            }}
          />
        )}

        <div className="flex flex-col items-center justify-center min-h-[calc(100%-100px)] h-full">
          {/*<span className="text-2xl py-4">Add Ticket</span>*/}
          <div className="mx-auto bg-white p-8 rounded-lg w-[1000px] shadow-lg space-y-6 dark:bg-stone-400">
            <h1 className="text-3xl mb-2 text-center text-blue-600 dark:text-stone-600">
              {t("createUser.title")}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                className={`${
                  usr_role == UserRoles.KEYUSER ? " " : "grid grid-cols-2 gap-6"
                }`}
              >
                <div className={"flex flex-col"}>
                  <div className={"flex justify-between flex-row"}>
                    <div className={"w-full mr-2.5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.firstname")}
                      </span>
                      <input
                        id="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="first_name"
                        type="first_name"
                        autoComplete="first_name"
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                      {firstNameErr != "" ? (
                        <ErrorField error={firstNameErr} />
                      ) : null}
                    </div>
                    <div className={"w-full ml-2.5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.lastname")}
                      </span>
                      <input
                        id="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name="last_name"
                        type="last_name"
                        autoComplete="last_name"
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                      {lastNameErr != "" ? (
                        <ErrorField error={lastNameErr} />
                      ) : null}
                    </div>
                  </div>

                  <div className={"mt-5 flex justify-between flex-row"}>
                    <div className={"w-full mr-2.5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.email")}
                      </span>
                      <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                      {emailErr != "" ? <ErrorField error={emailErr} /> : null}
                    </div>

                    <div className={"w-full ml-2.5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.phone")}
                      </span>
                      <input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        name="phone"
                        type="phone"
                        autoComplete="phone"
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                      {phoneErr != "" ? <ErrorField error={phoneErr} /> : null}
                    </div>
                  </div>

                  <div className={"mt-5 flex justify-between flex-row"}>
                    <div className={"w-full mr-2.5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.password")}
                      </span>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        autoComplete="password"
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                      {passErr != "" ? <ErrorField error={passErr} /> : null}
                    </div>

                    <div className={"w-full ml-2.5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.confirm")}
                      </span>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="password"
                        type="password"
                        autoComplete="password"
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {usr_role == UserRoles.ADMIN ? (
                    <div>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.userlabel")}
                      </span>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      >
                        <option value="">
                          {t("createUser.form.defaultuser")}
                        </option>
                        <option value="0">Admin</option>
                        <option value="1">Viscon Employee</option>
                        <option value="2">Trained User</option>
                        <option value="3">User</option>
                      </select>
                      {roleErr != "" ? <ErrorField error={roleErr} /> : null}
                    </div>
                  ) : (
                    <div />
                  )}

                  {usr_role == UserRoles.ADMIN &&
                  (role == UserRoles.ADMIN.toString() ||
                    role == UserRoles.VISCON.toString()) ? (
                    <div className={"mt-5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.departmentlabel")}
                      </span>
                      <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      >
                        <option value="">
                          {t("createUser.form.defaultdepartment")}
                        </option>
                        {departments.map((dep) => (
                          <option key={dep["id"]} value={dep["id"]}>
                            {dep["speciality"]}
                          </option>
                        ))}
                      </select>
                      {departmentErr != "" ? (
                        <ErrorField error={departmentErr} />
                      ) : null}
                    </div>
                  ) : (
                    <div />
                  )}

                  {usr_role == UserRoles.ADMIN &&
                  (role == UserRoles.KEYUSER.toString() ||
                    role == UserRoles.USER.toString()) ? (
                    <div className={"mt-5"}>
                      <span className="block text-gray-700 mb-1 font-medium">
                        {t("createUser.form.companylabel")}
                      </span>
                      <select
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      >
                        <option value="">
                          {t("createUser.form.defaultcompany")}
                        </option>
                        {companies.map((comp) => (
                          <option key={comp["id"]} value={comp["id"]}>
                            {comp["name"]}
                          </option>
                        ))}
                      </select>
                      {companyErr != "" ? (
                        <ErrorField error={companyErr} />
                      ) : null}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div className={"flex justify-cente"}>
                <button
                  type="submit"
                  className="bg-blue-600 dark:bg-stone-600 text-white rounded-md p-3 w-full hover:bg-blue-800 focus:ring-2 focus:ring-offset-2  transition-all ease-in-out duration-300"
                >
                  {t("createUser.form.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AddAccount;
