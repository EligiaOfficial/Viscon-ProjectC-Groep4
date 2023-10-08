import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route exact path={"/"} element={<Home/>}/>
                <Route exact path={"/login"} element={<Login/>}/>
                <Route exact path={"/add"} element={<CreateAccount/>}/>
                <Route exact path={"/create"} element={<CreateTicket/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
