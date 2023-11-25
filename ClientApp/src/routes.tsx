import AddAccount from "./pages/CreateAccount";
import CreateTicket from "./pages/CreateTicket";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import SuccessCreating from "./pages/SuccessCreating";
import Ticket from "./pages/Ticket";


export const routes = [
    { path: '/', name: 'dashboard', component: <Dashboard /> },
    { path: '/dashboard', name: 'dashboard', component: <Dashboard /> },
    { path: '/login', name: 'login', component: <Login /> },
    { path: '/logout', name: 'logout', component: <Logout /> },
    { path: '/add', name: 'add', component: <AddAccount /> },
    { path: '/create', name: 'create', component: <CreateTicket /> },
    { path: '/success', name: 'success', component: <SuccessCreating /> },
    { path: '/ticket', name: 'ticket', component: <Ticket /> },
]
