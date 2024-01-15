import { axiosInstance } from "../axiosInstance";
import axios from "axios/index";

type LoginDto = {
  email: string;
  password: string;
};

type SignUpDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  company: number;
  role: number;
  department: number;
  language: string;
};

type EditUserDto = {
  email: string;
  password: string;
  phone: string;
  language: string;
};

type MessageDto = {
  content: string;
  ticketId: number;
};

export function EditUserAxios(data: EditUserDto) {
  return axiosInstance
    .put("api/Auth/Edit", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

export function LoginAxios(data: LoginDto) {
  console.log("Before Axios request");
  return axiosInstance
    .post("/api/Auth/Login", data)
    .then((response) => {
      console.log("Axios request succeeded:", response);
      return response;
    })
    .catch((error) => {
      console.error("Axios request failed:", error);
      throw error;
    });
}

export function SignupAxios(data: SignUpDto) {
  return axiosInstance.post("/api/Auth/Add", data);
}

export function createMessageAxios(data: MessageDto) {
  return axiosInstance.post("/api/Ticket/AddMessage", data);
}

export function FetchTicketAxios(id: number) {
  return axiosInstance.get(`/api/ticket/ticketdata?id=${id}`);
}

export function FetchUserCreationData() {
  return axiosInstance.get("api/Fetch/AccountData");
}

export function getTickets() {
  return axiosInstance.get("/api/ticket/tickets");
}

export function getArchivedTickets() {
  return axiosInstance.get("/api/ticket/archive");
}

export function getUser() {
  return axiosInstance.get("/api/user/userdata?id=1");
}

export function getDepartments() {
  return axiosInstance.get("api/department/All");
}

export function getMachines() {
  return axiosInstance.get("api/machine/All");
}

export function createTicketAxios(formData: any) {
  return axiosInstance.post("api/ticket/createticket", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

type changeTicketDto = {
  userid: number;
  ticketid: number;
  department: number;
  urgent: boolean;
  resolved: boolean;
  publish: boolean;
};

export function claimTicket(id: number) {
  return axiosInstance.post(`api/ticket/claim?ticketId=${id}`);
}

export function changeTicket(data: changeTicketDto) {
  console.log("Start Axios Instance");
  return axiosInstance
    .post("api/ticket/changeticket", data)
    .then((response) => {
      // Handle successful response
      console.log("Success:", response.data);
      return response.data; // You can return or process the data here
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
      throw error; // You can throw the error or handle it in a way that makes sense for your application
    });
}
