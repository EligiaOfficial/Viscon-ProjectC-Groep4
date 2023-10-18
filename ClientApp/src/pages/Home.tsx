import nav from "../components/Nav";
import {useNavigate} from "react-router-dom";
import {getName, getEmail, getPhone, getRole, getId, getCompany, getDepartment} from '../Endpoints/Jwt'

function Home() {

    var token = localStorage.getItem("token");
    var {id,name,email,phone,role,company,department} = "Empty";
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
        console.log(e);
    }

    const nav = useNavigate();
    
    const logOut = () => {
        localStorage.removeItem('token');
        nav('/login');
    }

    return (
        <>
            <h1>Home</h1>
            <hr/>
            <a href="/login">Login</a>
            <hr/>
            <a href="/add">Create Account (Temp)</a>
            <hr/>
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
