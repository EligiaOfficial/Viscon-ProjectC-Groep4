import { useState } from "react";
import axios from 'axios';

function AddAccount() {
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');

     const handleSubmit = (e: React.FormEvent) => {
         e.preventDefault();
         console.log('Email:', email);
         console.log('Passw:', password);

         if (email !== "" && password !== "") {
             Signup({
                 email: email,
                 password: password,
             }).then(() => {
                 console.log("User created: ", email, password);
             }).catch(error => {
                 console.error("Error:", error);
             });
         }
    };


    return (
        <>
            <div className="flex flex-row h-screen">
                <div className="basis-full md:basis-1/3 bg-gray-150 mt-20">

                    <div className="mt-20 sm:mx-auto sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
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

function Signup(data: { email: string; password: string; }) {
    console.log('Before Axios request');
    return axios.post('/api/Auth/add', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
        })
        .catch(error => {
            console.error('Axios request failed:', error);
        });
}
