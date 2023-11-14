/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import nav from "../components/Nav";
import {useNavigate} from "react-router-dom";
import {getName, getEmail, getPhone, getRole, getId, getCompany, getDepartment} from '../Endpoints/Jwt'
import Nav from "../components/Nav";
import {useEffect} from "react";

function Home() {
    var token = localStorage.getItem("token");
    var {id,name,email,phone,company,department} = "Empty";
    var role = "0";
    var isLoggedIn = false;
    try {
        name = getName(token);
        email = getEmail(token);
        phone = "+"+31+getPhone(token);
        role = getRole(token);
        id = getId(token);
        company = getCompany(token);
        department = getDepartment(token);
        isLoggedIn = true;
    } catch (e) {
        isLoggedIn = false;
        console.log(e);
    }
    
    const nav = useNavigate();
    useEffect(() => {
        if (role != null) {
            if (role == 0) {
                nav("/login") // Not Logged In
            }
        }
    })
    
    const logOut = () => {
        localStorage.removeItem('token');
        nav('/login');
    }
    
    return (
        <>
            <a href="/dashboard">Dashboard</a>
            <hr />
            <a href="/add">Add User</a>
            <hr/>
            <a href="Create">Create Ticket</a>
            <div>
                {isLoggedIn ? (
                    <button onClick={logOut} > LogOut </button>
                ) : (
                    <hr />
                )}
            </div>
            <div>
                <h3 className={"mt-5"}>Debug Data:</h3>
                <p>User Id: {id}</p>
                <p>Name: {name == null ? name : name[0] + " " + name[1]}</p>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
                <p>Phone: {phone}</p>
                <p>Company: {company}</p>
                <p>Department: {department}</p>
            </div>
        </>
    )
}

export default Home
