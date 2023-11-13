import AddAccount from "./pages/CreateAccount";
import CreateTicket from "./pages/CreateTicket";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SuccessCreating from "./pages/SuccessCreating";
import UserSettings from "./pages/UserSettings";


export const routes = [
    { path: '/', name: 'homepage', component: <Home /> },
    { path: '/login', name: 'login', component: <Login /> },
    { path: '/add', name: 'add', component: <AddAccount /> },
    { path: '/create', name: 'create', component: <CreateTicket /> },
    { path: '/success', name: 'success', component: <SuccessCreating /> },
    { path: '/edit', name: 'edit', component: <UserSettings /> },
]