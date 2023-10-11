import Logout from "../components/Logout"

function Home() {

    return (
        <>
            <h1>Home</h1>
            <hr/>
            <a href="/login">Login</a>
            <hr/>
            <a href="/add">Create Account (Temp)</a>
            <Logout></Logout>
        </>
    )
}

export default Home
