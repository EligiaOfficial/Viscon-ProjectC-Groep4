import {axiosInstance} from '../axiosInstance';
import axios from "axios/index";

type LoginDto = {
    email: string,
    password: string
}

type SignUpDto = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: number,
    company: number,
    role: number,
    department: number,
    language: string
}

type EditUserDto = {
    email: string,
    password: string,
    phone: number,
    language: string
}

type MessageDto = {
    content: string,
    ticketId: number,
    sender: number
}

export function EditUserAxios(data: EditUserDto) {
    return axiosInstance.put('api/Auth/Edit', data)
        .then(res => {
            return res;
    })
        .catch(err => {
            throw err;
        })
}

export function LoginAxios(data: LoginDto) {
    console.log('Before Axios request');
    return axiosInstance.post('/api/Auth/Login', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
            return response;
        })
        .catch(error => {
            console.error('Axios request failed:', error);
            throw error;
        });
}

export function SignupAxios(data: SignUpDto) {
    console.log('Before Axios request', data);
    return axiosInstance.post('/api/Auth/Add', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
        })
        .catch(error => {
            console.error('Axios request failed:', error);
        });
}

export function createMessageAxios(data: MessageDto) {
    return axiosInstance.post('/api/Ticket/AddMessage', data)
}

export function FetchTicketAxios(id: number) {
    return axiosInstance.get(`/api/ticket/ticketdata?id=${id}`)
}

export function FetchUserCreationData() {
    return axiosInstance.get('api/Fetch/AccountData')
}

export function getTickets() {
   return axiosInstance.get("http://localhost:5173/api/ticket/tickets")
}