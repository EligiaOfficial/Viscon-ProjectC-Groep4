/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import AddAccount from "./pages/CreateAccount";
import CreateTicket from "./pages/CreateTicket";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import SuccessCreating from "./pages/SuccessCreating";
import Ticket from "./pages/Ticket";
import CreateTicketForSomeone from "./pages/CreateTicketForSomeone";
import Tickets from "./pages/Tickets";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export const routes = [
  { path: "/", name: "dashboard", component: <Dashboard /> },
  { path: "/dashboard", name: "dashboard", component: <Dashboard /> },
  {
    path: "/tickets/all",
    name: "tickets",
    component: <Tickets filter={"all"} />,
  },
  { path: "/login", name: "login", component: <Login /> },
  { path: "/logout", name: "logout", component: <Logout /> },
  { path: "/add", name: "add", component: <AddAccount /> },
  { path: "/create", name: "create", component: <CreateTicket /> },
  { path: "/success", name: "success", component: <SuccessCreating /> },
  { path: "/ticket", name: "ticket", component: <Ticket /> },
  {
    path: "/forgot-password",
    name: "forgotpassword",
    component: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    name: "resetpassword",
    component: <ResetPassword />,
  },
  {
    path: "/tickets/unassigned",
    name: "new-filter",
    component: <Tickets filter={"unassigned"} />,
  },
  {
    path: "/tickets/critical",
    name: "critical-filter",
    component: <Tickets filter={"critical"} />,
  },
  {
    path: "/tickets/archive",
    name: "archive-filter",
    component: <Tickets filter={"archive"} />,
  },
  // { path: '/edit', name: 'edit', component: <UserSettings /> },
  {
    path: "/createforsomeone",
    name: "createforsomeone",
    component: <CreateTicketForSomeone />,
  },
];
