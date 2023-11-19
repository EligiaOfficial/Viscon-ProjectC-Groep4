import AddAccount from "./pages/CreateAccount";
import CreateTicket from "./pages/CreateTicket";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SuccessCreating from "./pages/SuccessCreating";
import Ticket from "./pages/Ticket";


export const routes = [
    { path: '/', name: 'homepage', component: <Home /> },
    { path: '/dashboard', name: 'dashboard', component: <Dashboard /> },
    { path: '/login', name: 'login', component: <Login /> },
    { path: '/add', name: 'add', component: <AddAccount /> },
    { path: '/create', name: 'create', component: <CreateTicket /> },
    { path: '/success', name: 'success', component: <SuccessCreating /> },
    { path: '/ticket', name: 'ticket', component: <Ticket /> },
]