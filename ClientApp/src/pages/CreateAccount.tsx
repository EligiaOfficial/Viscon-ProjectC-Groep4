/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import {useEffect, useState} from "react";
import {FetchUserCreationData, SignupAxios} from "../Endpoints/Dto";
import {useNavigate} from "react-router-dom";
import {getCompany, getDepartment, getRole} from "../Endpoints/Jwt";
import Layout from "../components/Layout";
import {UserRoles} from "../UserRoles";

function AddAccount() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<object[]>([]);

  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState<object[]>([]);

  const token = localStorage.getItem("token");
  const usr_role = getRole(token);
  const usr_compId = getCompany(token);
  const usr_depId = getDepartment(token);

  const nav = useNavigate();

  if (usr_role >= UserRoles.USER) return <div>Error 404</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);

    if (email !== "" && password !== "" && confirmPassword !== "") {
      SignupAxios({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phone: +phone,
        company: usr_role == UserRoles.ADMIN ? +company : +usr_compId,
        role: usr_role == UserRoles.ADMIN ? +role : 4,
        department: usr_role == UserRoles.ADMIN ? +department : +usr_depId,
        language: "EN",
      })
        .then(() => {
          nav("/");
        })
        .catch((error) => {
          console.error("Error:", error);
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
        <div className="flex flex-col items-center justify-center min-h-[calc(100%-100px)] h-full">
          {/*<span className="text-2xl py-4">Add Ticket</span>*/}
          <div className="mx-auto bg-white p-8 rounded-lg w-[1000px] shadow-lg space-y-6 dark:bg-stone-400">
            <h1 className="text-3xl mb-2 text-center text-blue-600 dark:text-stone-600">
              Create New User
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`${usr_role == UserRoles.KEYUSER ? " " : "grid grid-cols-2 gap-6"}`}>
                <div className={"flex flex-col"}>
                  <div className={"flex justify-between flex-row"}>
                    <div className={"w-full mr-2.5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      First Name
                    </span>
                      <input
                          id="first_name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          name="first_name"
                          type="first_name"
                          autoComplete="first_name"
                          required
                          className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div>
                    <div className={"w-full ml-2.5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      Last Name
                    </span>
                      <input
                          id="last_name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          name="last_name"
                          type="last_name"
                          autoComplete="last_name"
                          required
                          className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className={"mt-5 flex justify-between flex-row"}>
                    <div className={"w-full mr-2.5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      Email Adress
                    </span>
                      <input
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div>

                    <div className={"w-full ml-2.5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      Phone Number
                    </span>
                      <input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          name="phone"
                          type="phone"
                          autoComplete="phone"
                          required
                          className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div> 
                  </div>

                  <div className={"mt-5 flex justify-between flex-row"}>
                    <div className={"w-full mr-2.5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      Password
                    </span>
                      <input
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          type="password"
                          autoComplete="password"
                          required
                          className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div>

                    <div className={"w-full ml-2.5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      Confirm Password
                    </span>
                      <input
                          id="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          name="password"
                          type="password"
                          autoComplete="password"
                          required
                          className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                </div>
                <div>
                  {usr_role == UserRoles.ADMIN ? (
                      <div>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      What's the type of user?
                    </span>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                        >
                          <option value="5">Select User Type</option>
                          <option value="0">Admin</option>
                          <option value="1">Viscon Employee</option>
                          <option value="2">Trained User</option>
                          <option value="3">User</option>
                        </select>
                      </div>
                  ) : (
                      <div />
                  )}

                  {usr_role == UserRoles.ADMIN && (role == UserRoles.ADMIN.toString() || role == UserRoles.VISCON.toString()) ? (
                      <div className={"mt-5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      In what department?
                    </span>
                        <select
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                        >
                          <option value="">Select a Department</option>
                          {departments.map((dep) => (
                              <option key={dep["id"]} value={dep["id"]}>
                                {dep["speciality"]}
                              </option>
                          ))}
                        </select>
                      </div>
                  ) : (
                      <div />
                  )}

                  {usr_role == UserRoles.ADMIN && (role == UserRoles.KEYUSER.toString() || role == UserRoles.USER.toString()) ? (
                      <div className={"mt-5"}>
                    <span
                        className="block text-gray-700 mb-1 font-medium"
                    >
                      For what Company?
                    </span>
                        <select
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full border rounded-md p-3 outline-none shadow-sm focus:border-blue-500"
                        >
                          <option value="">Select a Company</option>
                          {companies.map((comp) => (
                              <option key={comp["id"]} value={comp["id"]}>
                                {comp["name"]}
                              </option>
                          ))}
                        </select>
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
                  Add Account
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
