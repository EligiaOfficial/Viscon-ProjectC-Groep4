import {useEffect, useState} from "react";
import {FetchUserCreationData, SignupAxios} from "../Endpoints/Dto";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getCompany, getDepartment, getRole} from "../Endpoints/Jwt";

function AddAccount() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState<object[]>([]);

    const [company, setCompany] = useState('');
    const [companies, setCompanies] = useState<object[]>([]);

    const token = localStorage.getItem("token");
    const usr_role = getRole(token);
    const usr_compId = getCompany(token);
    const usr_depId = getDepartment(token);

    const nav = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Passw:', password);

        if (email !== "" && password !== "") {
            SignupAxios({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                phone: +phone,
                company: usr_role == 1 ? +company : +usr_compId,
                role: usr_role == 1 ? +role : 4,
                department: usr_role == 1 ? +department : +usr_depId,
                language: "EN",
            }).then(() => {
                console.log("User created: ", email, firstName, lastName, password, phone, company, role, department);
                nav('/')
            }).catch(error => {
                console.error("Error:", error);
            });
        }
    };

    useEffect(() => {
        FetchUserCreationData().then(res => {
            const { companies, departments } = res.data;
            setCompanies(companies);
            setDepartments(departments);
        });
    }, []);

    return (
        <>
            <div className="flex flex-row h-screen ml-20">
                <div className="basis-full md:basis-1/3 bg-gray-150 mt-20">

                    <div className="mt-50 sm:mx-auto sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium leading-3 text-gray-500">First & Last Names</label>
                                <div className="mt-2 flex">
                                    <input
                                        id="first_name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        name="first_name"
                                        type="first_name"
                                        autoComplete="first_name"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />

                                    <input
                                        id="last_name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        name="last_name"
                                        type="last_name"
                                        autoComplete="last_name"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium leading-3 text-gray-500">Email address</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-xs font-medium leading-2 text-gray-500">Password</label>
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
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />

                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-xs font-medium leading-2 text-gray-500">Phone Nr</label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        name="phone"
                                        type="phone"
                                        autoComplete="phone"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                                </div>
                            </div>




                            {usr_role == 1 ? (
                                <div>
                                    <label htmlFor="role" className="block text-xs font-medium leading-2 text-gray-500">
                                        User Account:
                                    </label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full border rounded-md p-2 mt-2">
                                        <option value="0">Select User Type</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Viscon Employee</option>
                                        <option value="3">Trained User</option>
                                        <option value="4">User</option>
                                    </select>
                                </div>
                            ) : (
                                <div/>
                            )}

                            {usr_role == 1 ? (
                                <div>
                                    <label htmlFor="Department" className="block text-xs font-medium leading-2 text-gray-500">
                                        Department:
                                    </label>
                                    <select
                                        id="department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full border rounded-md p-2 mt-2">
                                        <option value="">Select a Department</option>
                                        <option value="0">Inapplicable</option>
                                        {departments.map((dep) => (
                                            <option key={dep["dep_Id"]} value={dep["dep_Id"]}>
                                                {dep["dep_Speciality"]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div/>
                            )}

                            {usr_role == 1 ? (
                                <div>
                                    <label htmlFor="machine" className="block text-xs font-medium leading-2 text-gray-500">
                                        Company:
                                    </label>
                                    <select
                                        id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full border rounded-md p-2 mt-2">
                                        <option value="">Select a Company</option>
                                        <option value="">Inapplicable</option>
                                        {companies.map((comp) => (
                                            <option key={comp["com_Id"]} value={comp["com_Id"]}>
                                                {comp["com_Name"]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div/>
                            )}

                            <div className={"flex justify-start"}>
                                <button type="submit"
                                        className="flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    Add Account
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddAccount